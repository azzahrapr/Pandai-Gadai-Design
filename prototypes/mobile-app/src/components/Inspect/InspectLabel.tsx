import { useInspect } from './InspectContext'

interface IInspectLabelProps {
  label: string
  tokens?: string[]
  children: React.ReactNode
  className?: string
}

export function InspectLabel({ label, tokens = [], children, className = '' }: IInspectLabelProps) {
  const { active } = useInspect()

  if (!active) return <>{children}</>

  return (
    <div
      className={`relative ${className}`}
      data-inspect-label={label}
      data-inspect-tokens={JSON.stringify(tokens)}
      style={{ outline: '1px dashed rgba(2,61,255,0.2)', outlineOffset: '2px' }}
    >
      {children}
    </div>
  )
}
