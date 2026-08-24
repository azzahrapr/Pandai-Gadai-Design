import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { MILESTONES } from '../../data/mockData'
import type { TaskConfirmation } from '../../types'
import { PenaksiranGuidanceBanner } from '../../components/PenaksiranGuidanceBanner'
import { KondisiIdealInfo } from '../../components/KondisiIdealInfo'

const PENAKSIRAN_MILESTONE_IDS = new Set(['penaksiran-elektronik', 'penaksiran-bpkb', 'penaksiran-emas'])

// Exact fallback text buildSummary() in FLPenaksiranConfirm.tsx writes when the FL ticked
// no defects at all — its own internal comma would otherwise get wrongly split apart below.
const NO_DEFECT_FALLBACK = 'Semua kondisi normal, tidak ada yang ditandai.'

// Labels whose value is a comma-joined LIST of independently self-labeled sub-items (see
// buildSummary() in FLPenaksiranConfirm.tsx/FLPenaksiranBpkbConfirm.tsx — e.g. "Dokumen:
// STNK ..., Mesin ..., BPKB ..., Rangka ..."). These get split into one Ya/Tidak row per
// sub-item instead of one row for the whole line, since each already reads fine on its
// own ("Mesin JM123456"). Every other label (e.g. "Kepemilikan") is a single atomic value
// with no such internal list, so it stays one row, label included.
const SPLITTABLE_LABELS = new Set(['Potongan Nilai', 'Dokumen', 'Pengecekan Luar'])

// A "simulasi" submission's catatan is built from labeled lines (see buildSummary() in
// FLPenaksiranConfirm.tsx / FLPenaksiranBpkbConfirm.tsx) — split it back apart. "Tipe
// Item" is shown as plain informational text (not something to check off — it's the
// item being appraised, not a standard), "Refleksi" is shown as a quoted reflection
// (narrative, not a standard either), and everything else becomes Ya/Tidak checklist rows
// — one per field, not one per line (see SPLITTABLE_LABELS above).
function parseSimulationCatatan(catatan: string | undefined): { tipeItem: string | null; fields: string[]; refleksi: string | null } {
  const lines = (catatan ?? '').split('\n').map(l => l.trim()).filter(Boolean)
  const tipeItemLine = lines.find(l => l.startsWith('Tipe Item:'))
  const refleksiLine = lines.find(l => l.startsWith('Refleksi:'))
  const tipeItem = tipeItemLine ? tipeItemLine.slice('Tipe Item:'.length).trim() : null
  const refleksi = refleksiLine ? refleksiLine.slice('Refleksi:'.length).trim() : null

  const fields: string[] = []
  lines.forEach(line => {
    if (line === tipeItemLine || line === refleksiLine) return
    const colonIdx = line.indexOf(':')
    const label = colonIdx >= 0 ? line.slice(0, colonIdx).trim() : null
    const value = colonIdx >= 0 ? line.slice(colonIdx + 1).trim() : line
    if (label && SPLITTABLE_LABELS.has(label) && value !== NO_DEFECT_FALLBACK) {
      value.split(',').map(part => part.trim()).filter(Boolean).forEach(part => fields.push(part))
    } else {
      fields.push(line)
    }
  })

  return { tipeItem, fields, refleksi }
}

