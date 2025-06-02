import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserDetails } from '../../services/user-service'
import { Container, Row, Col } from 'reactstrap'
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa'
import './Profile.css'

const Profile = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()

  useEffect(() => {
    getUserDetails(userId).then(data => {
      setUser({ ...data })
    })
  }, [])

  if (!user) {
    return (
      <Container className="profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="profile-container">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <FaUser className="avatar-icon" />
              </div>
              <h2 className="profile-name">{user.name}</h2>
            </div>

            <div className="profile-info">
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <span>{user.email}</span>
              </div>
              
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <span>India, IN</span>
              </div>

              {user.about && (
                <div className="info-item about">
                  <FaInfoCircle className="info-icon" />
                  <p>{user.about}</p>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
