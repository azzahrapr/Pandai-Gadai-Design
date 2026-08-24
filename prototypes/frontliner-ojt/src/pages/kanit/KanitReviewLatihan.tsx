import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { MILESTONES } from '../../data/mockData'
import type { DailyChecklist } from '../../types'
import { ConfirmationReview } from './KanitReviewConfirmation'
import { PenaksiranGuidanceBanner } from '../../components/PenaksiranGuidanceBanner'
import { KondisiIdealInfo } from '../../components/KondisiIdealInfo'

const PENAKSIRAN_MILESTONE_IDS = new Set(['penaksiran-elektronik', 'penaksiran-emas', 'penaksiran-bpkb'])

// Single entry point for /kanit/review-latihan/:flId/:moduleKey — dispatches to whichever
// review flow the module actually needs. Individual-type modules (essay/discounter
// submissions, reviewed via TaskConfirmation — SOP Administrasi, Cash Mgmt, Packing,
// Offloading, Penaksiran Elektronik/BPKB/Emas) render ConfirmationReview; everything else
// (session-type daily/weekly checklists) renders ChecklistReview below. Both used to live
// behind separate URLs (/review-latihan vs /review-confirmation) — merged into one so
// KanitReviewProgress.tsx's pending-list links never have to know which flow they lead to.
// `key` forces a clean remount whenever moduleKey changes (including switching between the
// two flows), so neither child's own hook state (item marks, note drafts, etc.) leaks
// across modules.
export default function KanitReviewLatihan() {
  const { flId, moduleKey } = useParams<{ flId: string; moduleKey: string }>()
  const decodedKey = decodeURIComponent(moduleKey ?? '')
  const milestone = MILESTONES.find(m => m.id === decodedKey)

  if (!flId) return null

  return milestone?.submissionType === 'individual'
    ? <ConfirmationReview key={decodedKey} flId={flId} milestoneId={decodedKey} />
    : <ChecklistReview key={decodedKey} flId={flId} moduleKey={decodedKey} />
}

