import { useState } from 'react'
import { useInspect, ISelectedInfo } from './InspectContext'
import { inspectStore } from './inspectStore'

// ── Utilities ──────────────────────────────────────────────────────────────

async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(text); return true } catch {}
  }
  const ta = document.createElement('textarea')
  ta.value = text; ta.style.cssText = 'position:fixed;opacity:0'
  document.body.appendChild(ta); ta.focus(); ta.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(ta); return ok
}

async function exportImg(elId: number, scale: number): Promise<boolean> {
  const img = inspectStore.getEl(elId) as HTMLImageElement | null
  if (!img) return false
  const src = img.getAttribute('src') || ''
  const base = src.split('/').pop()?.replace(/\.[^.]+$/, '') || 'image'
  const dw = Math.round(img.offsetWidth), dh = Math.round(img.offsetHeight)
  const tw = dw * scale, th = dh * scale
  const isSvg = src.toLowerCase().endsWith('.svg')

  const download = (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `${base}@${scale}x.png`; a.click()
    URL.revokeObjectURL(url)
  }

  try {
    if (isSvg) {
      const text = await fetch(src).then(r => r.text())
      const doc = new DOMParser().parseFromString(text, 'image/svg+xml')
      const root = doc.documentElement
      if (!root.getAttribute('viewBox'))
        root.setAttribute('viewBox', `0 0 ${root.getAttribute('width') || dw} ${root.getAttribute('height') || dh}`)
      root.setAttribute('width', String(tw)); root.setAttribute('height', String(th))
      const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(root))
      await new Promise<void>((res, rej) => {
        const i = new Image()
        i.onload = () => {
          const c = document.createElement('canvas'); c.width = tw; c.height = th
          c.getContext('2d')!.drawImage(i, 0, 0, tw, th)
          c.toBlob(b => { if (b) { download(b); res() } else rej() }, 'image/png')
        }
        i.onerror = rej; i.src = dataUrl
      })
    } else {
      const nw = img.naturalWidth, nh = img.naturalHeight
      const cw = Math.max(tw, nw), ch = Math.max(th, nh)
      const canvas = document.createElement('canvas'); canvas.width = cw; canvas.height = ch
      const ctx = canvas.getContext('2d')!
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, cw, ch)
      await new Promise<void>((res, rej) =>
        canvas.toBlob(b => { if (b) { download(b); res() } else rej() }, 'image/png'))
    }
    return true
  } catch { return false }
}

async function exportSvg(elId: number, scale: number): Promise<boolean> {
  const svgEl = inspectStore.getEl(elId) as SVGElement | null
  if (!svgEl) return false
  const rect = svgEl.getBoundingClientRect()
  const dw = Math.round(rect.width), dh = Math.round(rect.height)
  const tw = dw * scale, th = dh * scale
  const clone = svgEl.cloneNode(true) as SVGElement
  if (!clone.getAttribute('viewBox'))
    clone.setAttribute('viewBox', `0 0 ${clone.getAttribute('width') || dw} ${clone.getAttribute('height') || dh}`)
  clone.setAttribute('width', String(tw)); clone.setAttribute('height', String(th))
  const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(clone))
  try {
    await new Promise<void>((res, rej) => {
      const i = new Image()
      i.onload = () => {
        const c = document.createElement('canvas'); c.width = tw; c.height = th
        c.getContext('2d')!.drawImage(i, 0, 0, tw, th)
        c.toBlob(b => {
          if (!b) { rej(); return }
          const url = URL.createObjectURL(b); const a = document.createElement('a')
          a.href = url; a.download = `icon@${scale}x.png`; a.click()
          URL.revokeObjectURL(url); res()
        }, 'image/png')
      }
      i.onerror = rej; i.src = dataUrl
    })
    return true
  } catch { return false }
}

// ── Sub-components ─────────────────────────────────────────────────────────

