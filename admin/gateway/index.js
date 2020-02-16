const { ApolloServer } = require('apollo-server-express')
const { ApolloGateway } = require('@apollo/gateway')

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'snippet', url: 'http://localhost:9001/graphql' },
    ]
})