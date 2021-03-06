export interface FormSnippetData {
  id: string,
  structure: FormStructure,
  published: boolean,
}

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

export interface FormSnippetDataInput {
  structure: FormSnippetData['structure']
  published: FormSnippetData['published']
}

export interface FormStructureInput {
  inputs: FormStructure['inputs']
}