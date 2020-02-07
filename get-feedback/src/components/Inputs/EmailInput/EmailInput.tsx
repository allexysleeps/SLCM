import * as React from 'react'
import { TextInput } from '../TextInput/TextInput'
import { TextInputProps, TextInputType } from "../types"

export const EmailInput: React.FunctionComponent<TextInputProps> = (props): React.ReactElement<'input'> => {
  return <TextInput {...props} type={TextInputType.EMAIL}/>
}