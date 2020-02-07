export interface InputProps {
  onChange: Function
  value: any
  key: string
  placeholder?: string
  label?: string
}

export interface TextInputProps {
  value: string | number
  onChange: any
  type?: TextInputType
  placeholder?: string
}

export enum TextInputType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password'
}

