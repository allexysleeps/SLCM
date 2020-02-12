import mongoose, { Schema, Document } from 'mongoose'
import { FormSnippetDataInput, FormStructure, InputType, FormSnippetData } from "../types/form-types"

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

const FormStructureSchema = new Schema({
  inputs: [InputSchema],
})

const FormSnippetSchema = new Schema({
  structure: FormStructureSchema,
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  published: {
    type: Boolean,
    required: true,
    default: false
  }
})

mongoose.model('FormSnippet', FormSnippetSchema)

const Form = mongoose.model('FormSnippet')

export async function getFormSnippet(userId: string, formId: string): Promise<FormSnippetData> {
  const formData = await Form.findOne({
    _id: formId
  }).exec()
  
  return formData as unknown as FormSnippetData
}

export async function addFormSnippet(userId: string, formData: FormSnippetDataInput): Promise<FormSnippetData> {
  const formSnippet = new Form({
    ...formData,
    userId
  })
  const formId = await formSnippet.save().then(data => data._id)
  return {
    ...formData,
    id: formId,
  }
}

export function updateFormSnippet(userId: string, formId: string, formData: FormSnippetDataInput): Promise<FormStructure> {
  return null
}

export function deleteFormSnippet(userId: string, formId: string): Promise<Boolean> {
  return null
}