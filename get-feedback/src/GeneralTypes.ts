export interface FormBuilderProps {
    structure: FormStructure
}

export interface FormStructure {
    fields: FormField []
}

export interface FormField {
    type: FieldType
    name: string
    label?: string
    placeholder?: string
}

export enum FieldType {
    TEXT,
    EMAIL,
    PASSWORD
}