function ChecklistReview({ flId, moduleKey }: { flId: string; moduleKey: string }) {
  const navigate = useNavigate()
  const { getFlChecklists, getUserById, scoreChecklist, scoreChecklistTasks } = useApp()

  const decodedKey = moduleKey
  const flUser = getUserById(flId)

  const [clItemYesNo, setClItemYesNo] = useState<Record<string, Record<string, boolean>>>({})
  const [clTaskNotes, setClTaskNotes] = useState<Record<string, Record<string, string>>>({})
  const [clOverallNotes, setClOverallNotes] = useState<Record<string, string>>({})
  const [submitAttempted, setSubmitAttempted] = useState<Record<string, boolean>>({})
  const [reviewingId, setReviewingId] = useState<string | null>(null)
  const [score, setScore] = useState('')
  const [note, setNote] = useState('')

  function moduleKeyOf(cl: DailyChecklist): string {
    return cl.tasks?.[0]?.taskId ?? cl.milestoneName ?? cl.milestoneId ?? cl.id
  }

  // Sessions to show on this page are fixed at mount — otherwise a just-scored session
  // would vanish from the list the instant its status flips, before the "berhasil
  // disimpan" confirmation below ever gets a chance to render.
  const [sessionIds] = useState<string[]>(() =>
    getFlChecklists(flId)
      .filter(cl => cl.status === 'submitted' && moduleKeyOf(cl) === decodedKey)
      .sort((a, b) => a.day - b.day)
      .map(cl => cl.id)
  )
  const sessions = sessionIds
    .map(id => getFlChecklists(flId).find(cl => cl.id === id))
    .filter((cl): cl is DailyChecklist => !!cl)
  const remainingCount = sessions.filter(cl => cl.status !== 'scored').length

  const milestone = MILESTONES.find(m => m.id === decodedKey)
  const moduleName = milestone?.name
    ?? sessions[0]?.tasks?.[0]?.taskName
    ?? sessions[0]?.milestoneName
    ?? decodedKey
  // Penaksiran Emas is the only penaksiran module still session-type (Elektronik/BPKB are
  // individual-type and never reach ChecklistReview — see the dispatcher above) — the
  // guidance banner is written generically so it reads fine regardless.
  const isPenaksiran = PENAKSIRAN_MILESTONE_IDS.has(decodedKey)

  function setItemMark(clId: string, itemId: string, val: boolean) {
    setClItemYesNo(prev => ({ ...prev, [clId]: { ...(prev[clId] ?? {}), [itemId]: val } }))
  }

  function calcTaskScore(clId: string, itemIds: string[]): number | null {
    const marks = clItemYesNo[clId] ?? {}
    if (itemIds.length === 0) return null
    if (!itemIds.every(id => id in marks)) return null
    const yesCount = itemIds.filter(id => marks[id] === true).length
    const noCount = itemIds.length - yesCount
    return noCount > itemIds.length / 2 ? 50 : Math.max(75, Math.round((yesCount / itemIds.length) * 100))
  }

  function allTasksScored(clId: string, tasks: NonNullable<DailyChecklist['tasks']>): boolean {
    return tasks.every(t => calcTaskScore(clId, t.completedItemIds) !== null)
  }

  function handleSubmitTasks(clId: string, tasks: NonNullable<DailyChecklist['tasks']>) {
    const taskScores = tasks.map(t => ({
      taskId: t.taskId,
      score: calcTaskScore(clId, t.completedItemIds)!,
      note: clTaskNotes[clId]?.[t.taskId],
    }))
    scoreChecklistTasks(clId, taskScores, clOverallNotes[clId])
  }

  function handleScore(checklistId: string) {
    const s = parseInt(score)
    if (isNaN(s) || s < 0 || s > 100 || !note.trim()) return
    scoreChecklist(checklistId, s, note)
    setReviewingId(null)
    setScore('')
    setNote('')
  }

  if (!flUser) {
    return (
      <div className="p-4 md:p-8 flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-[#65758B]">OJT tidak ditemukan</p>
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
        <span className="text-[#0F1729]">{moduleName}</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F1729]">{moduleName}</h1>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-[#F0FDF4] border border-[#16A34A]/20 rounded-xl p-6 text-center">
          <span className="text-2xl">✅</span>
          <p className="font-semibold text-[#15803D] mt-2 text-sm">Tidak ada latihan pending untuk modul ini.</p>
          <Link to={backTo} className="text-sm text-[#023DFF] mt-3 inline-block hover:underline">← Kembali ke Review Progress</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {isPenaksiran && <PenaksiranGuidanceBanner />}
          {remainingCount > 0 && (
            <p className="text-xs text-[#65758B]">{remainingCount} latihan menunggu review</p>
          )}
          {sessions.map((cl, idx) => {
            const task = cl.tasks?.[0]
            const markedCount = task ? task.completedItemIds.filter(id => id in (clItemYesNo[cl.id] ?? {})).length : 0
            return (
            <div key={cl.id} className="bg-white rounded-xl border border-[#E1E7EF] overflow-hidden">
              <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E1E7EF] flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#0F1729] text-sm">Latihan ke-{idx + 1}</p>
                  <p className="text-xs text-[#65758B] mt-0.5">Disubmit tanggal {cl.date}</p>
                </div>
                {task && (
                  <span className="text-[11px] text-[#94A3B8] flex-shrink-0">{markedCount}/{task.completedItemIds.length} item</span>
                )}
              </div>

              {cl.status === 'scored' ? (
                <div className="p-5">
                  <div className="bg-[#F0FDF4] text-[#15803D] text-sm font-semibold rounded-xl px-4 py-3 text-center">✅ Penilaian berhasil disimpan!</div>
                </div>
              ) : (
                <>
                  {task ? (
                    <div className="p-5 space-y-2">
                      <div className="flex justify-end mb-1">
                        <p className="text-[11px] font-semibold text-[#65758B] uppercase tracking-wide">Memenuhi Standar</p>
                      </div>
                      {task.completedItemIds.map(itemId => {
                        const itemMark = clItemYesNo[cl.id]?.[itemId]
                        const checklistItem = MILESTONES.flatMap(m => m.checklistItems).find(ci => ci.id === itemId)
                        const itemText = checklistItem?.text ?? itemId
                        const isUnmarked = submitAttempted[cl.id] && itemMark === undefined
                        return (
                          <div key={itemId} className={`flex items-center gap-2.5 rounded-lg transition-colors ${isUnmarked ? 'bg-[#FEF2F2] -mx-2 px-2 py-1' : ''}`}>
                            <div className="text-sm text-[#65758B] flex-1">
                              {itemText}
                              <KondisiIdealInfo text={itemText} kondisiIdeal={checklistItem?.kondisiIdeal} />
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <button onClick={() => setItemMark(cl.id, itemId, true)} className={`h-6 px-2.5 rounded text-[11px] font-semibold transition-all ${itemMark === true ? 'bg-[#16A34A] text-white' : 'bg-[#F1F5F9] text-[#65758B] hover:bg-[#DCFCE7] hover:text-[#16A34A]'}`}>Ya</button>
                              <button onClick={() => setItemMark(cl.id, itemId, false)} className={`h-6 px-2.5 rounded text-[11px] font-semibold transition-all ${itemMark === false ? 'bg-[#DC2626] text-white' : 'bg-[#F1F5F9] text-[#65758B] hover:bg-[#FEE2E2] hover:text-[#DC2626]'}`}>Tidak</button>
                            </div>
                          </div>
                        )
                      })}
                      <div className="mt-3 pt-3 border-t border-[#E1E7EF]">
                        <p className="text-xs font-semibold text-[#65758B] mb-1">Refleksi peserta</p>
                        <p className="text-sm text-[#0F1729] italic">"{task.reflection}"</p>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#65758B] uppercase tracking-wide">Catatan untuk peserta*</label>
                        <textarea
                          value={clTaskNotes[cl.id]?.[task.taskId] ?? ''}
                          onChange={e => setClTaskNotes(prev => ({ ...prev, [cl.id]: { ...(prev[cl.id] ?? {}), [task.taskId]: e.target.value } }))}
                          placeholder={`Catatan untuk task ${task.taskName}...`}
                          className={`mt-1 w-full rounded-lg px-3 py-2 text-xs outline-none transition-colors resize-none text-[#0F1729] placeholder:text-[#94A3B8] border ${
                            submitAttempted[cl.id] && !clTaskNotes[cl.id]?.[task.taskId]?.trim() ? 'border-[#DC2626]' : 'border-[#CBD5E1] focus:border-[#023DFF]'
                          }`}
                          rows={2}
                        />
                      </div>
                    </div>
                  ) : cl.items && (
                    <div className="p-5 space-y-2">
                      {cl.items.map(it => {
                        const checkItem = MILESTONES.flatMap(m => m.checklistItems).find(ci => ci.id === it.itemId)
                        return (
                          <div key={it.itemId} className="flex items-start gap-2.5">
                            <div className={`w-4 h-4 rounded flex-shrink-0 mt-0.5 flex items-center justify-center ${it.completed ? 'bg-[#023DFF]' : 'bg-[#F1F5F9] border border-[#CBD5E1]'}`}>
                              {it.completed && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </div>
                            <div>
                              <div className={`text-sm ${it.completed ? 'text-[#0F1729]' : 'text-[#94A3B8]'}`}>
                                {checkItem?.text ?? it.itemId}
                                <KondisiIdealInfo text={checkItem?.text ?? it.itemId} kondisiIdeal={checkItem?.kondisiIdeal} />
                              </div>
                              {it.note && <p className="text-xs text-[#65758B] italic mt-0.5">"{it.note}"</p>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  <div className="px-5 pb-5">
                    {task ? (() => {
                      const hasNote = !!clTaskNotes[cl.id]?.[task.taskId]?.trim()
                      const canSubmit = allTasksScored(cl.id, [task]) && hasNote
                      const attempted = submitAttempted[cl.id]
                      return (
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              if (canSubmit) {
                                handleSubmitTasks(cl.id, [task])
                              } else {
                                setSubmitAttempted(prev => ({ ...prev, [cl.id]: true }))
                              }
                            }}
                            className="w-full h-9 rounded-lg font-semibold text-sm bg-[#023DFF] hover:bg-[#001CDB] text-white transition-all"
                          >
                            Submit Penilaian
                          </button>
                          {attempted && !canSubmit && (
                            <p className="text-xs text-[#DC2626]">Semua item harus ditandai Ya atau Tidak, dan catatan wajib diisi sebelum submit</p>
                          )}
                        </div>
                      )
                    })() : reviewingId === cl.id ? (
                      <div className="border border-[#E1E7EF] rounded-xl p-4 space-y-3 bg-[#F8FAFC]">
                        <div>
                          <label className="text-xs font-semibold text-[#65758B] uppercase tracking-wide">Nilai (0–100)*</label>
                          <div className="flex flex-wrap gap-2 mt-2 mb-3">
                            {[70, 75, 80, 85, 90, 95].map(s => (
                              <button key={s} onClick={() => setScore(String(s))} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${score === String(s) ? 'bg-[#023DFF] text-white' : 'bg-white text-[#65758B] border border-[#CBD5E1] hover:border-[#023DFF]'}`}>{s}</button>
                            ))}
                            <input type="number" min="0" max="100" value={score} onChange={e => setScore(e.target.value)} placeholder="Nilai lain" className="w-24 border border-[#CBD5E1] focus:border-[#023DFF] rounded-lg px-3 py-2 text-sm outline-none transition-colors" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-[#65758B] uppercase tracking-wide">Catatan untuk peserta*</label>
                          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Catatan untuk peserta..." className="mt-1 w-full border border-[#CBD5E1] focus:border-[#023DFF] rounded-lg px-3 py-2.5 text-sm outline-none transition-colors resize-none" rows={2} />
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => setReviewingId(null)} className="flex-1 h-9 rounded-lg border border-[#CBD5E1] text-sm font-semibold text-[#65758B]">Batal</button>
                          <button onClick={() => handleScore(cl.id)} disabled={!score || !note.trim()} className={`flex-1 h-9 rounded-lg text-sm font-semibold text-white transition-all ${score && note.trim() ? 'bg-[#023DFF] hover:bg-[#001CDB]' : 'bg-[#E1E7EF] text-[#94A3B8] cursor-not-allowed'}`}>Simpan Nilai</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => { setReviewingId(cl.id); setScore(''); setNote('') }} className="w-full h-9 bg-[#023DFF] hover:bg-[#001CDB] text-white font-semibold text-sm rounded-lg transition-colors">Beri Nilai →</button>
                    )}
                  </div>
                </>
              )}
            </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
