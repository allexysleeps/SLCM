import {GraphQLResolverMap} from "apollo-graphql/src/schema/resolverMap"
import {createFormSnippet} from "../dam/form-snippet"


export const resolvers: GraphQLResolverMap<{}> = {
  Query: {
    formSnippet() {
      return {}
    }
  },
  Mutation: {
    formSnippetAdd() {
      return createFormSnippet("id")
    }
  },
  FormSnippetQuery: {
    structure() {
      return null
    }
  }
}