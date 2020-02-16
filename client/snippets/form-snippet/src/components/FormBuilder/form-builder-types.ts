import { InputType } from "../../types"

export interface FormValues {
  [key: string]: InputState
}

export interface InputState {
  type: InputType
  value: any
  placeholder?: string
  touched?: boolean
  validation?: any
}

export interface FieldStateToInputPropsTransformations {
  onChange?(): Function
  value?(): any
  key?(): string
  placeholder?(): string
  label?(): string
}

export interface InputToStateTransformations {
  value?(): Function
}
