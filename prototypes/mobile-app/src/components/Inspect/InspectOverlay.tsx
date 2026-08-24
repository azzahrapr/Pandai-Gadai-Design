import { useRef, useEffect } from 'react'
import { useInspect, ISelectedInfo } from './InspectContext'
import { inspectStore } from './inspectStore'

// ── Cortes token maps (from design-tokens.md) ──────────────────────────────

const COLOR_TOKENS: Record<string, string> = {
  '#023dff': 'background/primary',
  '#001cdb': 'background/primary-darker',
  '#ffcd05': 'background/secondary',
  '#ffffff': 'background/neutral',
  '#f8fafc': 'background/subtle',
  '#e1e7ef': 'background/disabled',
  '#0f1729': 'background/dark',
  '#16a34a': 'background/success',
  '#f0fdf4': 'background/success-subtle',
  '#dc2626': 'background/error',
  '#fef2f2': 'background/error-subtle',
  '#e5f2ff': 'background/info-subtle',
  '#15803d': 'text/success',
  '#b91c1c': 'text/error',
  '#cbd5e1': 'border/default',
  '#94a3b8': 'border/hover',
  // prototype approximations
  '#0f172a': 'text/default ~',
  '#021431': 'text/default ~',
  '#001533': 'text/default ~',
  '#65758b': 'text/subtle',
  '#5f6c85': 'text/subtle ~',
  '#94a0b8': 'text/disabled ~',
  '#0255ca': 'background/primary ~',
  '#28832d': 'background/success ~',
  '#e85c3d': 'background/error ~',
  '#e1e6ef': 'border/subtle ~',
  '#ebf5ff': 'background/info-subtle ~',
  '#e6ecff': 'blue/100 ~',
  '#d3f1d4': 'background/success-subtle ~',
  '#f1f3f9': 'background/subtle ~',
  '#f8f9fc': 'background/subtle ~',
}

const FONT_TOKENS: Record<string, string> = {
  '48-700': 'font-styles/heading-1',
  '36-700': 'font-styles/heading-2',
  '28-700': 'font-styles/heading-3',
  '20-700': 'font-styles/title-1',
  '18-600': 'font-styles/title-2',
  '16-600': 'font-styles/subtitle-1',
  '14-600': 'font-styles/subtitle-2',
  '16-400': 'font-styles/body-1',
  '14-400': 'font-styles/body-2',
  '12-400': 'font-styles/caption-1',
  '10-400': 'font-styles/caption-2',
  '12-700': 'font-styles/label-1',
  '10-700': 'font-styles/label-2',
}

const RADIUS_TOKENS: Record<string, string> = {
  '4px': 'rounded-sm', '6px': 'rounded', '8px': 'rounded-lg',
  '10px': 'rounded-xl', '12px': 'rounded-2xl', '16px': 'rounded-3xl',
  '9999px': 'rounded-full', '50%': 'rounded-full',
}

// ── Helpers ────────────────────────────────────────────────────────────────

function rgbToHex(rgb: string): string | null {
  const m = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!m) return null
  if (rgb.match(/rgba\(.*,\s*0\)/)) return null
  return '#' + [m[1], m[2], m[3]].map(n => parseInt(n).toString(16).padStart(2, '0')).join('')
}

function resolveColorHex(hex: string): string {
  const tok = COLOR_TOKENS[hex.toLowerCase()]
  return tok ? `${hex} — ${tok}` : hex
}

function resolveFont(cs: CSSStyleDeclaration): string | null {
  const size = Math.round(parseFloat(cs.fontSize))
  const weight = parseInt(cs.fontWeight)
  const key = `${size}-${weight >= 700 ? '700' : weight >= 600 ? '600' : '400'}`
  return FONT_TOKENS[key] ?? null
}

function resolveRadius(val: string): string {
  const first = val.split(' ')[0]
  return RADIUS_TOKENS[first] ?? val
}

// ── CSS builder (for Copy CSS button) ────────────────────────────────────

function buildCss(el: HTMLElement, cs: CSSStyleDeclaration): string {
  const colorHex = rgbToHex(cs.color)
  const bgHex = rgbToHex(cs.backgroundColor)
  const borderHex = rgbToHex(cs.borderTopColor)
  const tag = el.tagName.toLowerCase()

  const withTok = (hex: string | null) => {
    if (!hex) return ''
    const tok = COLOR_TOKENS[hex.toLowerCase()]
    return tok ? ` /* ${tok} */` : ''
  }

  const lines = [
    colorHex ? `  color: ${colorHex};${withTok(colorHex)}` : '',
    bgHex ? `  background: ${bgHex};${withTok(bgHex)}` : '',
    borderHex && cs.borderTopWidth !== '0px' && borderHex !== colorHex
      ? `  border-color: ${borderHex};${withTok(borderHex)}` : '',
    `  font-size: ${cs.fontSize};`,
    `  font-weight: ${cs.fontWeight};`,
    cs.padding !== '0px' ? `  padding: ${cs.padding};` : '',
    cs.borderRadius !== '0px' ? `  border-radius: ${cs.borderRadius};` : '',
    `  width: ${Math.round(el.offsetWidth)}px;`,
    `  height: ${Math.round(el.offsetHeight)}px;`,
  ].filter(Boolean)

  return `${tag} {\n${lines.join('\n')}\n}`
}

// ── Auto token rows (for element panel) ──────────────────────────────────

