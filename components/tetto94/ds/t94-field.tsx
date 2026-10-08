import * as React from 'react'
import { cn } from '@/lib/utils'

type T94FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string
}

const controlClasses =
  'w-full min-h-[54px] rounded-t94 border bg-white px-4 font-t94 text-[18px] text-t94-text ' +
  'placeholder:text-t94-text-secondary/70 transition-colors ' +
  'focus-visible:outline-none focus-visible:border-t94-dark focus-visible:ring-2 focus-visible:ring-t94-dark/20'

type T94TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  hint?: string
  error?: string
  optionalLabel?: string
}

export const T94Textarea = React.forwardRef<HTMLTextAreaElement, T94TextareaProps>(function T94Textarea(
  { label, hint, error, id, className, required, optionalLabel, rows = 3, ...props },
  ref,
) {
  const autoId = React.useId()
  const fieldId = id ?? autoId
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="font-t94 text-[15px] font-semibold text-t94-dark">
        {label}
        {required ? (
          <span className="text-t94-red" aria-hidden="true"> *</span>
        ) : optionalLabel ? (
          <span className="font-normal text-t94-text-secondary"> ({optionalLabel})</span>
        ) : null}
      </label>
      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          controlClasses,
          'min-h-[96px] resize-y py-3.5 leading-[1.5]',
          error ? 'border-t94-red' : 'border-t94-border',
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} role="alert" className="font-t94 text-[15px] text-t94-red">
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="t94-small">
          {hint}
        </p>
      ) : null}
    </div>
  )
})

export const T94Field = React.forwardRef<HTMLInputElement, T94FieldProps>(function T94Field(
  { label, hint, error, id, className, required, ...props },
  ref,
) {
  const autoId = React.useId()
  const fieldId = id ?? autoId
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="font-t94 text-[15px] font-semibold text-t94-dark">
        {label}
        {required ? <span className="text-t94-red" aria-hidden="true"> *</span> : null}
      </label>
      <input
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(controlClasses, error ? 'border-t94-red' : 'border-t94-border', className)}
        {...props}
      />
      {error ? (
        <p id={`${fieldId}-error`} role="alert" className="font-t94 text-[15px] text-t94-red">
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="t94-small">
          {hint}
        </p>
      ) : null}
    </div>
  )
})
