import {GraphQLResolverMap} from "apollo-graphql/src/schema/resolverMap"


export const resolvers: GraphQLResolverMap<{}> = {
  Query: {
    formSnippet() {
      return {}
    }
  },
  Mutation: {
    formSnippetAdd() {
      return null
    }
  },
  FormSnippetQuery: {
    structure() {
      return null
    }
  }
}