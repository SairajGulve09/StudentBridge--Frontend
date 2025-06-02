import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Container, Card, CardBody, CardText, Input, Button } from 'reactstrap'
import { createComment, loadPost } from '../services/post-service'
import { toast } from 'react-toastify'
import { BASE_URL } from '../services/helper'
import { isLoggedIn } from '../Auth/Auth'
import { FaUser, FaClock, FaTag, FaComment, FaPaperPlane } from 'react-icons/fa'
import '../styles/common.css'

const PostDetails = () => {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState({
        content: ''
    })

    useEffect(() => {
        loadPost(postId).then(data => {
            setPost(data)
        }).catch((error) => {
            toast.error("Error in displaying post")
        })
    }, [postId])

    const printElapsedTime = (uploadDate) => {
        const currentDate = new Date();
        const timeDifference = currentDate - new Date(uploadDate);
        const secondsDifference = Math.floor(timeDifference / 1000);
        const intervals = [
            { label: 'y', seconds: 31536000 },
            { label: 'm', seconds: 2592000 },
            { label: 'd', seconds: 86400 },
            { label: 'hr', seconds: 3600 },
            { label: 'min', seconds: 60 },
            { label: 'sec', seconds: 1 },
        ];

        for (let i = 0; i < intervals.length; i++) {
            const interval = intervals[i];
            const intervalInSeconds = interval.seconds;
            if (secondsDifference >= intervalInSeconds) {
                const count = Math.floor(secondsDifference / intervalInSeconds);
                return `${count}${interval.label} ago`;
            }
        }
        return 'Just now';
    };

    const submitPost = () => {
        if (!isLoggedIn()) {
            toast.error("Please login to comment")
            return;
        }

        if (comment.content.trim() === '') {
            toast.error("Comment cannot be empty")
            return;
        }

        createComment(comment, post.postId)
            .then(data => {
                toast.success("Comment added successfully")
                setPost({
                    ...post,
                    comments: [...post.comments, data.data]
                })
                setComment({ content: '' })
            }).catch(error => {
                toast.error("Error adding comment")
            })
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10}>
                    {post && (
                        <Card className="fade-in mb-4">
                            <CardBody className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="avatar-circle me-3">
                                        <FaUser size={20} />
                                    </div>
                                    <div>
                                        <h5 className="mb-0">{post.user.name}</h5>
                                        <div className="d-flex align-items-center text-muted">
                                            <FaClock className="me-1" />
                                            <small>{printElapsedTime(post.addedDate)}</small>
                                            <FaTag className="ms-3 me-1" />
                                            <small>{post.category.categoryName}</small>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="mb-4">{post.title}</h2>

                                <div className="post-image-container mb-4">
                                    <img
                                        className="img-fluid rounded"
                                        src={BASE_URL + '/api/post/image/' + post.imageName}
                                        alt={post.title}
                                        style={{
                                            maxHeight: '500px',
                                            width: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>

                                <CardText className="post-content mb-4">
                                    {post.postContent}
                                </CardText>

                                <div className="comments-section">
                                    <h4 className="mb-4">
                                        <FaComment className="me-2" />
                                        Comments ({post.comments.length})
                                    </h4>

                                    {post.comments.map((c, index) => (
                                        <Card key={index} className="mb-3 border-0 bg-light">
                                            <CardBody className="p-3">
                                                <div className="d-flex align-items-center mb-2">
                                                    <div className="avatar-circle-sm me-2">
                                                        <FaUser size={14} />
                                                    </div>
                                                    <small className="text-muted">Anonymous User</small>
                                                </div>
                                                <CardText className="mb-0">{c.content}</CardText>
                                            </CardBody>
                                        </Card>
                                    ))}

                                    <Card className="border-0 bg-light">
                                        <CardBody className="p-3">
                                            <Input
                                                type="textarea"
                                                placeholder="Write a comment..."
                                                value={comment.content}
                                                onChange={(event) => setComment({ content: event.target.value })}
                                                className="mb-3"
                                                style={{ minHeight: '100px' }}
                                            />
                                            <Button
                                                color="primary"
                                                onClick={submitPost}
                                                className="d-flex align-items-center"
                                            >
                                                <FaPaperPlane className="me-2" />
                                                Post Comment
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </div>
                            </CardBody>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default PostDetails

    

