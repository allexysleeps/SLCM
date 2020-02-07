import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildFederatedSchema } from '@apollo/federation'
import cors from 'cors'

import { getTypeDefs } from './typedefs/typedefs'
import {resolvers} from "./resolvers/resolvers"

const server = new ApolloServer({ schema: buildFederatedSchema([ { typeDefs: getTypeDefs(), resolvers }])})

const app = express().use(cors())

server.applyMiddleware({ app })

app.listen({ port: 9000 }, () => console.log(`🚀 Server ready at http://localhost:9000${server.graphqlPath}`))