function CopyBtn({ text, label = 'Copy CSS' }: { text: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'ok'>('idle')
  return (
    <button
      className="w-full py-[5px] rounded text-[10px] font-mono tracking-wide mt-[6px] transition-colors"
      style={{
        background: state === 'ok' ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${state === 'ok' ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.1)'}`,
        color: state === 'ok' ? '#34d399' : '#94a3b8',
      }}
      onClick={async () => {
        await copyText(text)
        setState('ok')
        setTimeout(() => setState('idle'), 1500)
      }}
    >
      {state === 'ok' ? '✓ Copied!' : label}
    </button>
  )
}

function ExportBtn({
  label, onClick,
}: { label: string; onClick: () => Promise<boolean> }) {
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  return (
    <button
      className="py-[4px] rounded text-[10px] font-mono"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: `1px solid ${state === 'ok' ? 'rgba(52,211,153,0.4)' : state === 'err' ? 'rgba(248,113,113,0.4)' : 'rgba(255,255,255,0.1)'}`,
        color: state === 'ok' ? '#34d399' : state === 'err' ? '#f87171' : '#94a3b8',
      }}
      onClick={async () => {
        setState('loading'); const ok = await onClick()
        setState(ok ? 'ok' : 'err'); setTimeout(() => setState('idle'), 1500)
      }}
    >
      {state === 'loading' ? '…' : state === 'ok' ? '✓' : state === 'err' ? 'err' : label}
    </button>
  )
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '8px 0' }} />
}

function Section({ label }: { label: string }) {
  return <p className="text-[10px] font-bold tracking-wider uppercase mb-[6px]" style={{ color: '#f59e0b' }}>{label}</p>
}

function Row({ label, value, token, hex }: { label: string; value: string; token?: string; hex?: string }) {
  return (
    <div className="flex gap-[6px] items-start mb-[5px]">
      <span className="text-[10px] font-mono shrink-0" style={{ color: '#64748b', minWidth: 72 }}>{label}</span>
      <span className="text-[11px] font-mono leading-tight" style={{ color: '#f1f5f9' }}>
        {hex && (
          <span
            className="inline-block w-[10px] h-[10px] rounded-[2px] align-middle mr-[4px] shrink-0"
            style={{ backgroundColor: hex, border: '1px solid rgba(255,255,255,0.2)' }}
          />
        )}
        {value}
        {token && <span style={{ color: '#34d399' }}> ({token})</span>}
      </span>
    </div>
  )
}

function parseRow(t: string): { key: string; val: string } {
  const di = t.indexOf(' · ')
  if (di !== -1) return { key: t.slice(0, di).trim(), val: t.slice(di + 3).trim() }
  const ci = t.indexOf(':')
  if (ci !== -1) return { key: t.slice(0, ci).trim(), val: t.slice(ci + 1).trim() }
  return { key: t, val: '' }
}

