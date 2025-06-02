import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import userContext from '../context/userContext'
import { loadPost, updatePostContent } from '../services/post-service'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Container, Form, Input, Label, Row, Col } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { FaEdit, FaImage, FaTag, FaSave } from 'react-icons/fa'
import './UpdatePage.css'

const Update = () => {
    const [categories, setCategories] = useState([])
    const { postId } = useParams()
    const object = useContext(userContext)
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            loadAllCategories(),
            loadPost(postId)
        ])
            .then(([categoriesData, postData]) => {
                setCategories(categoriesData)
                setPost({ ...postData, categoryId: postData.category.categoryId })
                setLoading(false)
            })
            .catch(error => {
                toast.error("Error loading data")
                setLoading(false)
            })
    }, [postId])

    const handleChange = (event, fieldName) => {
        setPost({
            ...post,
            [fieldName]: event.target.value
        })
    }

    const handleContentChange = (event) => {
        setPost({ ...post, postContent: event.target.value })
    }

    const updatePostBySubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        updatePostContent({ ...post, category: { categoryId: post.categoryId } }, post.postId)
            .then(response => {
                toast.success("Post updated successfully")
                navigate(`/user/dashboard`)
            })
            .catch(error => {
                toast.error("Failed to update post")
                setLoading(false)
            })
    }

    const updatePost = () => {
        return (
            <div className="update-post-page">
                <Container className="py-5">
                    <Row className="justify-content-center">
                        <Col md={10} lg={8}>
                            <Card className="fade-in">
                                <CardBody className="p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <FaEdit size={24} className="text-primary me-2" />
                                        <h3 className="mb-0">Update Post</h3>
                                    </div>

                                    <Form onSubmit={updatePostBySubmit}>
                                        <div className="mb-4">
                                            <Label for="title" className="form-label">Title</Label>
                                            <Input
                                                type="text"
                                                id="title"
                                                className="form-control"
                                                onChange={(event) => handleChange(event, 'title')}
                                                name="title"
                                                value={post.title}
                                                placeholder="Enter post title"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <Label for="postContent" className="form-label">Content</Label>
                                            <Input
                                                type="textarea"
                                                id="postContent"
                                                value={post.postContent}
                                                className="form-control"
                                                style={{ minHeight: '200px' }}
                                                name="postContent"
                                                onChange={handleContentChange}
                                                placeholder="Write your post content here..."
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <Label for="image" className="form-label d-flex align-items-center">
                                                <FaImage className="me-2" />
                                                Add Media
                                            </Label>
                                            <Input
                                                id="image"
                                                type="file"
                                                className="form-control"
                                                onChange={() => {}}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <Label for="categoryId" className="form-label d-flex align-items-center">
                                                <FaTag className="me-2" />
                                                Category
                                            </Label>
                                            <Input
                                                type="select"
                                                id="categoryId"
                                                className="form-control"
                                                name="categoryId"
                                                value={post.categoryId}
                                                onChange={(event) => handleChange(event, 'categoryId')}
                                            >
                                                <option value="" disabled>Select a category</option>
                                                {categories.map((category) => (
                                                    <option value={category.categoryId} key={category.categoryId}>
                                                        {category.categoryName}
                                                    </option>
                                                ))}
                                            </Input>
                                        </div>

                                        <div className="d-grid gap-2">
                                            <Button
                                                color="primary"
                                                type="submit"
                                                className="d-flex align-items-center justify-content-center"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                ) : (
                                                    <FaSave className="me-2" />
                                                )}
                                                Update Post
                                            </Button>
                                            <Button
                                                color="light"
                                                type="button"
                                                onClick={() => navigate(`/post/${post.postId}`)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    return (
        <div className="update-page">
            {loading && !post ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                post && updatePost()
            )}
        </div>
    )
}

export default Update
