import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildFederatedSchema } from '@apollo/federation'
import cors from 'cors'

import { mongooseConnect } from './db'

import { getTypeDefs } from './typedefs/typedefs'
import {resolvers} from "./resolvers/resolvers"

const server = new ApolloServer({ schema: buildFederatedSchema([ { typeDefs: getTypeDefs(), resolvers }])})

const app = express().use(cors())

server.applyMiddleware({ app })

mongooseConnect(
  () => {
    app.listen(
      { port: 9001 },
      () => console.log(`🚀 Server ready at http://localhost:9001${server.graphqlPath}`)
    )
  }
)