function hexFromVal(val: string): string | null {
  const m = val.match(/#([0-9a-fA-F]{6})\b/)
  return m ? m[0] : null
}

// ── Panel bodies ───────────────────────────────────────────────────────────

function ImageBody({ info }: { info: ISelectedInfo }) {
  const { src, isSvg, displayW = 0, displayH = 0, naturalW = 0, naturalH = 0, elId = 0 } = info
  const filename = (src || '').split('/').pop()?.split('?')[0] || '<img>'
  const isLowRes = !isSvg && naturalW < displayW * 2
  return (
    <div className="px-[12px] pt-[10px] pb-[12px]">
      <p className="text-[12px] font-bold mb-[1px]" style={{ color: '#60a5fa' }}>Image Asset</p>
      <p className="text-[10px] mb-[8px]" style={{ color: '#475569' }}>&lt;img&gt;</p>
      <Divider />
      <Row label="file" value={filename} />
      <Row label="display" value={`${displayW}×${displayH}px`} />
      {isSvg
        ? <Row label="source" value="SVG · vector" token="lossless" />
        : <Row label="source" value={`${naturalW}×${naturalH}px${isLowRes ? ' ⚠' : ''}`} />
      }
      {isLowRes && (
        <p className="text-[9px] leading-relaxed mb-[6px]" style={{ color: '#f59e0b' }}>
          Source is low-res. Re-export from Figma at 2x+ for crisp downloads.
        </p>
      )}
      <Divider />
      <Section label="Export" />
      <div className="grid gap-[5px]" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
        {[1, 2, 3, 4].map(scale => {
          const ow = isSvg ? displayW * scale : Math.max(displayW * scale, naturalW)
          const blurry = !isSvg && ow > naturalW
          return (
            <ExportBtn
              key={scale}
              label={<span style={{ color: blurry ? '#f59e0b' : undefined }}>{scale}x · {ow}px</span> as unknown as string}
              onClick={() => exportImg(elId, scale)}
            />
          )
        })}
      </div>
      {src && <CopyBtn text={src} label="Copy src path" />}
    </div>
  )
}

function SvgBody({ info }: { info: ISelectedInfo }) {
  const { displayW = 0, displayH = 0, elId = 0, markupId } = info
  const markupStr = markupId ? (inspectStore.getStr(markupId) ?? '') : ''
  return (
    <div className="px-[12px] pt-[10px] pb-[12px]">
      <p className="text-[12px] font-bold mb-[1px]" style={{ color: '#60a5fa' }}>SVG Icon</p>
      <p className="text-[10px] mb-[8px]" style={{ color: '#475569' }}>&lt;svg&gt; — inline</p>
      <Divider />
      <Row label="display" value={`${displayW}×${displayH}px`} />
      <Row label="source" value="SVG · vector" token="lossless" />
      <Divider />
      <Section label="Export" />
      <div className="grid gap-[5px]" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
        {[1, 2, 3, 4].map(scale => (
          <ExportBtn
            key={scale}
            label={`${scale}x · ${displayW * scale}px`}
            onClick={() => exportSvg(elId, scale)}
          />
        ))}
      </div>
      {markupStr && <CopyBtn text={markupStr} label="Copy SVG markup" />}
    </div>
  )
}

function TokenBody({ info }: { info: ISelectedInfo }) {
  const isAuto = info.type === 'element'
  return (
    <div className="px-[12px] pt-[10px] pb-[12px]">
      <p className="text-[12px] font-bold mb-[1px]" style={{ color: '#60a5fa' }}>{info.label}</p>
      <p className="text-[10px] mb-[8px]" style={{ color: '#475569' }}>
        {isAuto ? 'computed styles' : 'design tokens'}
      </p>
      {info.tokens.length > 0 && (
        <>
          <Divider />
          <Section label={isAuto ? 'Computed' : 'Tokens'} />
          {info.tokens.map((t, i) => {
            const { key, val } = parseRow(t)
            const hex = hexFromVal(val)
            return <Row key={i} label={key} value={val || '—'} hex={hex ?? undefined} />
          })}
        </>
      )}
      {info.css && (
        <>
          <Divider />
          <CopyBtn text={info.css} label="Copy CSS" />
        </>
      )}
    </div>
  )
}

// ── Main panel ─────────────────────────────────────────────────────────────

export function InspectPanel() {
  const { active, selectedInfo, setSelectedInfo } = useInspect()

  if (!active) return null

  return (
    <div className="flex flex-col gap-3" style={{ width: 260, paddingTop: 4 }}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#023dff] rounded-full w-2 h-2" />
          <span className="text-[13px] font-bold text-[#0f1729]">Inspect</span>
        </div>
        <span className="text-[11px] text-[#94a3b8]">press I to exit</span>
      </div>

      {/* Panel body */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: '#021431', minHeight: 160, position: 'relative' }}
      >
        {!selectedInfo ? (
          <div className="flex flex-col items-center justify-center gap-2 h-40 px-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <p className="text-[12px] text-center leading-[18px]" style={{ color: '#475569' }}>
              Click any element on the page to inspect it.
            </p>
          </div>
        ) : (
          <>
            {selectedInfo.type === 'image' && <ImageBody info={selectedInfo} />}
            {selectedInfo.type === 'svg' && <SvgBody info={selectedInfo} />}
            {(selectedInfo.type === 'component' || selectedInfo.type === 'element') && (
              <TokenBody info={selectedInfo} />
            )}
            {/* Deselect */}
            <button
              onClick={() => setSelectedInfo(null)}
              className="w-full text-left px-[12px] pb-[10px] text-[11px] hover:opacity-80"
              style={{ color: '#475569' }}
            >
              ✕ deselect
            </button>
          </>
        )}
      </div>
    </div>
  )
}
