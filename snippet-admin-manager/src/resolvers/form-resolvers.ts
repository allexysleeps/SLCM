import { GraphQLResolverMap } from "apollo-graphql"
import { UserInputError } from 'apollo-server-express'
import { addFormSnippet, getFormSnippet, removeFormSnippet, updateFormSnippet } from "../dam/form-dam"
import { FormSnippetDataInput, FormSnippetData } from "../types/form-types"

interface FormSnippetAddArgs {
  formData: FormSnippetDataInput
}
interface FormSnippetMutateArgs {
  formId: string
}

interface FormSnippetUpdateArgs extends FormSnippetAddArgs, FormSnippetMutateArgs {}

export const formResolvers: GraphQLResolverMap = {
  Query: {
    formSnippet: async (obj, args: FormSnippetMutateArgs) => {
      const { formId } = args
      const formSnippetData = await getFormSnippet("507f1f77bcf86cd799439011", formId)
      if (!formSnippetData) {
        throw new UserInputError("Form not found")
      }
      return getFormSnippet("507f1f77bcf86cd799439011", formId)
    }
  },
  Mutation: {
    formSnippetAdd(obj, args: FormSnippetAddArgs): Promise<FormSnippetData> {
      const { formData } = args
      return addFormSnippet("507f1f77bcf86cd799439011", formData)
    },
    formSnippetUpdate: async (_, args: FormSnippetUpdateArgs) => {
      const { formData, formId } = args
      const updatedFormData = await updateFormSnippet(formId, formData)
      if (!updatedFormData) {
        throw new UserInputError("Form not found")
      }

      return updateFormSnippet(formId, formData)
    },
    formSnippetRemove(_, args: FormSnippetMutateArgs) {
      const { formId } = args
      return removeFormSnippet(formId)
    }
  },
  FormSnippetQuery: {
    structure() {
      return null
    }
  }
}