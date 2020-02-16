import * as React from 'react'
import styled from '@emotion/styled'
import { TextInputProps, TextInputType } from "../input-types"

const Input = styled.input`
  display: block;
  font-size: 20px;
  margin: 10px;
`

export const TextInput: React.FunctionComponent<TextInputProps> = ({ onChange, value, placeholder, type }): React.ReactElement<'input'> => {
  return <Input
    type={type}
    onChange={(e) => onChange(e.target.value)}
    value={value || ""}
    placeholder={placeholder}
  />
}

TextInput.defaultProps = {
  type: TextInputType.TEXT,
}