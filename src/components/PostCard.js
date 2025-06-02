import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardText, CardBody, CardTitle, Col, Button } from 'reactstrap'
import { getCurrUser, isLoggedIn } from '../Auth/Auth'
import userContext from '../context/userContext'
import { FaUser, FaCalendarAlt, FaEdit, FaTrash, FaArrowRight } from 'react-icons/fa'
import './PostCard.css'

const PostCard = ({ isDashboard, post = { title: 'This is default title', content: 'This is default content' }, deletePost }) => {
  const userContextData = useContext(userContext)
  const [user, setUser] = useState(null)
  const [login, setLogin] = useState(null)

  useEffect(() => {
    setUser(getCurrUser())
    setLogin(isLoggedIn())
  }, [])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="post-card">
      <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
        <Card className="mt-3 fade-in">
          <CardBody>
            <div className="post-meta mb-3">
              <span className="post-author">
                <FaUser className="me-1" />
                {post.user?.name || 'Anonymous'}
              </span>
              <span className="post-date">
                <FaCalendarAlt className="me-1" />
                {formatDate(post.addedDate)}
              </span>
            </div>
            <CardTitle tag="h2" className="post-title">{post.title}</CardTitle>
            <CardText className="post-content">{post.postContent.substring(0, 150)}...</CardText>
            <div className="post-actions">
              <Link className="btn btn-primary read-more" to={"/posts/" + post.postId}>
                Read More <FaArrowRight className="ms-1" />
              </Link>
              {userContextData.user.login && isDashboard && user && user.id === post.user.id && (
                <div className="dashboard-actions">
                  <Button
                    tag={Link}
                    to={`/user/update/${post.postId}`}
                    className="btn bg-light btn-outline-primary"
                  >
                    <FaEdit className="me-1" /> Edit
                  </Button>
                  <Button
                    onClick={() => deletePost(post)}
                    className="btn bg-light btn-outline-danger ms-2"
                  >
                    <FaTrash className="me-1" /> Delete
                  </Button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </Col>
    </div>
  )
}

export default PostCard