// Rendered by KanitReviewLatihan.tsx (the shared /kanit/review-latihan/:flId/:moduleKey
// route) whenever the moduleKey resolves to a submissionType: 'individual' milestone —
// see the dispatch logic there. Kept in its own file since the two review flows work off
// entirely different data models (TaskConfirmation vs DailyChecklist) and share nothing
// beyond the URL and the page chrome.
export function ConfirmationReview({ flId, milestoneId }: { flId: string; milestoneId: string }) {
  const navigate = useNavigate()
  const { getUserById, taskConfirmations, reviewTaskConfirmation } = useApp()

  const flUser = getUserById(flId)
  const milestone = MILESTONES.find(m => m.id === milestoneId)
  const isPenaksiran = PENAKSIRAN_MILESTONE_IDS.has(milestoneId)

  // Sessions to review are fixed at mount — otherwise a just-reviewed confirmation would
  // vanish from the list the instant kanitPassed flips, before its own "berhasil disimpan"
  // confirmation ever gets a chance to render (same reasoning as KanitReviewLatihan.tsx).
  // Sorted by latihan (itemText) first so a module with several pending checklistItems
  // reads as grouped sections rather than an interleaved list.
  const [confirmationIds] = useState<string[]>(() =>
    taskConfirmations.filter(c => c.flId === flId && c.milestoneId === milestoneId)
      .filter(c => c.kanitPassed === undefined)
      .sort((a, b) => a.itemId === b.itemId ? a.day - b.day : a.itemText.localeCompare(b.itemText))
      .map(c => c.id)
  )
  const confirmations = confirmationIds
    .map(id => taskConfirmations.find(c => c.id === id))
    .filter((c): c is TaskConfirmation => !!c)
  const remainingCount = confirmations.filter(c => c.kanitPassed === undefined).length

  // Essay-type (SOP Administrasi/Cash Mgmt/Packing/Offloading) latihan with more than one
  // pending submission collapse into one section — "Latihan ke-1", "ke-2", etc. Penaksiran
  // skips this grouping entirely (see the flat "Latihan ke-N" render below) — it only has
  // one layer of review, same as a checklist-type module's per-session list.
  type ItemGroup = { itemId: string; itemText: string; confirmations: TaskConfirmation[] }
  const itemGroups: ItemGroup[] = (() => {
    const map = new Map<string, ItemGroup>()
    confirmations.forEach(c => {
      const existing = map.get(c.itemId)
      if (existing) existing.confirmations.push(c)
      else map.set(c.itemId, { itemId: c.itemId, itemText: c.itemText, confirmations: [c] })
    })
    return Array.from(map.values())
  })()

  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({})
  // itemMarks: {confirmationId: {fieldIndex: passed}} — only meaningful for isPenaksiran.
  const [itemMarks, setItemMarks] = useState<Record<string, Record<number, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState<Record<string, boolean>>({})
  // Auto-expand only when it's the single latihan on this page — same convention as
  // KanitReview.tsx's pending-checklist accordion. (Essay only — see itemGroups above.)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() =>
    itemGroups.length === 1 ? { [itemGroups[0].itemId]: true } : {}
  )

  function toggleGroup(itemId: string) {
    setExpandedGroups(prev => ({ ...prev, [itemId]: !prev[itemId] }))
  }

  function setSimMark(confirmationId: string, idx: number, val: boolean) {
    setItemMarks(prev => ({ ...prev, [confirmationId]: { ...(prev[confirmationId] ?? {}), [idx]: val } }))
  }

  // Essay-type decision — kanit explicitly picks Memenuhi/Tidak Memenuhi Standar.
  function handleReviewChoice(confirmationId: string, passed: boolean) {
    const note = noteDrafts[confirmationId]?.trim()
    if (!note) {
      setSubmitAttempted(prev => ({ ...prev, [confirmationId]: true }))
      return
    }
    reviewTaskConfirmation(confirmationId, passed, note)
  }

  // Penaksiran — one "Submit Penilaian" button, same as a checklist-type task. Pass/fail
  // is derived from the Ya/Tidak marks the same way calcTaskScore does elsewhere in the
  // app (majority "Tidak" fails it), not a separate manual choice.
  function handleSubmitPenilaian(confirmationId: string, fieldCount: number) {
    const note = noteDrafts[confirmationId]?.trim()
    const marks = itemMarks[confirmationId] ?? {}
    const allMarked = fieldCount === 0 || Array.from({ length: fieldCount }, (_, i) => i).every(i => i in marks)
    if (!note || !allMarked) {
      setSubmitAttempted(prev => ({ ...prev, [confirmationId]: true }))
      return
    }
    const noCount = Object.values(marks).filter(v => v === false).length
    const passed = fieldCount === 0 || noCount <= fieldCount / 2
    reviewTaskConfirmation(confirmationId, passed, note)
  }

  // Everything below a submission's own header — shared between a standalone (single
  // pending) latihan card and each "Latihan ke-N" entry inside a collapsed group.
  function renderBody(c: TaskConfirmation) {
    const { tipeItem, fields, refleksi } = isPenaksiran ? parseSimulationCatatan(c.catatan) : { tipeItem: null, fields: [], refleksi: null }
    const marks = itemMarks[c.id] ?? {}
    const markedCount = fields.filter((_, i) => i in marks).length

    if (c.kanitPassed !== undefined) {
      return (
        <div className="p-5">
          <div className={`text-sm font-semibold rounded-xl px-4 py-3 text-center ${c.kanitPassed ? 'bg-[#F0FDF4] text-[#15803D]' : 'bg-[#FEF2F2] text-[#B91C1C]'}`}>
            {c.kanitPassed ? '✅ Ditandai memenuhi standar' : '❌ Ditandai tidak memenuhi standar'}
          </div>
        </div>
      )
    }

    return (
      <div className="p-5 space-y-4">
        {/* ── What the FL submitted ── */}
        {isPenaksiran ? (
          <>
            {tipeItem && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#65758B] mb-1">Tipe Item</p>
                <p className="text-sm font-semibold text-[#0F1729]">{tipeItem}</p>
              </div>
            )}
            {/* Optional reference number — same field/purpose as the required Nomor SBG
                on SOP Administrasi/Packing below, just optional here (see
                FLPenaksiranConfirm/BpkbConfirm/EmasConfirm.tsx). This branch never
                referenced c.nomorSbg before 2026-08-13, so it silently never showed even
                when a discounter filled it in. */}
            {c.nomorSbg && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#65758B] mb-1">Nomor SBG</p>
                <p className="text-sm font-semibold text-[#0F1729]">{c.nomorSbg}</p>
              </div>
            )}
            <div className="space-y-2">
              <div className="flex justify-end mb-1">
                <p className="text-[11px] font-semibold text-[#65758B] uppercase tracking-wide">Memenuhi Standar</p>
              </div>
              {fields.length === 0 ? (
                <p className="text-sm text-[#94A3B8]">—</p>
              ) : fields.map((line, i) => {
                const mark = marks[i]
                const isUnmarked = submitAttempted[c.id] && mark === undefined
                return (
                  <div key={i} className={`flex items-center gap-2.5 rounded-lg transition-colors ${isUnmarked ? 'bg-[#FEF2F2] -mx-2 px-2 py-1' : ''}`}>
                    <p className="text-sm text-[#65758B] flex-1">{line}</p>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => setSimMark(c.id, i, true)}
                        className={`h-6 px-2.5 rounded text-[11px] font-semibold transition-all ${
                          mark === true ? 'bg-[#16A34A] text-white' : 'bg-[#F1F5F9] text-[#65758B] hover:bg-[#DCFCE7] hover:text-[#16A34A]'
                        }`}
                      >Ya</button>
                      <button
                        onClick={() => setSimMark(c.id, i, false)}
                        className={`h-6 px-2.5 rounded text-[11px] font-semibold transition-all ${
                          mark === false ? 'bg-[#DC2626] text-white' : 'bg-[#F1F5F9] text-[#65758B] hover:bg-[#FEE2E2] hover:text-[#DC2626]'
                        }`}
                      >Tidak</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <>
            {c.nomorSbg && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#65758B] mb-1">Nomor SBG</p>
                <p className="text-sm font-semibold text-[#0F1729]">{c.nomorSbg}</p>
              </div>
            )}
            {c.nomorBox && c.nomorBox.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#65758B] mb-1">Nomor Box</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.nomorBox.map((box, i) => (
                    <span key={i} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#0F1729]">{box}</span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#65758B] mb-1">Refleksi / Catatan</p>
              <p className="text-sm text-[#0F1729] leading-relaxed italic">{c.catatan ? `"${c.catatan}"` : 'Tidak ada catatan'}</p>
            </div>
          </>
        )}

        {isPenaksiran && refleksi && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#65758B] mb-1">Refleksi Peserta</p>
            <p className="text-sm text-[#0F1729] leading-relaxed italic">"{refleksi}"</p>
          </div>
        )}

        {/* ── Kanit decision ── */}
        <div>
          <label className="text-xs font-semibold text-[#65758B] uppercase tracking-wide block mb-1.5">
            Catatan Kanit <span className="text-[#DC2626]">*</span>
          </label>
          <textarea
            value={noteDrafts[c.id] ?? ''}
            onChange={e => setNoteDrafts(prev => ({ ...prev, [c.id]: e.target.value }))}
            placeholder="Catatan untuk peserta..."
            rows={2}
            className={`w-full rounded-lg px-3 py-2.5 text-sm text-[#0F1729] placeholder:text-[#94A3B8] outline-none transition-colors resize-none border ${
              submitAttempted[c.id] && !noteDrafts[c.id]?.trim() ? 'border-[#DC2626]' : 'border-[#CBD5E1] focus:border-[#023DFF]'
            }`}
          />
          {submitAttempted[c.id] && !noteDrafts[c.id]?.trim() && (
            <p className="text-xs text-[#DC2626] mt-1">Catatan wajib diisi sebelum menyimpan keputusan.</p>
          )}
          {submitAttempted[c.id] && isPenaksiran && fields.length > 0 && markedCount < fields.length && (
            <p className="text-xs text-[#DC2626] mt-1">Semua item simulasi harus ditandai Ya atau Tidak sebelum submit.</p>
          )}
        </div>
        {isPenaksiran ? (
          <button
            onClick={() => handleSubmitPenilaian(c.id, fields.length)}
            className="w-full h-9 rounded-lg font-semibold text-sm bg-[#023DFF] hover:bg-[#001CDB] text-white transition-all"
          >
            Submit Penilaian
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleReviewChoice(c.id, true)}
              className="w-full h-9 rounded-lg text-sm font-semibold bg-[#023DFF] hover:bg-[#001CDB] text-white transition-colors"
            >
              Memenuhi Standar
            </button>
            <button
              onClick={() => handleReviewChoice(c.id, false)}
              className="w-full h-9 rounded-lg text-sm font-semibold border border-[#DC2626] text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
            >
              Tidak Memenuhi Standar
            </button>
          </div>
        )}
      </div>
    )
  }

  if (!flUser || !milestone) {
    return (
      <div className="p-4 md:p-8 flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-[#65758B]">Tugas tidak ditemukan.</p>
          <button onClick={() => navigate(-1)} className="mt-4 inline-flex items-center gap-2 text-sm text-[#023DFF] hover:underline">← Kembali</button>
        </div>
      </div>
    )
  }

  const backTo = `/kanit/review-progress?flId=${flId}&tab=review`

  return (
    <div className="p-4 md:p-8 max-w-2xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#65758B] mb-6">
        <Link to={backTo} className="hover:text-[#023DFF] transition-colors flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Review Progress
        </Link>
        <span>/</span>
        <span className="text-[#0F1729]">{milestone.name}</span>
      </div>

      {/* Header — same bare-title treatment as KanitReviewLatihan.tsx's single-submission page */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F1729]">{milestone.name}</h1>
      </div>

      {confirmations.length === 0 ? (
        <div className="bg-[#F0FDF4] border border-[#16A34A]/20 rounded-xl p-6 text-center">
          <span className="text-2xl">✅</span>
          <p className="font-semibold text-[#15803D] mt-2 text-sm">Tidak ada latihan pending untuk modul ini.</p>
          <Link to={backTo} className="text-sm text-[#023DFF] mt-3 inline-block hover:underline">← Kembali ke Review Progress</Link>
        </div>
      ) : isPenaksiran ? (
        // Penaksiran — flat "Latihan ke-N" list, no item-name grouping layer (it's a
        // single-layer review, same shape as a checklist-type module's per-session list).
        <div className="space-y-4">
          <PenaksiranGuidanceBanner />
          {remainingCount > 0 && (
            <p className="text-xs text-[#65758B]">{remainingCount} latihan menunggu review</p>
          )}
          {confirmations.map((c, i) => (
            <div key={c.id} className="bg-white rounded-xl border border-[#E1E7EF] overflow-hidden">
              <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E1E7EF]">
                <p className="font-semibold text-[#0F1729] text-sm">Latihan ke-{i + 1}</p>
                <p className="text-xs text-[#65758B] mt-0.5">Disubmit pada {c.submittedAt.slice(0, 10)}</p>
              </div>
              {renderBody(c)}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {remainingCount > 0 && (
            <p className="text-xs text-[#65758B]">{remainingCount} latihan menunggu review</p>
          )}
          {itemGroups.map(group => {
            // Every latihan is a collapsible section, even one with only a single pending
            // submission — no special-cased "always expanded, no toggle" card anymore.
            const isExpanded = !!expandedGroups[group.itemId]
            // KondisiIdealInfo is a real <button> (opens its own bottom sheet) — can't
            // nest inside the header's own toggle button, so the header is a clickable
            // <div> instead, with the info icon's own click stopped from bubbling up to
            // the toggle.
            return (
              <div key={group.itemId} className="bg-white rounded-xl border border-[#E1E7EF] overflow-hidden">
                <div
                  onClick={() => toggleGroup(group.itemId)}
                  className="w-full px-5 py-3.5 bg-[#F8FAFC] flex items-center justify-between text-left hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-[#0F1729] text-sm">
                      {group.itemText}
                      <span onClick={e => e.stopPropagation()}>
                        <KondisiIdealInfo text={group.itemText} kondisiIdeal={milestone.checklistItems.find(ci => ci.id === group.itemId)?.kondisiIdeal} />
                      </span>
                    </div>
                    <p className="text-xs text-[#65758B] mt-0.5">{group.confirmations.length} latihan menunggu review</p>
                  </div>
                  <span className={`text-[#94A3B8] transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
                {isExpanded && (
                  <div className="border-t border-[#E1E7EF]">
                    {group.confirmations.map((c, i) => (
                      <div key={c.id} className={i > 0 ? 'border-t border-[#E1E7EF]' : ''}>
                        <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E1E7EF]">
                          <p className="font-semibold text-[#0F1729] text-sm">Latihan ke-{i + 1}</p>
                          <p className="text-xs text-[#65758B] mt-0.5">Disubmit pada {c.submittedAt.slice(0, 10)}</p>
                        </div>
                        {renderBody(c)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
