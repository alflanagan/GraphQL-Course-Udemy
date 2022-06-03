/* eslint-disable no-unused-vars */
import { gql, useQuery } from '@apollo/client'
import React from 'react'

import Post from '../../components/Post/Post'

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`

export default function Posts () {
  const { data, error, loading } = useQuery(GET_POSTS)
  if (error) return <div>Error</div>
  if (loading) return <div>Spinner...</div>

  const { posts } = data

  return <div><h1>Posts</h1>{posts.map(post => {
    return <Post title={post.title} content={post.content} date={post.createdAt} id={post.id} user={post.user.name} />
  })}</div>
}
