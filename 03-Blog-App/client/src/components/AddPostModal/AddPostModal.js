/* eslint-disable no-unused-vars */
import { gql, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    postCreate(post: {
      title: $title,
      content: $content
      }) {
      userErrors {
        message
      }
      post {
        title
        content
        published
        createdAt
        user {
          name
        }
      }
    }
  }
`

export default function AddPostModal() {
  const [createPost, { data, loading }] = useMutation(CREATE_POST)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState('')

  useEffect(() => {
    if (data) {
      if (data.postCreate.userErrors.length) {
        setError(data.postCreate.userErrors.map(error => error.message).join('\n'))
      } else {
        handleClose()
      }
    }
    }, [data])

  const handleClick = () => {
    if (!title || !content) return

    createPost({
      variables: {
        title,
        content
      }
    })
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Post
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {error && <p>{error}</p>}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
