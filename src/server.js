import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'

const data = {
  warriors: [
    { id: '001', name:'John'},
    { id: '002', name:'João'},
  ],
}

const typeDefs = `
  type Warrior {
    id: ID!
    name: String!
  }
  type Query {
    warriors: [Warrior]
  }
`

const resolvers = {
  Query: {
    warriors: (obj, args, context, info) => context.warriors,
  },
}

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  '/graphql',
  graphqlHTTP({
    schema: executableSchema,
    context: data,
    graphiql: true,
  })
)

app.get('/', (request, response) => {
  response.send('Hello, GraphQL!')
})

app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`)
})