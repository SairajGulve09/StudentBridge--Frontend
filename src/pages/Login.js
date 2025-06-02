import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { loginUser } from '../services/user-service'
import { doLogin } from '../Auth/Auth'
import { useNavigate } from 'react-router-dom'
import userContext from '../context/userContext'
import '../styles/common.css'
import { FaEnvelope, FaLock, FaGoogle, FaGithub } from 'react-icons/fa'

const Login = () => {
  const userContextData = useContext(userContext)
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event, property) => {
    const actualValue = event.target.value
    setLoginDetails({
      ...loginDetails,
      [property]: actualValue
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if(loginDetails.email.trim() === '' || loginDetails.password.trim() === '') {
      toast.error("Enter the email or password")
      return;
    }

    loginUser(loginDetails).then((data) => {
      doLogin(data, () => {
        userContextData.setUser({
          data: data.user,
          login: true
        })
        navigate("/user/dashboard")
      })
      toast.success("Login Successful");
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    });
  }

  const resetData = () => {
    setLoginDetails({
      email: '',
      password: ''
    })
  }

  return (
    <div className="login-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
      padding: '2rem 0'
    }}>
      <Container style={{ maxWidth: '500px' }}>
        <Row className="justify-content-center">
          <Col md="12">
            <Card className="fade-in">
              <CardHeader className="text-center py-4" style={{ borderBottom: '2px solid var(--primary-color)' }}>
                <h2 style={{ color: 'var(--primary-color)', margin: 0 }}>Welcome Back</h2>
                <p className="text-muted mt-2">Please login to your account</p>
              </CardHeader>
              <CardBody className="p-4">
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup className="mb-4">
                    <Label for="email" className="mb-2">Email</Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FaEnvelope className="text-muted" />
                      </span>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        value={loginDetails.email}
                        onChange={(e) => handleChange(e, 'email')}
                        className="form-control"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup className="mb-4">
                    <Label for="password" className="mb-2">Password</Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FaLock className="text-muted" />
                      </span>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        value={loginDetails.password}
                        onChange={(e) => handleChange(e, 'password')}
                        className="form-control"
                      />
                    </div>
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="remember" />
                      <label className="form-check-label" htmlFor="remember">Remember me</label>
                    </div>
                    <a href="#" className="text-primary">Forgot Password?</a>
                  </div>

                  <Button color="primary" className="w-100 mb-3" type="submit">
                    Login
                  </Button>
                  <Button color="light" className="w-100 mb-3" type="reset" onClick={resetData}>
                    Reset
                  </Button>

                  <div className="text-center mb-3">
                    <p className="text-muted">Or login with</p>
                    <div className="d-flex justify-content-center gap-3">
                      <Button color="light" className="d-flex align-items-center gap-2">
                        <FaGoogle /> Google
                      </Button>
                      <Button color="light" className="d-flex align-items-center gap-2">
                        <FaGithub /> GitHub
                      </Button>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="mb-0">Don't have an account? <a href="/signup" className="text-primary">Sign up</a></p>
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

export default Login
