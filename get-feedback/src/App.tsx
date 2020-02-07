import * as React from 'react'
import { ThemeProvider } from "emotion-theming"
import { FormBuilder } from "./components/FormBuilder/FormBuilder"
import { InputType, FormStructure } from "./general-types"

const defaultStructure: FormStructure = {
  inputs: [
    { type: InputType.TEXT, name: 'name', placeholder: 'enter name' },
    { type: InputType.EMAIL, name: 'email', placeholder: 'enter email' },
    { type: InputType.PASSWORD, name: 'password', placeholder: 'enter password' }
  ]
}

const defaultTheme = {
  general: {
    background: '#fffff',
    border: '1px solid #cacaca',
    boxShadow: 'none'
  }
}

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <FormBuilder structure={defaultStructure}/>
    </ThemeProvider>
  )
}