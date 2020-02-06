import * as React from 'react'
import { TextInputProps } from "./types"


export const TextInput = ({ onChange, value }: TextInputProps): any => {
  return <input type="text" onChange={(e) => onChange(e.target.value)} value={value || ""} />
}