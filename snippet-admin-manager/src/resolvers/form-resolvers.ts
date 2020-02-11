import { addFormSnippet, getFormSnippet } from "../dam/form-dam"
import { GraphQLFieldResolver, GraphQLSchema } from "graphql"
import { FormStructure, FormSnippetDataInput, FormSnippetData } from "../types/form-types"

interface formSnippetAddArgs {
  formData: FormSnippetDataInput
}

export const formResolvers = {
  Query: {
    formSnippet() {
      return getFormSnippet("507f1f77bcf86cd799439011", "5e432169de3356314d9c1c4f")
    }
  },
  Mutation: {
    formSnippetAdd(obj, args: formSnippetAddArgs , ctx): Promise<FormSnippetData> {
      const { formData } = args
      return addFormSnippet("507f1f77bcf86cd799439011", formData)
    },
    formSnippetUpdate() {
      return null
    },
    formSnippetRemove() {
      return null
    }
  },
  FormSnippetQuery: {
    structure() {
      return null
    }
  }
}