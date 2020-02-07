// todo move to shared repo
export interface FormStructure {
  inputs: FormInput []
}

export interface FormInput {
  type: InputType
  name: string
  label?: string
  placeholder?: string
}

export enum InputType {
  TEXT="TEXT",
  EMAIL="EMAIL",
  PASSWORD="PASSWORD"
}


const defaultFormStructure: FormStructure = {
  inputs: [
    { type: InputType.TEXT, name: 'name', placeholder: 'enter name' },
    { type: InputType.EMAIL, name: 'email', placeholder: 'enter email' },
    { type: InputType.PASSWORD, name: 'password', placeholder: 'enter password' }
  ]
}

export function getFormSnippetStructure(formId: string, userId): Promise<FormStructure> {
  return Promise.resolve(defaultFormStructure)
}