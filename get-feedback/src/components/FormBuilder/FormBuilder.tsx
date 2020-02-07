import * as React from 'react'
import { ReactComponentElement, ReactElement } from 'react'
import * as R from 'ramda'
import styled from '@emotion/styled'
import { Input } from '../Inputs/Input'
import { InputType, FormBuilderProps, FormInput, FormStructure } from "../../general-types"
import { InputProps } from "../Inputs/types"

const { useState } = React

const Form = styled.form`
  background: ${R.pathOr('', ['theme', 'general', 'background'])};
  padding: ${R.pathOr('', ['theme', 'general', 'padding'])};
  border: ${R.pathOr('', ['theme', 'general', 'border'])};
`

interface FormValues {
  [key: string]: InputState
}

interface InputState {
  type: InputType
  value: any
  placeholder?: string
  touched?: boolean
  validation?: any
}

interface FieldStateToInputPropsTransformations {
  onChange?(): Function
  value?(): any
  key?(): string
  placeholder?(): string
  label?(): string
}

const getDefaultStateFromStructure = (structure: FormStructure): FormValues => {
  return R.compose(
    R.reduce((acc, { name, ...rest }: FormInput) => R.assoc(name, { value: null, ...rest }, acc), {}),
    R.defaultTo([])
  )(structure.inputs)
}

const createValueSetter = R.curry((setValues: Function, key: string, value: any): void => {
  setValues(R.assocPath([key, 'value'], value))
})

const mapFieldStateToInputProps = (transformations: FieldStateToInputPropsTransformations = {}): Function => (state: InputState): InputProps =>
  R.converge(R.mergeRight, [R.identity, R.applySpec(transformations)])(state)

const renderFields = (values: FormValues, changeHandler: Function): ReactComponentElement<any, InputProps> [] => {
  const tupleToComponent = (
    fieldComponents,
    [key, { type, ...state }]: [string, InputState]
  ) => R.append(
    Input.ofType(type, mapFieldStateToInputProps({
      key: R.always(key),
      onChange: R.always(changeHandler(key))
    })(state)),
    fieldComponents
  )

  return R.compose(
    R.reduce(tupleToComponent, []),
    R.toPairs,
  )(values)
}

export const FormBuilder = ({ structure }: FormBuilderProps): ReactElement => {
  const [values, setValues] = useState(getDefaultStateFromStructure(structure))
  const setValue = createValueSetter(setValues)
  return (
    <Form>
      {renderFields(values, setValue)}
    </Form>
  )
}