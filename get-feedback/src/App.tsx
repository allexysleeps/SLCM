import * as React from 'react'
import {FormBuilder} from "./components/FormBuilder/FormBuilder"
import {FieldType, FormStructure} from "./GeneralTypes"

const defaultStructure: FormStructure = {
    fields: [
      { type: FieldType.TEXT, name: 'name' },
      { type: FieldType.TEXT, name: 'email' },
      { type: FieldType.TEXT, name: 'password' }
    ]
}

export const App = () => {
    return <FormBuilder structure={defaultStructure}/>
}