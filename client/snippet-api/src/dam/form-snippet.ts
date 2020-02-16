import mongoose, { Schema, Document } from 'mongoose'

export interface FormStructure extends Document {
  inputs: FormInput []
}

export interface FormInput extends Document {
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


const InputSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(InputType),
    required: true
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  placeholder: {
    type: String,
    required: false
  }
})

const FormSnippetSchema = new Schema({
  inputs: [InputSchema]
})

mongoose.model('FormSnippet', FormSnippetSchema)

const FormSnippet = mongoose.model('FormSnippet')

export function getFormSnippetStructure(formId: string, userId): Promise<Document> {
  return FormSnippet.findOne().exec()
}