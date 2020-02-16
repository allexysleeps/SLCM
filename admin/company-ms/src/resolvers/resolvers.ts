import { GraphQLResolverMap } from "apollo-graphql"

export const resolvers: GraphQLResolverMap = {
  Query: {
    company(obj, args): Promise<null> {
      return null
    }
  },    
}
