import type { PropsWithChildren } from 'react'

type PanelProps = PropsWithChildren<{
  title: string
  subtitle?: string
  className?: string
}>

export function Panel({ title, subtitle, className, children }: PanelProps) {
  const cssClass = ['ui-panel', className].filter(Boolean).join(' ')

  return (
    <section className={cssClass}>
      <header className="ui-panel__header">
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      <div>{children}</div>
    </section>
  )
}
