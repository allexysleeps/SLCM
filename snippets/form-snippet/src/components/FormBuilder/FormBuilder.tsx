import * as React from 'react'
import { ReactComponentElement, ReactElement } from 'react'
import * as R from 'ramda'
import styled from '@emotion/styled'
import { Input } from '../Inputs/Input'
import { FormBuilderProps, FormInput, FormStructure } from "../../types"
import { InputProps } from "../Inputs/input-types"
import {evolveFromAllObject} from "../../utils/helpers"
import {
  FieldStateToInputPropsTransformations,
  FormValues,
  InputState,
  InputToStateTransformations
} from "./form-builder-types"

const { useState } = React

const Form = styled.form`
  background: ${R.pathOr('', ['theme', 'general', 'background'])};
  padding: ${R.pathOr('', ['theme', 'general', 'padding'])};
  border: ${R.pathOr('', ['theme', 'general', 'border'])};
`

const getStateFromStructure = (structure: FormStructure): FormValues => {
  const reduceFormStructureToFormValues = (values: FormValues, input: FormInput) => R.assoc(
    input.name,
    evolveFromAllObject<InputToStateTransformations, FormInput, InputState>({ value: R.propOr(null, 'defaultValue')}, input),
    values
  )

  return R.compose(
    R.reduce(reduceFormStructureToFormValues, {}),
    R.defaultTo([])
  )(structure.inputs)
}

const createValueSetter = R.curry((setValues: Function, key: string, value: any): void => {
  setValues(R.assocPath([key, 'value'], value))
})

const mapFieldStateToInputProps = (transformations: FieldStateToInputPropsTransformations): Function => (state: InputState): InputProps =>
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
  const [values, setValues] = useState(getStateFromStructure(structure))
  const setValue = createValueSetter(setValues)
  return (
    <Form>
      {renderFields(values, setValue)}
    </Form>
  )
}