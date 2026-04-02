import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'danger'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
  }
>

export function Button({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const cssClass = ['ui-button', `ui-button--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button {...props} className={cssClass}>
      {children}
    </button>
  )
}
