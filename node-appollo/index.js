const { GraphQLServer } = require('graphql-yoga')

// 1

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}
type Mutation{
    post(url:String! , description:String):Link!
}
type Link {
  id: ID!
  description: String!
  url: String!
}
`
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },
  {
    id: 'link-1',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },
  {
    id: 'link-2',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
]
// 2
let count = links.length;
const resolvers = {
  Query: {
    info: () => 'Hello Welcome',
    feed:()=>links
  },
  Mutation:{
   post:(parent,args)=>{
    const link ={
        id:`link-${count++}`,
        description:args.description,
        url:args.url
    }
    links.push(link);
    return link;
   }
  },
  Link:{
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}

// 3
const server = new GraphQLServer({
 typeDefs: './schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))