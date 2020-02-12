import * as R from 'ramda'
import { GraphQLResolverMap } from "apollo-graphql"
import { formResolvers } from './form-resolvers'


export const resolvers: GraphQLResolverMap = R.reduce(R.mergeDeepRight, {})([
  formResolvers
])