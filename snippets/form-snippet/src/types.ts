export interface FormBuilderProps {
    structure: FormStructure
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

export interface FormSnippetData {
  structure: FormStructure
}

export interface StructureResponseData {
  formSnippet: FormSnippetData
}

export interface StructureQueryResponse {
  data: StructureResponseData
}

export enum AppStatus {
  LOADING ='LOADING',
  READY ='READY',
  FAIL ='FAIL',
}