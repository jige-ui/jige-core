import type { JSX } from 'solid-js/jsx-runtime'

export type InputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'value'>

export type TextareaProps = Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'>

export type InputNativeProps = {
  type?: 'text' | 'password' | 'number' | 'textarea'
} & Omit<InputProps, 'type'> & TextareaProps
