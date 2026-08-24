import { useState } from 'react'

// Per-row entry point into an item's "Kondisi Ideal" (the curriculum spreadsheet's col AD
// — see ChecklistItem.kondisiIdeal in types/index.ts): a small info icon next to the item
// name that opens a bottom sheet with that ONE item's acceptance criterion. Renders
// nothing at all if this specific item has no kondisiIdeal defined — most items don't, and
// this is deliberately per-item rather than per-module so it never shows up somewhere the
// curriculum doesn't actually define one.
// Replaces the earlier single per-module "Panduan Penilaian" banner (2026-08-20) — that
// banner opened one bottom sheet listing every gradeable item in the module at once; this
// is scoped to the exact row the kanit is looking at instead.
export function KondisiIdealInfo({ text, kondisiIdeal }: { text: string; kondisiIdeal?: string }) {
  const [open, setOpen] = useState(false)
  if (!kondisiIdeal) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        // inline-flex (not flex/block) so this participates in the surrounding text's
        // normal inline flow — it wraps and sits right after the item name's last word
        // even when that name spans multiple lines, instead of pinning to the row's edge
        // the way a flex-row sibling would.
        className="inline-flex w-4 h-4 ml-1 rounded-full items-center justify-center align-middle text-[#94A3B8] hover:text-[#023DFF] hover:bg-[#E5F2FF] transition-colors"
        aria-label={`Lihat kondisi ideal untuk ${text}`}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M8 7.2v3.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          <circle cx="8" cy="5.3" r="0.7" fill="currentColor"/>
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="bg-white rounded-t-2xl w-full max-w-xl max-h-[70vh] flex flex-col overflow-hidden">
            {/* Drag handle — DS Bottom Sheet anatomy: handle → title → body → actions */}
            <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
              <div className="w-9 h-1 rounded-full bg-[#E1E7EF]" />
            </div>
            <div className="px-5 py-4 border-b border-[#E1E7EF] flex items-center justify-between flex-shrink-0">
              <p className="text-sm font-bold text-[#0F1729]">Kondisi Ideal</p>
              <button onClick={() => setOpen(false)} className="text-[#94A3B8] hover:text-[#65758B] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="px-5 py-4 overflow-y-auto">
              <p className="text-sm font-semibold text-[#0F1729] mb-1.5">{text}</p>
              <p className="text-sm text-[#65758B]">{kondisiIdeal}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
