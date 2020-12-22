const { ApolloServer, gql } = require('apollo-server-lambda')
var faunadb = require('faunadb')
q = faunadb.query


const typeDefs = gql`
  type Query {
     bookmarks: [Bookmark]
      }
  type Bookmark {
    id: ID!
    title: String!
    url: String!
  }
  type Mutation {
    addBookmark(title: String!,url: String):Bookmark
  }
`

const resolvers = {
  Query: {

    bookmarks: async (root, args, context) => {
      try {
        var adminClient = new faunadb.Client({ secret: "fnAD9iPOPmACBnhyD9UOCtop3ZfocWpnC3oP5hVm" })
        const result = await adminClient.query(
          q.Map(
            q.Pagniate(q.Match(q.Index('url'))),
            q.lambda(x => q.Get(x))
          )
        )
        console.log(result.data)
        return result.data.map(d=>({
          id: d.ts,
          title :d.data.title,
          url:d.data.url
        }))
      }

      catch (err) {
        console.log('.error', err)
      }

    }
  },
  Mutation: {
    addBookmark: async(_, { title, url }) => {
 
      try {
        var adminClient = new faunadb.Client({ secret: "fnAD9iPOPmACBnhyD9UOCtop3ZfocWpnC3oP5hVm" })

        const result = await adminClient.query(
          q.Create(q.Collection('bookmarks'), {
            data: {
              title,
              url,

            }
          })
        )
        return result.data.data
      }
      catch (err) {
        console.log(err)
      }


    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
