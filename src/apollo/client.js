import fetch from 'cross-fetch'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
    link: new HttpLink({
        uri: "/.netlify/functions/mybookmarkList",
        fetch
    }),
    cache: new InMemoryCache()

})