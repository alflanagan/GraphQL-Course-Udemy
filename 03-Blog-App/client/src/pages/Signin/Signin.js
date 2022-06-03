/* eslint-disable no-unused-vars */
import { gql, useMutation as useGqlMutation, useMutation } from '@apollo/client'
import Button from '@restart/ui/esm/Button'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

const SIGNIN = gql`
  mutation UserSignin($email: String!, $password: String!) {
    signin(credentials: {
      email: $email,
      password: $password
      }) {
    userErrors {
      message
    }
    token
  }
}
`

export default function Signin() {

  const [signin, {data, loading}] = useMutation(SIGNIN)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      if (data.signin.userErrors.length) {
        setError(data.signin.userErrors.map(error => error.message).join('\n'))
      }
      if (data.signin.token) {
        localStorage.setItem('token', data.signin.token)
      }
    }
  }, [data])

  const handleClick = () => {
    // signin returns a promise, but through the magic of useMutation and useEffect, we
    // don't need to do anything with it here.
    signin({
      variables: {
        email,
        password
      }
    })
  }

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signin</Button>
      </Form>
    </div>
  );
}
