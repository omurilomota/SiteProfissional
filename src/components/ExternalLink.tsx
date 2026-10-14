import type { ReactNode } from 'react'

type ExternalLinkProps = {
  href: string
  children: ReactNode
  className?: string
  /** Texto para leitores de tela, já que a seta é decorativa. */
  hint?: string
}

/**
 * Link externo com a seta ↗ decorativa e as proteções de target="_blank".
 */
export function ExternalLink({ href, children, className, hint }: ExternalLinkProps) {
  return (
    <a className={className ?? 'link'} href={href} target="_blank" rel="noreferrer">
      {children}
      <span className="link__arrow" aria-hidden="true">
        ↗
      </span>
      {hint && <span className="visually-hidden">{hint}</span>}
    </a>
  )
}
