import * as React from 'react'
import * as R from 'ramda'
import { TextInput } from "../TextInput/TextInput"
import {FieldType} from "../../GeneralTypes"
import {InputProps} from "./InputTypes"

const inputsMap = {
  [FieldType.TEXT]: TextInput
}



export const getInputComponent = (type: FieldType, props: InputProps): React.ReactComponentElement<any, InputProps> => {
  const InputComponent = R.propOr(R.always(null), type, inputsMap)
  return <InputComponent {...props}/>
}