function buildAutoRows(el: HTMLElement, cs: CSSStyleDeclaration): string[] {
  const rows: string[] = []

  const fontTok = resolveFont(cs)
  if (fontTok) rows.push(`type · ${fontTok}`)
  rows.push(`font · ${Math.round(parseFloat(cs.fontSize))}px / ${cs.fontWeight} / lh ${cs.lineHeight}`)

  const colorHex = rgbToHex(cs.color)
  if (colorHex) rows.push(`color · ${resolveColorHex(colorHex)}`)

  const bgHex = rgbToHex(cs.backgroundColor)
  if (bgHex) rows.push(`bg · ${resolveColorHex(bgHex)}`)

  const bw = cs.borderTopWidth
  if (bw && bw !== '0px') {
    const borderHex = rgbToHex(cs.borderTopColor)
    rows.push(`border · ${bw} ${borderHex ? resolveColorHex(borderHex) : ''}`)
  }

  const br = cs.borderRadius
  if (br && br !== '0px') rows.push(`radius · ${br} — ${resolveRadius(br)}`)

  rows.push(`size · ${Math.round(el.offsetWidth)}×${Math.round(el.offsetHeight)}px`)

  const [pt, pr, pb, pl] = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft]
  if ([pt, pr, pb, pl].some(v => v !== '0px')) rows.push(`padding · ${pt} ${pr} ${pb} ${pl}`)

  return rows
}

// ── Info builder ──────────────────────────────────────────────────────────

function buildInfo(el: HTMLElement): ISelectedInfo {
  // 1. Image
  if (el.tagName === 'IMG') {
    const img = el as HTMLImageElement
    const src = img.getAttribute('src') || ''
    const filename = src.split('/').pop()?.split('?')[0] || '<img>'
    const elId = inspectStore.setEl(img)
    return {
      type: 'image',
      label: img.alt || filename,
      tokens: [],
      src,
      isSvg: src.toLowerCase().endsWith('.svg'),
      displayW: Math.round(img.offsetWidth),
      displayH: Math.round(img.offsetHeight),
      naturalW: img.naturalWidth,
      naturalH: img.naturalHeight,
      elId,
    }
  }

  // 2. SVG
  const svgEl = (el.tagName.toLowerCase() === 'svg' ? el : el.closest('svg')) as HTMLElement | null
  if (svgEl) {
    const rect = svgEl.getBoundingClientRect()
    const elId = inspectStore.setEl(svgEl)
    const markupId = inspectStore.setStr(svgEl.outerHTML)
    return {
      type: 'svg',
      label: 'SVG Icon',
      tokens: [],
      displayW: Math.round(rect.width),
      displayH: Math.round(rect.height),
      elId,
      markupId,
    }
  }

  // 3. InspectLabel ancestor
  let labeled: HTMLElement | null = el
  while (labeled) {
    if ((labeled as HTMLElement).dataset?.inspectLabel !== undefined) break
    labeled = labeled.parentElement
  }
  if (labeled?.dataset.inspectLabel) {
    const raw = labeled.dataset.inspectTokens
    const tokens: string[] = raw ? JSON.parse(raw) : []
    const cs = getComputedStyle(labeled)
    return {
      type: 'component',
      label: labeled.dataset.inspectLabel,
      tokens,
      css: buildCss(labeled, cs),
    }
  }

  // 4. Any element — computed styles
  const cs = getComputedStyle(el)
  const tag = el.tagName.toLowerCase()
  const text = el.childElementCount === 0 ? el.textContent?.trim().slice(0, 50) : null
  return {
    type: 'element',
    label: text ? `"${text}"` : `<${tag}>`,
    tokens: buildAutoRows(el, cs),
    css: buildCss(el, cs),
  }
}

// ── Component ─────────────────────────────────────────────────────────────

export function InspectOverlay() {
  const { active, setSelectedInfo } = useInspect()
  const hoveredEl = useRef<Element | null>(null)
  const lockedEl = useRef<Element | null>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active && ringRef.current) ringRef.current.style.display = 'none'
  }, [active])

  if (!active) return null

  const getEl = (clientX: number, clientY: number, overlay: HTMLDivElement): HTMLElement | null => {
    overlay.style.pointerEvents = 'none'
    const el = document.elementFromPoint(clientX, clientY) as HTMLElement | null
    overlay.style.pointerEvents = 'auto'
    return el
  }

  const updateRing = (el: Element | null, locked: boolean) => {
    const ring = ringRef.current
    if (!ring) return
    if (!el) { ring.style.display = 'none'; return }
    const r = el.getBoundingClientRect()
    ring.style.display = 'block'
    ring.style.top = r.top + 'px'
    ring.style.left = r.left + 'px'
    ring.style.width = r.width + 'px'
    ring.style.height = r.height + 'px'
    ring.style.outline = locked
      ? '2px solid #023dff'
      : '1.5px dashed rgba(2,61,255,0.55)'
    ring.style.boxShadow = locked ? '0 0 0 4px rgba(2,61,255,0.1)' : 'none'
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = getEl(e.clientX, e.clientY, e.currentTarget)
    if (!el || el === hoveredEl.current) return
    hoveredEl.current = el
    if (el !== lockedEl.current) updateRing(el, false)
  }

  const handleMouseLeave = () => {
    hoveredEl.current = null
    updateRing(lockedEl.current, true)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = getEl(e.clientX, e.clientY, e.currentTarget)
    if (!el) {
      lockedEl.current = null
      updateRing(null, false)
      setSelectedInfo(null)
      return
    }
    lockedEl.current = el
    hoveredEl.current = null
    updateRing(el, true)
    setSelectedInfo(buildInfo(el))
  }

  return (
    <>
      {/* Transparent capture layer */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ position: 'absolute', inset: 0, zIndex: 9998, cursor: 'crosshair' }}
      />
      {/* Fixed ring indicator — escapes overflow:hidden */}
      <div
        ref={ringRef}
        style={{
          display: 'none',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99999,
          outlineOffset: '2px',
          borderRadius: '2px',
        }}
      />
    </>
  )
}
