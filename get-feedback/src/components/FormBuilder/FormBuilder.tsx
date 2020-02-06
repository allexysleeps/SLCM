import * as React from 'react'
import * as R from 'ramda'
import { getInputComponent } from '../Input/GetInputComponent'
import {FieldType, FormBuilderProps, FormField, FormStructure} from "../../GeneralTypes"
import {ReactComponentElement, ReactElement} from "react"
import {InputProps} from "../Input/InputTypes"

const {useState} = React

interface Values {
  [key: string]: FieldValue
}

interface FieldValue {
  type: FieldType
  value: any
  validation?: any
  touched?: any
}

const getDefaultStateFromStructure = (structure: FormStructure): Values => {
  return R.compose(
    R.reduce((acc, { name, ...rest } : FormField) => R.assoc(name, { value: null, ...rest }, acc), {}),
    R.propOr([], 'fields')
  )(structure)
}

const createValueSetter = R.curry((setValues: Function, key: string, value: any): void => {
  setValues(R.assocPath([key, 'value'], value))
})

const renderFields = (values: Values, changeHandler: Function): ReactComponentElement<any, InputProps> [] => {
  const tupleToComponent = (
    fieldComponents,
    [key, { value, type }]: [string, FieldValue]
  ) => R.append(
    getInputComponent(type, { onChange: changeHandler(key), key: key, value: value }),
    fieldComponents
  )

  return R.compose(
    R.reduce(tupleToComponent, []),
    R.toPairs,
  )(values)
}

export const FormBuilder = ({structure}: FormBuilderProps): ReactElement => {
  const [values, setValues] = useState(getDefaultStateFromStructure(structure))
  const setValue = createValueSetter(setValues)
    return (
    <form>
      {renderFields(values, setValue)}
    </form>
  )
}