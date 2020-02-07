import {GraphQLResolverMap} from "apollo-graphql/src/schema/resolverMap"
import { getFormSnippetStructure } from '../dam/form-snippet'


export const resolvers: GraphQLResolverMap<{}> = {
  Query: {
    formSnippet() {
      return {}
    }
  },
  FormSnippetQuery: {
    structure() {
      return getFormSnippetStructure("", "")
    }
  }
}