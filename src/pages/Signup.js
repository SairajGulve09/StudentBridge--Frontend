import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { signUp } from '../services/user-service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaGraduationCap } from 'react-icons/fa'
import '../styles/common.css'

const Signup = () => {
    const navigate = useNavigate()

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about: ''
    })

    const [error, setError] = useState({
        errors: {},
        isError: false
    })

    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value })
    }

    const resetData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            about: ''
        })
    }

    const submitForm = (event) => {
        event.preventDefault()

        signUp(data).then((resp) => {
            toast.success("User registered successfully")
            setData({
                name: '',
                email: '',
                password: '',
                about: ''
            });
            navigate("/login")
        }).catch((error) => {
            if (error.response && error.response.status === 401) {
                toast.error("User already exists");
                navigate("/login")
                toast.error("Please login");
            }

            setError({
                errors: error,
                isError: true
            })
        })
    }

    return (
        <div className="signup-page" style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            padding: '2rem 0'
        }}>
            <Container style={{ maxWidth: '500px' }}>
                <Row className="justify-content-center">
                    <Col md="12">
                        <Card className="fade-in">
                            <CardHeader className="text-center py-4" style={{ borderBottom: '2px solid var(--primary-color)' }}>
                                <h2 style={{ color: 'var(--primary-color)', margin: 0 }}>Create Account</h2>
                                <p className="text-muted mt-2">Join our community of learners</p>
                            </CardHeader>
                            <CardBody className="p-4">
                                <Form onSubmit={submitForm}>
                                    <FormGroup className="mb-4">
                                        <Label for="name" className="mb-2">Full Name</Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FaUser className="text-muted" />
                                            </span>
                                            <Input
                                                type="text"
                                                placeholder="Enter your full name"
                                                id="name"
                                                onChange={(e) => handleChange(e, 'name')}
                                                value={data.name}
                                                invalid={error.errors?.response?.data?.name ? true : false}
                                                className="form-control"
                                            />
                                        </div>
                                        <FormFeedback>
                                            {error.errors?.response?.data?.name}
                                        </FormFeedback>
                                    </FormGroup>

                                    <FormGroup className="mb-4">
                                        <Label for="email" className="mb-2">Email Address</Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FaEnvelope className="text-muted" />
                                            </span>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                id="email"
                                                onChange={(e) => handleChange(e, 'email')}
                                                value={data.email}
                                                invalid={error.errors?.response?.data?.email ? true : false}
                                                className="form-control"
                                            />
                                        </div>
                                        <FormFeedback>
                                            {error.errors?.response?.data?.email}
                                        </FormFeedback>
                                    </FormGroup>

                                    <FormGroup className="mb-4">
                                        <Label for="password" className="mb-2">Password</Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FaLock className="text-muted" />
                                            </span>
                                            <Input
                                                type="password"
                                                placeholder="Create a strong password"
                                                id="password"
                                                onChange={(e) => handleChange(e, 'password')}
                                                value={data.password}
                                                invalid={error.errors?.response?.data?.password ? true : false}
                                                className="form-control"
                                            />
                                        </div>
                                        <FormFeedback>
                                            {error.errors?.response?.data?.password}
                                        </FormFeedback>
                                    </FormGroup>

                                    <FormGroup className="mb-4">
                                        <Label for="about" className="mb-2">You are</Label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <FaGraduationCap className="text-muted" />
                                            </span>
                                            <Input
                                                type="select"
                                                id="about"
                                                onChange={(e) => handleChange(e, 'about')}
                                                value={data.about}
                                                invalid={error.errors?.response?.data?.about ? true : false}
                                                className="form-control"
                                            >
                                                <option value="">Select your role</option>
                                                <option value="alumni">Alumni</option>
                                                <option value="student">Student</option>
                                            </Input>
                                        </div>
                                        <FormFeedback>
                                            {error.errors?.response?.data?.about}
                                        </FormFeedback>
                                    </FormGroup>

                                    <div className="d-grid gap-2">
                                        <Button color="primary" type="submit" className="mb-3">
                                            Create Account
                                        </Button>
                                        <Button color="light" type="reset" onClick={resetData}>
                                            Reset Form
                                        </Button>
                                    </div>

                                    <div className="text-center mt-4">
                                        <p className="mb-0">Already have an account? <a href="/login" className="text-primary">Login here</a></p>
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

export default Signup
