import { GraphQLResolverMap } from "apollo-graphql"
import { addFormSnippet, getFormSnippet } from "../dam/form-dam"
import { FormSnippetDataInput, FormSnippetData } from "../types/form-types"

interface formSnippetAddArgs {
  formData: FormSnippetDataInput
}
interface formSnippetArgs {
  formId: string
  userId: string
}

export const formResolvers: GraphQLResolverMap = {
  Query: {
    formSnippet(obj, args: formSnippetArgs) {
      const { formId } = args
      return getFormSnippet("507f1f77bcf86cd799439011", formId)
    }
  },
  Mutation: {
    formSnippetAdd(obj, args: formSnippetAddArgs): Promise<FormSnippetData> {
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