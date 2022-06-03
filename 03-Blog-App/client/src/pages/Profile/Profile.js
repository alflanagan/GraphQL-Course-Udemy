import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'

import AddPostModal from '../../components/AddPostModal/AddPostModal'
import Post from '../../components/Post/Post'

const GET_PROFILE = gql`
  query GetProfile($userId: ID!){
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        id
        name
        posts {
          id
          title
          content
          createdAt
          published
        }
      }
    }
  }
`

export default function Profile() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: {
      userId: id
    }
  })

  if (error) return <div>Error! {`${error}`}</div>
  if (loading) return <div>Loading...</div>
  if (!data.profile) {
    return (
      <div>
        <h3>No user found for id = {id}.</h3>
      </div>
    )
  }
  const {bio, isMyProfile, user} = data.profile

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{user.name}</h1>
          <p>{bio}</p>
        </div>
        <div>{isMyProfile ? <AddPostModal /> : null}</div>
      </div>
      <div>{user.posts.map(post => {
        return <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          date={post.createdAt}
          user={user.name}
          published={post.published}
          isMyProfile={isMyProfile} />
      })}</div>
    </div>
  );
}
