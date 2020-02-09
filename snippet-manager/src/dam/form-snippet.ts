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

const sampleSnippet = new FormSnippet({
  inputs: [
    { type: InputType.TEXT, name: 'name', placeholder: 'enter name' },
    { type: InputType.EMAIL, name: 'email', placeholder: 'enter email' },
    { type: InputType.PASSWORD, name: 'password', placeholder: 'enter password' },
    { type: InputType.PASSWORD, name: 'password1', placeholder: 'enter password' },
    { type: InputType.PASSWORD, name: 'password2', placeholder: 'enter password' },
    { type: InputType.PASSWORD, name: 'password3', placeholder: 'enter password' },
    { type: InputType.PASSWORD, name: 'password4', placeholder: 'enter password' },
  ]
})

sampleSnippet.save()

export function getFormSnippetStructure(formId: string, userId): Promise<Document> {
  return FormSnippet.findOne().exec()
}