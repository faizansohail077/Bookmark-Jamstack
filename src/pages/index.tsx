import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import gql from 'graphql-tag'

const GET_TODOS = gql`
{
    bookmarks{
        id,
        
    }
}
`

function index() {
    return (
        <div>
            hello from gatsby
        </div>
    )
}

export default index
