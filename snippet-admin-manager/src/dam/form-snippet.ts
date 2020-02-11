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

interface FormStructureInput {
  inputs?: FormStructure['inputs']
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

export async function createFormSnippet(userId: string, formStructure: FormStructureInput = { inputs: [] }): Promise<FormStructure> {
  const formSnippet = new FormSnippet(formStructure)
  const savedForm = await formSnippet.save()
  return savedForm as FormStructure
}

export function getFormSnippetStructure(formId: string, userId: string): Promise<Document> {
  return FormSnippet.findOne().exec()
}