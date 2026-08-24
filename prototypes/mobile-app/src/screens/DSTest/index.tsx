import { useState } from 'react'

// ── Tokens ─────────────────────────────────────────────────────────────────────
const T = {
  bg: {
    primary:        '#023DFF',
    primaryDarker:  '#001CDB',
    secondary:      '#FFCD05',
    neutral:        '#FFFFFF',
    subtle:         '#F8FAFC',
    disabled:       '#E1E7EF',
    dark:           '#0F1729',
    darkSecondary:  '#344256',
    success:        '#16A34A',
    successSubtle:  '#F0FDF4',
    warning:        '#E0A200',
    warningSubtle:  '#FEFDEA',
    error:          '#DC2626',
    errorSubtle:    '#FEF2F2',
    infoSubtle:     '#E5F2FF',
  },
  text: {
    default:  '#0F1729',
    subtle:   '#65758B',
    disabled: '#94A3B8',
    neutral:  '#FFFFFF',
    link:     '#023DFF',
    info:     '#001CDB',
    success:  '#15803D',
    warning:  '#B27202',
    error:    '#B91C1C',
  },
  border: {
    default: '#CBD5E1',
    subtle:  '#E1E7EF',
    hover:   '#94A3B8',
    info:    '#023DFF',
    error:   '#DC2626',
    success: '#16A34A',
    warning: '#E0A200',
    neutral: '#FFFFFF',
  },
  icon: {
    default:  '#0F1729',
    subtle:   '#65758B',
    disabled: '#94A3B8',
    neutral:  '#FFFFFF',
    info:     '#0020E3',
    success:  '#16A34A',
    warning:  '#E0A200',
    error:    '#DC2626',
  },
  radius: { sm: 4, base: 6, lg: 8, xl: 10, '2xl': 12, '3xl': 16, full: 9999 },
}

// ── Shared helpers ─────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: T.text.subtle, textTransform: 'uppercase' }}>{title}</p>
      {children}
    </div>
  )
}
function Card({ children, p = 16 }: { children: React.ReactNode; p?: number }) {
  return <div style={{ backgroundColor: T.bg.neutral, borderRadius: T.radius.xl, padding: p }}>{children}</div>
}
function SubLabel({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 12, fontWeight: 600, color: T.text.subtle, marginBottom: 8 }}>{children}</p>
}
function HR() {
  return <div style={{ height: 1, backgroundColor: T.border.subtle, margin: '12px 0' }} />
}
function Row({ children, gap = 8, wrap = true }: { children: React.ReactNode; gap?: number; wrap?: boolean }) {
  return <div style={{ display: 'flex', flexWrap: wrap ? 'wrap' : 'nowrap', gap, alignItems: 'center' }}>{children}</div>
}

