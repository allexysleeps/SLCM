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
