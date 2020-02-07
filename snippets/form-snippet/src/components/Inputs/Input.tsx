import * as React from 'react'
import * as R from 'ramda'
import { TextInput } from "./TextInput/TextInput"
import { InputType } from "../../types"
import { InputProps } from "./input-types"
import { EmailInput } from "./EmailInput/EmailInput"
import { PasswordInput } from "./PasswordInput/PasswordInput"

const inputsMap = {
  [InputType.TEXT]: TextInput,
  [InputType.EMAIL]: EmailInput,
  [InputType.PASSWORD]: PasswordInput
}

export class Input {
  static ofType(type: InputType, props: InputProps): React.ReactComponentElement<any, InputProps> {
    const InputComponent = R.propOr(R.always(null), type, inputsMap)
    return <InputComponent {...props}/>
  }
}