// ── SVG Icon kit ──────────────────────────────────────────────────────────────
const Icon = {
  ChevronDown: ({ color = T.icon.subtle, size = 16 }: { color?: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  ChevronLeft: ({ color = T.icon.default }: { color?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15l-5-5 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  ChevronRight: ({ color = T.icon.default }: { color?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 5l5 5-5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  Check: ({ color = T.icon.neutral, size = 12 }: { color?: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  X: ({ color = T.icon.subtle, size = 16 }: { color?: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  Bell: ({ color = T.icon.subtle }: { color?: string }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  ),
  Home: ({ color = T.icon.subtle }: { color?: string }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  CreditCard: ({ color = T.icon.subtle }: { color?: string }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
  ),
  Star: ({ color = T.icon.subtle }: { color?: string }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  User: ({ color = T.icon.subtle }: { color?: string }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Upload: ({ color = T.icon.subtle }: { color?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
  ),
  Image: ({ color = T.icon.subtle }: { color?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
  ),
  Info: ({ color = T.icon.info }: { color?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={color}><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
  ),
  CheckCircle: ({ color = T.icon.success }: { color?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={color}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
  ),
  Warning: ({ color = T.icon.warning }: { color?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={color}><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
  ),
  XCircle: ({ color = T.icon.error }: { color?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={color}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
  ),
  Eye: ({ color = T.icon.subtle }: { color?: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Arrow: ({ color = T.icon.subtle }: { color?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12l4-4-4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  Menu: ({ color = T.icon.neutral }: { color?: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  ),
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ── Avatar ─────────────────────────────────────────────────────────────────────
const avatarSizes: Record<string, number> = { large: 40, medium: 32, default: 24, small: 16 }
function Avatar({ size = 'medium', initials = 'AZ', src }: { size?: string; initials?: string; src?: string }) {
  const d = avatarSizes[size] ?? 32
  const fontSize = d * 0.38
  return (
    <div style={{
      width: d, height: d, borderRadius: T.radius.full,
      backgroundColor: src ? T.bg.disabled : T.bg.primary,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flexShrink: 0,
    }}>
      {src
        ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span style={{ fontSize, fontWeight: 700, color: T.text.neutral }}>{initials}</span>
      }
    </div>
  )
}

// ── Badge Notification ─────────────────────────────────────────────────────────
function BadgeNotif({ variant, count }: { variant: 'dot' | 'number' | 'text'; count?: number }) {
  if (variant === 'dot') return (
    <span style={{ width: 8, height: 8, borderRadius: T.radius.full, backgroundColor: T.bg.error, display: 'inline-block' }} />
  )
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      // height=20 per spec; minWidth=20 keeps single digits circular, wider for 2+ digits
      height: 20, minWidth: 20, padding: '0 5px',
      backgroundColor: T.bg.error, borderRadius: T.radius.full,
      fontSize: 10, fontWeight: 700, color: T.text.neutral,
    }}>{variant === 'text' ? 'New' : count ?? 5}</span>
  )
}

// ── Badge Product ──────────────────────────────────────────────────────────────
function BadgeProduct({ variant }: { variant: 'light' | 'heavy' }) {
  const isHeavy = variant === 'heavy'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 8px',
      backgroundColor: isHeavy ? T.bg.primary : T.bg.infoSubtle,
      border: isHeavy ? 'none' : `1px solid ${T.border.info}`,
      borderRadius: T.radius.full,
      fontSize: 10, fontWeight: 700,
      color: isHeavy ? T.text.neutral : T.text.info,
    }}>Emas 24K</span>
  )
}

// ── Badge Status ───────────────────────────────────────────────────────────────
type IBadgeState = 'success' | 'informative' | 'warning' | 'error' | 'finished'
const badgeMap: Record<IBadgeState, { bg: string; border: string; text: string; label: string }> = {
  success:     { bg: T.bg.successSubtle, border: T.border.success, text: T.text.success, label: 'Lunas' },
  informative: { bg: T.bg.infoSubtle,    border: T.border.info,    text: T.text.info,    label: 'Aktif' },
  warning:     { bg: T.bg.warningSubtle, border: T.border.warning,  text: T.text.warning, label: 'Menunggu' },
  error:       { bg: T.bg.errorSubtle,   border: T.border.error,    text: T.text.error,   label: 'Ditolak' },
  finished:    { bg: T.bg.disabled,      border: T.border.subtle,   text: T.text.subtle,  label: 'Selesai' },
}
function BadgeStatus({ state, label }: { state: IBadgeState; label?: string }) {
  const t = badgeMap[state]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 16, padding: '0 8px',
      backgroundColor: t.bg, border: `1px solid ${t.border}`,
      borderRadius: T.radius.full, fontSize: 10, fontWeight: 700, color: t.text,
    }}>{label ?? t.label}</span>
  )
}

// ── Banner Info ────────────────────────────────────────────────────────────────
type IBannerType = 'base' | 'informative' | 'success' | 'alert' | 'error'
const bannerMap: Record<IBannerType, { bg: string; border: string; text: string; icon: React.ReactNode; label: string }> = {
  base:        { bg: T.bg.subtle,        border: T.border.default, text: T.text.default,  icon: <Icon.Info color={T.icon.subtle} />,   label: 'Base — informasi umum' },
  informative: { bg: T.bg.infoSubtle,    border: T.border.info,    text: T.text.info,     icon: <Icon.Info />,                          label: 'Informasi penting untuk kamu' },
  success:     { bg: T.bg.successSubtle, border: T.border.success,  text: T.text.success,  icon: <Icon.CheckCircle />,                   label: 'Berhasil! Data telah disimpan' },
  alert:       { bg: T.bg.warningSubtle, border: T.border.warning,  text: T.text.warning,  icon: <Icon.Warning />,                       label: 'Perhatikan batas waktu pembayaran' },
  error:       { bg: T.bg.errorSubtle,   border: T.border.error,    text: T.text.error,    icon: <Icon.XCircle />,                       label: 'Terjadi kesalahan, coba lagi' },
}
function BannerInfo({ type }: { type: IBannerType }) {
  const t = bannerMap[type]
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 12px', borderRadius: T.radius.lg,
      backgroundColor: t.bg, border: `1px solid ${t.border}`,
      minHeight: 44,
    }}>
      <div style={{ flexShrink: 0 }}>{t.icon}</div>
      <p style={{ fontSize: 12, fontWeight: 400, color: t.text, lineHeight: '16px', flex: 1 }}>{t.label}</p>
    </div>
  )
}

// ── Button ─────────────────────────────────────────────────────────────────────
type IBtnType = 'primary' | 'secondary' | 'ghost' | 'destructive'
type IBtnSize = 'lg' | 'md' | 'sm' | 'xs'
const btnBase: Record<IBtnType, { bg: string; text: string; border?: string }> = {
  primary:     { bg: T.bg.primary,  text: T.text.neutral },
  secondary:   { bg: T.bg.neutral,  text: T.text.default, border: T.border.default },
  ghost:       { bg: 'transparent', text: T.text.link },
  destructive: { bg: T.bg.error,    text: T.text.neutral },
}
const btnSz: Record<IBtnSize, { h: number; px: number; fs: number }> = {
  lg: { h: 44, px: 16, fs: 14 }, md: { h: 38, px: 16, fs: 14 },
  sm: { h: 30, px: 8,  fs: 14 }, xs: { h: 24, px: 8,  fs: 12 },
}
function Button({ label, type = 'primary', size = 'lg', disabled = false, loading = false, fullWidth = false, onClick }: {
  label: string; type?: IBtnType; size?: IBtnSize; disabled?: boolean; loading?: boolean; fullWidth?: boolean; onClick?: () => void
}) {
  const [hov, setHov] = useState(false)
  const s = btnBase[type]; const sz = btnSz[size]
  const off = disabled || loading
  let bg = s.bg, tc = s.text, br = s.border
  if (off)       { bg = T.bg.disabled; tc = T.text.disabled; br = undefined }
  else if (hov)  {
    if (type === 'primary')     bg = T.bg.primaryDarker
    if (type === 'secondary') { bg = T.bg.infoSubtle; tc = T.text.link; br = T.border.info }
    if (type === 'ghost')       bg = T.bg.infoSubtle
    if (type === 'destructive') bg = T.text.error
  }
  return (
    <button disabled={off} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        height: sz.h, padding: `0 ${sz.px}px`, backgroundColor: bg, color: tc,
        border: br ? `1px solid ${br}` : 'none', borderRadius: T.radius.lg,
        fontSize: sz.fs, fontWeight: 600, cursor: off ? 'not-allowed' : 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 6, whiteSpace: 'nowrap', transition: 'all 0.15s',
        width: fullWidth ? '100%' : undefined,
      }}>
      {loading ? <SpinnerIcon color={tc} /> : label}
    </button>
  )
}
function SpinnerIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <circle cx="8" cy="8" r="6" stroke={color} strokeOpacity="0.3" strokeWidth="2" />
      <path d="M8 2a6 6 0 0 1 6 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ── Checkbox ───────────────────────────────────────────────────────────────────
function Checkbox({ label, checked = false, disabled = false, onChange }: {
  label: string; checked?: boolean; disabled?: boolean; onChange?: (v: boolean) => void
}) {
  const on = checked && !disabled
  const boxBg    = on ? T.bg.primary : disabled ? T.bg.disabled : T.bg.neutral
  const boxBr    = on ? T.border.info : disabled ? T.border.subtle : T.border.default
  const labelClr = disabled ? T.text.disabled : T.text.default
  return (
    <button onClick={() => !disabled && onChange?.(!checked)}
      style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', padding: 0 }}>
      <div style={{
        width: 16, height: 16, borderRadius: T.radius.sm, border: `1px solid ${boxBr}`,
        backgroundColor: boxBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {checked && <Icon.Check color={disabled ? T.icon.disabled : T.icon.neutral} size={10} />}
      </div>
      <span style={{ fontSize: 14, color: labelClr }}>{label}</span>
    </button>
  )
}

// ── Chips ──────────────────────────────────────────────────────────────────────
function Chip({ label, active = false, disabled = false, badge, onClick }: {
  label: string; active?: boolean; disabled?: boolean; badge?: number; onClick?: () => void
}) {
  let bg = T.bg.neutral, br = T.border.default, tc = T.text.default
  if (active)   { bg = T.bg.infoSubtle;  br = T.border.info;    tc = T.text.link }
  if (disabled) { bg = T.bg.subtle;      br = T.border.default; tc = T.text.disabled }
  return (
    <div onClick={() => !disabled && onClick?.()} style={{
      position: 'relative', display: 'inline-flex', alignItems: 'center',
      height: 32, padding: `0 ${badge !== undefined ? 28 : 12}px 0 12px`,
      backgroundColor: bg, border: `1px solid ${br}`, borderRadius: T.radius.full,
      fontSize: 14, fontWeight: 600, color: tc, cursor: disabled ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
    }}>
      {label}
      {badge !== undefined && (
        <span style={{
          position: 'absolute', top: -6, right: -6, minWidth: 16, height: 16,
          backgroundColor: active ? T.bg.primary : T.bg.error, color: T.text.neutral,
          borderRadius: T.radius.full, fontSize: 10, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
        }}>{badge}</span>
      )}
    </div>
  )
}

// ── Divider ────────────────────────────────────────────────────────────────────
function DividerComp({ type }: { type: 'line' | 'gap' | 'dash' }) {
  if (type === 'gap') return <div style={{ height: 8, backgroundColor: T.bg.subtle }} />
  return (
    <div style={{
      height: 1, width: '100%',
      borderTop: `1px ${type === 'dash' ? 'dashed' : 'solid'} ${T.border.subtle}`,
    }} />
  )
}

// ── List ───────────────────────────────────────────────────────────────────────
type IListState = 'active' | 'hovered' | 'disabled'
type IListAction = 'checkbox' | 'radio' | 'arrow' | 'none'
function ListItem({ label, sub, state = 'active', nested = false, action = 'arrow' }: {
  label: string; sub?: string; state?: IListState; nested?: boolean; action?: IListAction
}) {
  const [hov, setHov] = useState(false)
  const isDisabled = state === 'disabled'
  const bg = (hov && !isDisabled) || state === 'hovered' ? T.bg.subtle : T.bg.neutral
  const tc = isDisabled ? T.text.disabled : T.text.default
  const sc = isDisabled ? T.text.disabled : T.text.subtle
  const iconColor = isDisabled ? T.icon.disabled : T.icon.subtle

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, minHeight: 44,
        padding: `0 16px 0 ${nested ? 32 : 16}px`,
        backgroundColor: bg, borderBottom: `1px solid ${T.border.subtle}`,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, color: tc, fontWeight: 400 }}>{label}</p>
        {sub && <p style={{ fontSize: 12, color: sc }}>{sub}</p>}
      </div>
      {action === 'arrow' && <Icon.Arrow color={iconColor} />}
      {action === 'checkbox' && (
        <div style={{ width: 16, height: 16, borderRadius: T.radius.sm, border: `1px solid ${isDisabled ? T.border.subtle : T.border.default}`, backgroundColor: T.bg.neutral }} />
      )}
      {action === 'radio' && (
        <div style={{ width: 16, height: 16, borderRadius: T.radius.full, border: `1px solid ${isDisabled ? T.border.subtle : T.border.default}` }} />
      )}
    </div>
  )
}

// ── Loader General ─────────────────────────────────────────────────────────────
function LoaderGeneral({ size = 'default' }: { size?: 'small' | 'default' | 'large' | 'extra large' }) {
  const sz = { small: 24, default: 32, large: 40, 'extra large': 48 }[size] ?? 32
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width={sz} height={sz} viewBox="0 0 32 32" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
        <circle cx="16" cy="16" r="12" stroke={T.bg.disabled} strokeWidth="3" />
        <path d="M16 4a12 12 0 0 1 12 12" stroke={T.bg.primary} strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span style={{ fontSize: 12, color: T.text.subtle }}>{size}</span>
    </div>
  )
}

// ── Loader Skeleton ────────────────────────────────────────────────────────────
function SkeletonRect({ w = '100%', h = 16, radius = T.radius.lg }: { w?: string | number; h?: number; radius?: number }) {
  return <div style={{ width: w, height: h, borderRadius: radius, backgroundColor: T.bg.disabled }} />
}
function SkeletonCircle({ size = 40 }: { size?: number }) {
  return <div style={{ width: size, height: size, borderRadius: T.radius.full, backgroundColor: T.bg.disabled, flexShrink: 0 }} />
}

// ── Modal ──────────────────────────────────────────────────────────────────────
type IModalVariant = 'default' | 'info' | 'success' | 'alert' | 'error'
const modalIcon: Record<IModalVariant, React.ReactNode> = {
  default: null,
  info:    <div style={{ width: 48, height: 48, borderRadius: T.radius.full, backgroundColor: T.bg.infoSubtle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Info /></div>,
  success: <div style={{ width: 48, height: 48, borderRadius: T.radius.full, backgroundColor: T.bg.successSubtle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.CheckCircle /></div>,
  alert:   <div style={{ width: 48, height: 48, borderRadius: T.radius.full, backgroundColor: T.bg.warningSubtle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Warning /></div>,
  error:   <div style={{ width: 48, height: 48, borderRadius: T.radius.full, backgroundColor: T.bg.errorSubtle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.XCircle /></div>,
}
const modalTitle: Record<IModalVariant, string> = {
  default: 'Konfirmasi Aksi', info: 'Informasi', success: 'Berhasil!', alert: 'Perhatian', error: 'Terjadi Kesalahan',
}
function ModalComp({ variant, onClose }: { variant: IModalVariant; onClose: () => void }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, backgroundColor: 'rgba(15,17,41,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
    }}>
      <div style={{
        width: 343, backgroundColor: T.bg.neutral, borderRadius: T.radius['2xl'],
        padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        position: 'relative',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer' }}>
          <Icon.X />
        </button>
        {modalIcon[variant]}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: T.text.default }}>{modalTitle[variant]}</p>
          <p style={{ fontSize: 14, color: T.text.subtle, lineHeight: '20px' }}>Apakah kamu yakin ingin melanjutkan tindakan ini? Tindakan ini tidak dapat dibatalkan.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, width: '100%' }}>
          <Button label="Batal" type="secondary" fullWidth onClick={onClose} />
          <Button label="Lanjutkan" type={variant === 'error' ? 'destructive' : 'primary'} fullWidth onClick={onClose} />
        </div>
      </div>
    </div>
  )
}

// ── Bottom Sheet ───────────────────────────────────────────────────────────────
function BottomSheetComp({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, backgroundColor: 'rgba(15,17,41,0.7)',
      display: 'flex', alignItems: 'flex-end', zIndex: 50,
    }}>
      <div style={{
        width: '100%', backgroundColor: T.bg.neutral,
        borderRadius: `${T.radius['3xl']}px ${T.radius['3xl']}px 0 0`,
        padding: '12px 16px 32px',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: T.radius.full, backgroundColor: T.bg.disabled, margin: '0 auto 16px' }} />
        <p style={{ fontSize: 20, fontWeight: 700, color: T.text.default, marginBottom: 8 }}>Pilih Metode Gadai</p>
        <p style={{ fontSize: 14, color: T.text.subtle, marginBottom: 20, lineHeight: '20px' }}>Pilih salah satu metode gadai yang tersedia untuk melanjutkan proses.</p>
        {['Gadai Emas', 'Gadai Elektronik', 'Gadai BPKB'].map(item => (
          <div key={item} onClick={onClose} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 0', borderBottom: `1px solid ${T.border.subtle}`, cursor: 'pointer',
          }}>
            <span style={{ fontSize: 14, color: T.text.default }}>{item}</span>
            <Icon.Arrow />
          </div>
        ))}
        <div style={{ marginTop: 20 }}>
          <Button label="Tutup" type="secondary" fullWidth onClick={onClose} />
        </div>
      </div>
    </div>
  )
}

// ── Pagination ─────────────────────────────────────────────────────────────────
function Pagination() {
  const [page, setPage] = useState(3)
  const total = 7
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
        style={{ width: 40, height: 40, borderRadius: T.radius.lg, border: 'none', background: 'none', cursor: page === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon.ChevronLeft color={page === 1 ? T.icon.disabled : T.icon.default} />
      </button>
      {[1, 2, 3, 4, 5].map(n => {
        const isActive = n === page
        return (
          <button key={n} onClick={() => setPage(n)} style={{
            width: 40, height: 40, borderRadius: T.radius.lg, border: 'none', cursor: 'pointer',
            backgroundColor: isActive ? T.bg.primary : 'transparent',
            color: isActive ? T.text.neutral : T.text.subtle,
            fontSize: 14, fontWeight: isActive ? 700 : 400,
          }}>{n}</button>
        )
      })}
      <button onClick={() => setPage(p => Math.min(total, p + 1))} disabled={page === total}
        style={{ width: 40, height: 40, borderRadius: T.radius.lg, border: 'none', background: 'none', cursor: page === total ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon.ChevronRight color={page === total ? T.icon.disabled : T.icon.default} />
      </button>
    </div>
  )
}

// ── Progress Bar ───────────────────────────────────────────────────────────────
function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 8, borderRadius: T.radius.full, backgroundColor: T.bg.disabled, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', backgroundColor: T.bg.primary, borderRadius: T.radius.full, transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontSize: 12, color: T.text.subtle, width: 32, textAlign: 'right' }}>{value}%</span>
    </div>
  )
}

// ── Radio Button ───────────────────────────────────────────────────────────────
function Radio({ label, selected = false, disabled = false, onClick }: {
  label: string; selected?: boolean; disabled?: boolean; onClick?: () => void
}) {
  const ringColor = selected ? T.border.info : disabled ? T.border.subtle : T.border.default
  const dotColor  = disabled ? T.bg.disabled : T.bg.primary
  const textColor = disabled ? T.text.disabled : T.text.default
  return (
    <button onClick={() => !disabled && onClick?.()}
      style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', padding: 0 }}>
      <div style={{
        width: 16, height: 16, borderRadius: T.radius.full, border: `1px solid ${ringColor}`,
        backgroundColor: T.bg.neutral, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {selected && <div style={{ width: 8, height: 8, borderRadius: T.radius.full, backgroundColor: dotColor }} />}
      </div>
      <span style={{ fontSize: 14, color: textColor }}>{label}</span>
    </button>
  )
}

// (StepIndicator and StepLine are inlined inside Stepper for layout control)

// ── Stepper ────────────────────────────────────────────────────────────────────
type IStepState = 'inactive' | 'active' | 'completed'
function StepIndicator({ state }: { state: IStepState }) {
  const bg = state === 'inactive' ? T.bg.disabled : T.bg.primary
  const tc = state === 'inactive' ? T.text.disabled : T.text.neutral
  return (
    <div style={{ width: 24, height: 24, borderRadius: T.radius.full, backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {state === 'completed' ? <Icon.Check /> : <span style={{ fontSize: 10, fontWeight: 700, color: tc }}>1</span>}
    </div>
  )
}
function StepLine({ active }: { active: boolean }) {
  return <div style={{ flex: 1, height: 2, backgroundColor: active ? T.bg.primary : T.bg.disabled }} />
}
function Stepper({ steps, activeStep }: { steps: string[]; activeStep: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {steps.map((_, i) => {
          const state: IStepState = i < activeStep ? 'completed' : i === activeStep ? 'active' : 'inactive'
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 0 }}>
              <div style={{ width: 24, height: 24, borderRadius: T.radius.full, backgroundColor: state === 'inactive' ? T.bg.disabled : T.bg.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {state === 'completed'
                  ? <Icon.Check />
                  : <span style={{ fontSize: 10, fontWeight: 700, color: state === 'inactive' ? T.text.disabled : T.text.neutral }}>{i + 1}</span>
                }
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, backgroundColor: i < activeStep ? T.bg.primary : T.bg.disabled }} />}
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {steps.map((label, i) => (
          <span key={i} style={{ fontSize: 10, color: i <= activeStep ? T.text.default : T.text.subtle, fontWeight: i === activeStep ? 600 : 400, flex: 1, textAlign: i === 0 ? 'left' : i === steps.length - 1 ? 'right' : 'center' }}>{label}</span>
        ))}
      </div>
    </div>
  )
}

// ── Switch ─────────────────────────────────────────────────────────────────────
function Switch({ label, on = false, disabled = false, onChange }: {
  label: string; on?: boolean; disabled?: boolean; onChange?: (v: boolean) => void
}) {
  const trackColor = on && !disabled ? T.bg.primary : T.bg.disabled
  const textColor  = disabled ? T.text.disabled : T.text.default
  return (
    <button onClick={() => !disabled && onChange?.(!on)}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', padding: 0, width: '100%' }}>
      <span style={{ fontSize: 14, color: textColor }}>{label}</span>
      <div style={{ width: 40, height: 24, borderRadius: T.radius.full, backgroundColor: trackColor, position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
        <div style={{
          position: 'absolute', top: 2, left: on ? 18 : 2, width: 20, height: 20,
          borderRadius: T.radius.full, backgroundColor: T.bg.neutral, transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </div>
    </button>
  )
}

// ── Tab Primary ────────────────────────────────────────────────────────────────
function TabPrimary({ tabs, active, onChange }: { tabs: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div style={{ display: 'flex', borderBottom: `1px solid ${T.border.subtle}` }}>
      {tabs.map((tab, i) => {
        const isActive = i === active
        return (
          <button key={i} onClick={() => onChange(i)} style={{
            flex: 1, height: 54, padding: '0 12px', background: 'none', cursor: 'pointer',
            border: 'none', borderBottom: isActive ? `3px solid ${T.border.info}` : '3px solid transparent',
            fontSize: 14, fontWeight: isActive ? 600 : 400,
            color: isActive ? T.text.link : T.text.subtle,
            marginBottom: -1,
          }}>{tab}</button>
        )
      })}
    </div>
  )
}

// ── Tab Secondary ──────────────────────────────────────────────────────────────
function TabSecondary({ tabs, active, onChange }: { tabs: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div style={{ display: 'flex', gap: 4, backgroundColor: T.bg.subtle, padding: 4, borderRadius: T.radius.full }}>
      {tabs.map((tab, i) => {
        const isActive = i === active
        return (
          <button key={i} onClick={() => onChange(i)} style={{
            flex: 1, height: 36, borderRadius: T.radius.full, border: 'none', cursor: 'pointer',
            backgroundColor: isActive ? T.bg.primary : 'transparent',
            color: isActive ? T.text.neutral : T.text.subtle,
            fontSize: 14, fontWeight: 600, transition: 'all 0.15s',
          }}>{tab}</button>
        )
      })}
    </div>
  )
}

// ── Text Field ─────────────────────────────────────────────────────────────────
type IFieldState = 'default' | 'focused' | 'error' | 'success' | 'disabled'
const fieldBorderMap: Record<IFieldState, { color: string; width: number }> = {
  default:  { color: T.border.default, width: 1 },
  focused:  { color: '#73AEFF',        width: 3 },
  error:    { color: T.border.error,   width: 1 },
  success:  { color: T.border.success, width: 1 },
  disabled: { color: T.border.default, width: 1 },
}
function TextField({ label, placeholder = 'Placeholder', helper, state = 'default', suffix }: {
  label: string; placeholder?: string; helper?: string; state?: IFieldState; suffix?: React.ReactNode
}) {
  const [focused, setFocused] = useState(false)
  const [val, setVal] = useState(state === 'error' || state === 'success' ? '081234567890' : state === 'disabled' ? 'Nilai tetap' : '')
  const isDisabled = state === 'disabled'
  const activeState: IFieldState = isDisabled ? 'disabled' : focused ? 'focused' : state
  const br = fieldBorderMap[activeState]
  const labelClr = state === 'error' ? T.text.error : T.text.default
  const helpClr  = state === 'error' ? T.text.error : state === 'success' ? T.text.success : T.text.subtle
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 14, fontWeight: 600, color: labelClr }}>{label}</label>
      <div style={{
        backgroundColor: isDisabled ? T.bg.subtle : T.bg.neutral,
        border: `${br.width}px solid ${br.color}`, borderRadius: T.radius.base,
        padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <input disabled={isDisabled} placeholder={placeholder} value={val} onChange={e => setVal(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: val ? T.text.default : T.text.subtle, cursor: isDisabled ? 'not-allowed' : 'text' }} />
        {suffix}
      </div>
      {helper && <span style={{ fontSize: 12, color: helpClr }}>{helper}</span>}
    </div>
  )
}

// ── Text Area ──────────────────────────────────────────────────────────────────
function TextArea({ label, placeholder = 'Tulis di sini...', state = 'default' }: {
  label: string; placeholder?: string; state?: IFieldState
}) {
  const [focused, setFocused] = useState(false)
  const [val, setVal] = useState('')
  const isDisabled = state === 'disabled'
  const activeState: IFieldState = isDisabled ? 'disabled' : focused ? 'focused' : state
  const br = fieldBorderMap[activeState]
  const labelClr = state === 'error' ? T.text.error : T.text.default
  const helpClr  = state === 'error' ? T.text.error : state === 'success' ? T.text.success : T.text.subtle
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontSize: 14, fontWeight: 600, color: labelClr }}>{label}</label>
        <span style={{ fontSize: 12, color: T.text.subtle }}>{val.length}/200</span>
      </div>
      <textarea disabled={isDisabled} placeholder={placeholder} value={val} onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} rows={3}
        style={{
          backgroundColor: isDisabled ? T.bg.subtle : T.bg.neutral,
          border: `${br.width}px solid ${br.color}`, borderRadius: T.radius.base,
          padding: 12, fontSize: 14, color: T.text.default, resize: 'none',
          outline: 'none', fontFamily: 'inherit', cursor: isDisabled ? 'not-allowed' : 'text',
        }} />
      {state === 'error'   && <span style={{ fontSize: 12, color: helpClr }}>Deskripsi terlalu pendek</span>}
      {state === 'success' && <span style={{ fontSize: 12, color: helpClr }}>Deskripsi valid</span>}
    </div>
  )
}

// ── Toast ──────────────────────────────────────────────────────────────────────
type IToastType = 'positive' | 'alert' | 'error' | 'general'
const toastMap: Record<IToastType, { bg: string; icon: React.ReactNode; text: string; label: string }> = {
  positive: { bg: T.bg.successSubtle, icon: <Icon.CheckCircle />, text: T.text.success, label: 'Pembayaran berhasil diproses' },
  alert:    { bg: T.bg.warningSubtle, icon: <Icon.Warning />,     text: T.text.warning, label: 'Batas waktu pembayaran 2 jam lagi' },
  error:    { bg: T.bg.errorSubtle,   icon: <Icon.XCircle />,     text: T.text.error,   label: 'Gagal memuat data, coba lagi' },
  general:  { bg: T.bg.dark,          icon: <Icon.Info color={T.icon.neutral} />, text: T.text.neutral, label: 'Sesi kamu akan berakhir' },
}
function Toast({ type }: { type: IToastType }) {
  const t = toastMap[type]
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
      backgroundColor: t.bg, borderRadius: T.radius.xl, width: '100%',
    }}>
      <div style={{ flexShrink: 0 }}>{t.icon}</div>
      <p style={{ flex: 1, fontSize: 14, color: t.text, lineHeight: '18px' }}>{t.label}</p>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, padding: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: t.text, whiteSpace: 'nowrap' }}>Lihat</span>
      </button>
    </div>
  )
}

// ── Tooltip ────────────────────────────────────────────────────────────────────
function Tooltip({ children, tip }: { children: React.ReactNode; tip: string }) {
  const [show, setShow] = useState(false)
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{
          position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: T.bg.dark, color: T.text.neutral, padding: '6px 10px',
          borderRadius: T.radius.lg, fontSize: 12, whiteSpace: 'nowrap', zIndex: 99,
          pointerEvents: 'none',
        }}>
          {tip}
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `5px solid ${T.bg.dark}` }} />
        </div>
      )}
    </div>
  )
}

// ── Uploader General ───────────────────────────────────────────────────────────
function UploaderGeneral() {
  const [drag, setDrag] = useState(false)
  return (
    <div onDragOver={e => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)} onDrop={() => setDrag(false)}
      style={{
        border: `1.5px dashed ${drag ? T.border.info : T.border.default}`,
        borderRadius: T.radius.xl, padding: '20px 16px',
        backgroundColor: drag ? T.bg.infoSubtle : T.bg.subtle,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        cursor: 'pointer', transition: 'all 0.15s',
      }}>
      <Icon.Upload color={drag ? T.icon.info : T.icon.subtle} />
      <p style={{ fontSize: 14, fontWeight: 600, color: drag ? T.text.info : T.text.default, textAlign: 'center' }}>Upload File</p>
      <p style={{ fontSize: 12, color: T.text.subtle, textAlign: 'center' }}>Seret file ke sini, atau <span style={{ color: T.text.link }}>klik untuk pilih</span></p>
      <p style={{ fontSize: 10, color: T.text.disabled }}>PNG, JPG, PDF hingga 10MB</p>
    </div>
  )
}

// ── Uploader Image ─────────────────────────────────────────────────────────────
function UploaderImage() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          width: 80, height: 80, borderRadius: T.radius.xl, flexShrink: 0,
          border: `1.5px dashed ${T.border.default}`, backgroundColor: T.bg.subtle,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
          cursor: 'pointer',
        }}>
          <Icon.Image />
          <span style={{ fontSize: 10, color: T.text.subtle }}>Foto {i}</span>
        </div>
      ))}
    </div>
  )
}

// ── Date Picker ────────────────────────────────────────────────────────────────
function DatePickerComp() {
  const [selected, setSelected] = useState<number | null>(18)
  const [month, setMonth] = useState(4) // May = 4
  const [year, setYear] = useState(2026)

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des']
  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1); setSelected(null) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1); setSelected(null) }

  return (
    <div style={{ backgroundColor: T.bg.neutral, border: `1px solid ${T.border.default}`, borderRadius: T.radius.xl, padding: 16, userSelect: 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><Icon.ChevronLeft /></button>
        <p style={{ fontSize: 14, fontWeight: 600, color: T.text.default }}>{monthNames[month]} {year}</p>
        <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><Icon.ChevronRight /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
        {days.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: T.text.subtle, padding: '4px 0' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {cells.map((day, i) => {
          const isSelected = day === selected
          const isToday = day === 18 && month === 4 && year === 2026
          return (
            <div key={i} onClick={() => day && setSelected(day)}
              style={{
                width: '100%', aspectRatio: '1', borderRadius: T.radius.full, cursor: day ? 'pointer' : 'default',
                backgroundColor: isSelected ? T.bg.primary : 'transparent',
                border: isToday && !isSelected ? `1.5px solid ${T.border.info}` : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12,
                color: !day ? 'transparent' : isSelected ? T.text.neutral : T.text.default,
                fontWeight: isSelected ? 700 : 400,
              }}>{day ?? ''}</div>
          )
        })}
      </div>
    </div>
  )
}

// ── Accordion ──────────────────────────────────────────────────────────────────
function AccordionItem({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${T.border.subtle}` }}>
      <button onClick={() => setOpen(v => !v)} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 0', background: 'none', border: 'none', cursor: 'pointer', gap: 12,
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.text.default, textAlign: 'left' }}>{title}</span>
        <div style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>
          <Icon.ChevronDown />
        </div>
      </button>
      {open && <p style={{ fontSize: 14, color: T.text.subtle, lineHeight: '20px', paddingBottom: 14 }}>{body}</p>}
    </div>
  )
}

// ── Top Navbar ─────────────────────────────────────────────────────────────────
function TopNavbar({ title }: { title: string }) {
  return (
    <div style={{
      height: 56, backgroundColor: T.bg.neutral, borderBottom: `1px solid ${T.border.subtle}`,
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12,
    }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
        <Icon.ChevronLeft />
      </button>
      <p style={{ flex: 1, fontSize: 16, fontWeight: 600, color: T.text.default }}>{title}</p>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', position: 'relative' }}>
        <Icon.Bell color={T.icon.default} />
        <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: T.radius.full, backgroundColor: T.bg.error }} />
      </button>
    </div>
  )
}

// ── Bottom Navbar ──────────────────────────────────────────────────────────────
const NAV_ICONS = [
  { label: 'Beranda',  src: '/assets/nav-home-solid.svg' },
  { label: 'Pinjaman', src: '/assets/credit-card.png' },
  { label: 'Emas',     src: '/assets/poinemas.outline.png' },
  { label: 'Profil',   src: '/assets/smile.png' },
]

function BottomNavbar({ active }: { active: number }) {
  return (
    <div style={{
      height: 84, backgroundColor: T.bg.neutral, borderTop: `1px solid ${T.border.subtle}`,
      display: 'flex', alignItems: 'flex-start', paddingTop: 8,
    }}>
      {NAV_ICONS.map((item, i) => {
        const isActive = i === active
        const color = isActive ? T.icon.info : T.icon.subtle
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <img src={item.src} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400, color }}>{item.label}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Side Navbar Preview ────────────────────────────────────────────────────────
function SideNavbarPreview() {
  const [activeItem, setActiveItem] = useState(0)
  const items = ['Beranda', 'Pinjaman', 'Emas', 'Laporan', 'Pengaturan']
  return (
    <div style={{ backgroundColor: T.bg.dark, borderRadius: T.radius.xl, padding: '12px 0', width: '100%' }}>
      <div style={{ padding: '8px 16px 16px', borderBottom: `1px solid ${T.bg.darkSecondary}`, marginBottom: 8 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: T.text.neutral, opacity: 0.5, letterSpacing: '0.08em' }}>MENU</p>
      </div>
      {items.map((item, i) => {
        const isActive = i === activeItem
        return (
          <div key={i} onClick={() => setActiveItem(i)} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', cursor: 'pointer',
            backgroundColor: isActive ? T.bg.darkSecondary : 'transparent',
            borderLeft: isActive ? `3px solid ${T.bg.primary}` : '3px solid transparent',
          }}>
            <div style={{ width: 18, height: 18, borderRadius: 3, backgroundColor: isActive ? T.bg.primary : T.text.subtle, opacity: isActive ? 1 : 0.5 }} />
            <span style={{ fontSize: 14, color: T.text.neutral, opacity: isActive ? 1 : 0.6, fontWeight: isActive ? 600 : 400 }}>{item}</span>
          </div>
        )
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function DSTest() {
  const [modalVariant, setModalVariant] = useState<IModalVariant | null>(null)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [activeChip, setActiveChip] = useState('Semua')
  const [radioVal, setRadioVal] = useState('emas')
  const [checks, setChecks] = useState({ a: false, b: true, c: false })
  const [switches, setSwitches] = useState({ notif: true, promo: false })
  const [tab1, setTab1] = useState(0)
  const [tab2, setTab2] = useState(0)
  const [stepActive, setStepActive] = useState(1)
  const [activeNav, setActiveNav] = useState(0)
  const [progressVal, setProgressVal] = useState(60)

  return (
    <div className="w-[375px] rounded-3xl shadow-2xl" style={{ height: 812, fontFamily: 'Geist, Inter, sans-serif', position: 'relative', overflow: 'hidden', backgroundColor: T.bg.subtle }}>

      {/* Scrollable content */}
      <div style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Sticky header */}
        <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: T.bg.neutral, borderBottom: `1px solid ${T.border.subtle}`, padding: '14px 16px', flexShrink: 0 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: T.text.default }}>DS Component Test</p>
          <p style={{ fontSize: 12, color: T.text.subtle }}>Non-Figma mode · component-specs.md</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '20px 16px 32px' }}>

          {/* TOP NAVBAR */}
          <Section title="Top Navbar">
            <div style={{ borderRadius: T.radius.xl, overflow: 'hidden', border: `1px solid ${T.border.subtle}` }}>
              <TopNavbar title="Detail Pinjaman" />
            </div>
          </Section>

          {/* AVATAR */}
          <Section title="Avatar">
            <Card>
              <SubLabel>Sizes — Alphabet</SubLabel>
              <Row>
                {(['large', 'medium', 'default', 'small'] as const).map(s => (
                  <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <Avatar size={s} initials="AZ" />
                    <span style={{ fontSize: 10, color: T.text.subtle }}>{s}</span>
                  </div>
                ))}
              </Row>
              <HR />
              <SubLabel>Type — Artwork (image placeholder)</SubLabel>
              <Row>
                {(['large', 'medium', 'default'] as const).map(s => (
                  <Avatar key={s} size={s} src="https://i.pravatar.cc/40" />
                ))}
              </Row>
            </Card>
          </Section>

          {/* BADGE */}
          <Section title="Badge">
            <Card>
              <SubLabel>Notification</SubLabel>
              <Row gap={16}>
                {(['dot', 'number', 'text'] as const).map(v => (
                  <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ position: 'relative', width: 28, height: 28 }}>
                      <Icon.Bell color={T.icon.subtle} />
                      <span style={{ position: 'absolute', top: v === 'dot' ? 0 : -6, right: v === 'dot' ? 0 : -8 }}>
                        <BadgeNotif variant={v} />
                      </span>
                    </div>
                    <span style={{ fontSize: 10, color: T.text.subtle }}>{v}</span>
                  </div>
                ))}
              </Row>
              <HR />
              <SubLabel>Product</SubLabel>
              <Row gap={8}><BadgeProduct variant="light" /><BadgeProduct variant="heavy" /></Row>
              <HR />
              <SubLabel>Status — Light</SubLabel>
              <Row gap={6} wrap>
                {(['success', 'informative', 'warning', 'error', 'finished'] as IBadgeState[]).map(s => <BadgeStatus key={s} state={s} />)}
              </Row>
            </Card>
          </Section>

          {/* BANNER INFO */}
          <Section title="Banner Info">
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(['base', 'informative', 'success', 'alert', 'error'] as IBannerType[]).map(t => <BannerInfo key={t} type={t} />)}
              </div>
            </Card>
          </Section>

          {/* BUTTON */}
          <Section title="Button">
            <Card>
              <SubLabel>Types — Large</SubLabel>
              <Row wrap>
                <Button label="Primary" type="primary" />
                <Button label="Secondary" type="secondary" />
                <Button label="Ghost" type="ghost" />
                <Button label="Destructive" type="destructive" />
              </Row>
              <HR />
              <SubLabel>Sizes — Primary</SubLabel>
              <Row wrap>
                {(['lg', 'md', 'sm', 'xs'] as IBtnSize[]).map(s => <Button key={s} label={s.toUpperCase()} size={s} />)}
              </Row>
              <HR />
              <SubLabel>States</SubLabel>
              <Row wrap>
                <Button label="Disabled" disabled />
                <Button label="Loading" loading />
              </Row>
            </Card>
          </Section>

          {/* CHECKBOX */}
          <Section title="Checkbox">
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Checkbox label="Default (unchecked)" checked={checks.a} onChange={v => setChecks(c => ({ ...c, a: v }))} />
                <Checkbox label="Selected (checked)" checked={checks.b} onChange={v => setChecks(c => ({ ...c, b: v }))} />
                <Checkbox label="Disabled unchecked" disabled />
                <Checkbox label="Disabled checked" checked disabled />
              </div>
            </Card>
          </Section>

          {/* CHIPS */}
          <Section title="Chips">
            <Card>
              <SubLabel>Filter — default/active/disabled</SubLabel>
              <Row wrap gap={8}>
                {['Semua', 'Aktif', 'Lunas', 'Ditolak'].map(l => (
                  <Chip key={l} label={l} active={activeChip === l} onClick={() => setActiveChip(l)} />
                ))}
                <Chip label="Nonaktif" disabled />
              </Row>
              <HR />
              <SubLabel>With badge</SubLabel>
              <Row gap={16} wrap>
                <div style={{ paddingTop: 6 }}><Chip label="Notifikasi" badge={3} /></div>
                <div style={{ paddingTop: 6 }}><Chip label="Pesan" badge={12} active /></div>
              </Row>
            </Card>
          </Section>

          {/* DATA TABLE */}
          <Section title="Data Table">
            <Card p={0}>
              {/* Header */}
              <div style={{ display: 'flex', backgroundColor: T.bg.subtle, borderBottom: `1px solid ${T.border.subtle}` }}>
                <div style={{ width: 32, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 14, height: 14, border: `1px solid ${T.border.default}`, borderRadius: T.radius.sm }} />
                </div>
                {['Nama', 'Jumlah', 'Status'].map(h => (
                  <div key={h} style={{ flex: 1, height: 40, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.text.subtle }}>{h}</span>
                  </div>
                ))}
              </div>
              {/* Cells */}
              {[
                { name: 'Andi S.', amount: 'Rp 2.000.000', state: 'success' as IBadgeState },
                { name: 'Budi R.', amount: 'Rp 5.500.000', state: 'informative' as IBadgeState },
                { name: 'Citra M.', amount: 'Rp 1.200.000', state: 'error' as IBadgeState },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', borderBottom: `1px solid ${T.border.subtle}` }}>
                  <div style={{ width: 32, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 14, height: 14, border: `1px solid ${T.border.default}`, borderRadius: T.radius.sm }} />
                  </div>
                  <div style={{ flex: 1, height: 64, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 12px' }}>
                    <p style={{ fontSize: 14, color: T.text.default }}>{row.name}</p>
                    <p style={{ fontSize: 12, color: T.text.subtle }}>ID-00{i + 1}</p>
                  </div>
                  <div style={{ flex: 1, height: 64, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                    <span style={{ fontSize: 14, color: T.text.default }}>{row.amount}</span>
                  </div>
                  <div style={{ flex: 1, height: 64, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                    <BadgeStatus state={row.state} />
                  </div>
                </div>
              ))}
            </Card>
          </Section>

          {/* DATE PICKER */}
          <Section title="Date Picker">
            <DatePickerComp />
          </Section>

          {/* DIVIDER */}
          <Section title="Divider">
            <Card>
              <SubLabel>Line</SubLabel>
              <DividerComp type="line" />
              <SubLabel>Dash</SubLabel>
              <DividerComp type="dash" />
              <SubLabel>Gap (8px spacing block)</SubLabel>
              <div style={{ border: `1px dashed ${T.border.subtle}`, borderRadius: T.radius.base }}>
                <DividerComp type="gap" />
              </div>
            </Card>
          </Section>

          {/* LIST */}
          <Section title="List">
            <Card p={0}>
              <div style={{ padding: '8px 16px 4px' }}><SubLabel>Default type — all states</SubLabel></div>
              <ListItem label="Pengaturan Akun"    sub="Kelola profil dan keamanan" state="active"   action="arrow" />
              <ListItem label="Riwayat Transaksi"  sub="Lihat semua transaksi"      state="hovered"  action="arrow" />
              <ListItem label="Bantuan"             sub="Tidak tersedia saat ini"    state="disabled" action="arrow" />
              <div style={{ padding: '8px 16px 4px' }}><SubLabel>Nested + action variants</SubLabel></div>
              <ListItem label="Gadai Emas"    nested action="checkbox" />
              <ListItem label="Gadai BPKB"    nested action="radio" />
              <ListItem label="Gadai Elektronik" nested action="arrow" />
            </Card>
          </Section>

          {/* LOADER GENERAL */}
          <Section title="Loader: General">
            <Card>
              <Row gap={24} wrap>
                {(['small', 'default', 'large', 'extra large'] as const).map(s => <LoaderGeneral key={s} size={s} />)}
              </Row>
            </Card>
          </Section>

          {/* LOADER SKELETON */}
          <Section title="Loader: Skeleton">
            <Card>
              <SubLabel>Rectangle</SubLabel>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <SkeletonCircle size={40} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <SkeletonRect h={14} w="70%" />
                  <SkeletonRect h={12} w="50%" />
                </div>
              </div>
              <SkeletonRect h={80} radius={T.radius.lg} />
              <div style={{ marginTop: 8 }}>
                <SkeletonRect h={12} w="40%" />
              </div>
              <HR />
              <SubLabel>Circle</SubLabel>
              <Row gap={12}><SkeletonCircle size={48} /><SkeletonCircle size={36} /><SkeletonCircle size={24} /></Row>
            </Card>
          </Section>

          {/* MODAL */}
          <Section title="Modal">
            <Card>
              <SubLabel>Trigger per variant</SubLabel>
              <Row wrap gap={8}>
                {(['default', 'info', 'success', 'alert', 'error'] as IModalVariant[]).map(v => (
                  <Button key={v} label={v} size="sm" type={v === 'error' ? 'destructive' : v === 'default' ? 'secondary' : 'primary'} onClick={() => setModalVariant(v)} />
                ))}
              </Row>
            </Card>
          </Section>

          {/* BOTTOM SHEET */}
          <Section title="Bottom Sheet">
            <Card>
              <SubLabel>Trigger</SubLabel>
              <Button label="Buka Bottom Sheet" type="secondary" fullWidth onClick={() => setShowBottomSheet(true)} />
            </Card>
          </Section>

          {/* PAGINATION */}
          <Section title="Pagination">
            <Card>
              <Pagination />
            </Card>
          </Section>

          {/* PROGRESS BAR */}
          <Section title="Progress Bar">
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[0, 25, 50, 75, 100].map(v => <ProgressBar key={v} value={v} />)}
              </div>
              <HR />
              <SubLabel>Interactive</SubLabel>
              <ProgressBar value={progressVal} />
              <input type="range" min={0} max={100} value={progressVal} onChange={e => setProgressVal(+e.target.value)}
                style={{ width: '100%', marginTop: 8, accentColor: T.bg.primary }} />
            </Card>
          </Section>

          {/* RADIO BUTTON */}
          <Section title="Radio Button">
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Radio label="Gadai Emas"        selected={radioVal === 'emas'}   onClick={() => setRadioVal('emas')} />
                <Radio label="Gadai Elektronik"  selected={radioVal === 'elek'}   onClick={() => setRadioVal('elek')} />
                <Radio label="Gadai BPKB"        selected={radioVal === 'bpkb'}   onClick={() => setRadioVal('bpkb')} />
                <Radio label="Tidak tersedia"    selected={false} disabled />
              </div>
            </Card>
          </Section>

          {/* SIDE NAVBAR */}
          <Section title="Side Navbar">
            <SideNavbarPreview />
          </Section>

          {/* STEPPER */}
          <Section title="Stepper">
            <Card>
              <Stepper steps={['Data Diri', 'Verifikasi', 'Selesai']} activeStep={stepActive} />
              <HR />
              <Row gap={8}>
                <Button label="← Prev" size="sm" type="secondary" disabled={stepActive === 0} onClick={() => setStepActive(s => Math.max(0, s - 1))} />
                <Button label="Next →" size="sm"                   disabled={stepActive === 2} onClick={() => setStepActive(s => Math.min(2, s + 1))} />
              </Row>
            </Card>
          </Section>

          {/* SWITCH */}
          <Section title="Switch">
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Switch label="Notifikasi push"    on={switches.notif}  onChange={v => setSwitches(s => ({ ...s, notif: v }))} />
                <Switch label="Email promo"        on={switches.promo}  onChange={v => setSwitches(s => ({ ...s, promo: v }))} />
                <Switch label="Fitur tidak aktif"  on={false} disabled />
              </div>
            </Card>
          </Section>

          {/* TAB */}
          <Section title="Tab">
            <Card p={0}>
              <SubLabel><span style={{ padding: '8px 16px 0', display: 'block' }}>Primary</span></SubLabel>
              <TabPrimary tabs={['Aktif', 'Riwayat', 'Menunggu']} active={tab1} onChange={setTab1} />
              <div style={{ padding: '12px 16px' }}>
                <p style={{ fontSize: 14, color: T.text.subtle }}>Konten tab: <b style={{ color: T.text.default }}>{['Aktif', 'Riwayat', 'Menunggu'][tab1]}</b></p>
              </div>
            </Card>
            <Card>
              <SubLabel>Secondary</SubLabel>
              <TabSecondary tabs={['Harian', 'Mingguan', 'Bulanan']} active={tab2} onChange={setTab2} />
            </Card>
          </Section>

          {/* TEXT FIELD */}
          <Section title="Text Field">
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TextField label="Default"  placeholder="Nomor HP" helper="Masukkan nomor yang terdaftar" />
                <TextField label="Focused"  placeholder="Klik untuk fokus" />
                <TextField label="Error"    state="error"   helper="Nomor HP tidak valid" suffix={<Icon.XCircle color={T.icon.error} />} />
                <TextField label="Success"  state="success" helper="Nomor HP tersedia" suffix={<Icon.CheckCircle color={T.icon.success} />} />
                <TextField label="With suffix" placeholder="Password" suffix={<Icon.Eye />} />
                <TextField label="Disabled" state="disabled" />
              </div>
            </Card>
          </Section>

          {/* TEXT AREA */}
          <Section title="Text Area">
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TextArea label="Default (auto-resize)" placeholder="Tulis catatan kamu di sini..." />
                <TextArea label="Error" state="error" />
                <TextArea label="Disabled" state="disabled" />
              </div>
            </Card>
          </Section>

          {/* TOAST */}
          <Section title="Toast">
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(['positive', 'alert', 'error', 'general'] as IToastType[]).map(t => <Toast key={t} type={t} />)}
              </div>
            </Card>
          </Section>

          {/* TOOLTIP */}
          <Section title="Tooltip">
            <Card>
              <SubLabel>Hover / tap the buttons below</SubLabel>
              <Row gap={16} wrap>
                <Tooltip tip="Simpan perubahan kamu"><Button label="Simpan" size="sm" /></Tooltip>
                <Tooltip tip="Hapus data ini secara permanen"><Button label="Hapus" size="sm" type="destructive" /></Tooltip>
                <Tooltip tip="Informasi lebih lanjut">
                  <button style={{ background: 'none', border: `1px solid ${T.border.default}`, borderRadius: T.radius.full, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon.Info color={T.icon.info} />
                  </button>
                </Tooltip>
              </Row>
            </Card>
          </Section>

          {/* UPLOADER */}
          <Section title="Uploader: General">
            <UploaderGeneral />
          </Section>

          <Section title="Uploader: Image">
            <Card>
              <SubLabel>Foto barang (maks. 3)</SubLabel>
              <UploaderImage />
            </Card>
          </Section>

          {/* ACCORDION */}
          <Section title="Accordion">
            <Card p={0}>
              <div style={{ padding: '0 16px' }}>
                <AccordionItem title="Apa itu Pandai Gadai?" body="Pandai Gadai adalah layanan gadai digital yang memungkinkan kamu menggadaikan barang berharga secara mudah, aman, dan transparan." />
                <AccordionItem title="Berapa lama proses pencairan?" body="Proses pencairan dana biasanya memakan waktu 1–2 hari kerja setelah barang diterima dan diverifikasi oleh tim kami." />
                <AccordionItem title="Barang apa saja yang bisa digadaikan?" body="Kamu bisa menggadaikan emas, elektronik, kendaraan bermotor (BPKB), dan berbagai barang berharga lainnya." />
              </div>
            </Card>
          </Section>

          {/* BOTTOM NAVBAR preview */}
          <Section title="Bottom Navbar">
            <div style={{ borderRadius: T.radius.xl, overflow: 'hidden', border: `1px solid ${T.border.subtle}` }}>
              <SubLabel><span style={{ display: 'block', padding: '8px 16px 0' }}>Tap to switch active tab</span></SubLabel>
              <div style={{ display: 'flex', backgroundColor: T.bg.neutral }}>
                {NAV_ICONS.map((item, i) => {
                  const isActive = i === activeNav
                  const color = isActive ? T.icon.info : T.icon.subtle
                  return (
                    <div key={i} onClick={() => setActiveNav(i)} style={{ flex: 1, height: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer' }}>
                      <img src={item.src} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                      <span style={{ fontSize: 10, color, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Section>

        </div>
      </div>

      {/* Modal overlay */}
      {modalVariant && <ModalComp variant={modalVariant} onClose={() => setModalVariant(null)} />}

      {/* Bottom sheet overlay */}
      {showBottomSheet && <BottomSheetComp onClose={() => setShowBottomSheet(false)} />}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input[type=text]::placeholder, textarea::placeholder { color: ${T.text.subtle}; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  )
}
