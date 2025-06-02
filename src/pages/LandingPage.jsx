import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { FaGraduationCap, FaUsers, FaBook } from 'react-icons/fa';
import './LandingPage.css';
import '../styles/common.css';

const LandingPage = () => {
	return (
		<div className="landing-page">
			{/* Hero Section */}
			<section className="hero-section">
				<Container>
					<Row className="align-items-center min-vh-100">
						<Col md={8} lg={6} className="hero-content">
							<h1 className="hero-title fade-in">
								Welcome to <span className="highlight">StudentBridge</span>
							</h1>
							<p className="hero-subtitle slide-up">
								Connect, Learn, and Grow with Your Academic Community
							</p>
							<div className="hero-buttons slide-up-delayed">
								<Link to="/signup">
									<Button color="primary" size="lg" className="me-3">
										Get Started
									</Button>
								</Link>
								<Link to="/login">
									<Button color="light" size="lg">
										Log In
									</Button>
								</Link>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Features Section */}
			<section className="features-section">
				<Container>
					<h2 className="section-title text-center fade-in">Why Choose StudentBridge?</h2>
					<Row className="mt-5">
						<Col md={4} className="mb-4">
							<div className="feature-card fade-in">
								<div className="feature-icon">
									<FaGraduationCap />
								</div>
								<h3>Expert Guidance</h3>
								<p>Connect with experienced mentors and get personalized guidance for your academic journey.</p>
							</div>
						</Col>
						<Col md={4} className="mb-4">
							<div className="feature-card fade-in" style={{ animationDelay: '0.2s' }}>
								<div className="feature-icon">
									<FaUsers />
								</div>
								<h3>Community Learning</h3>
								<p>Join a vibrant community of learners, share knowledge, and grow together.</p>
							</div>
						</Col>
						<Col md={4} className="mb-4">
							<div className="feature-card fade-in" style={{ animationDelay: '0.4s' }}>
								<div className="feature-icon">
									<FaBook />
								</div>
								<h3>Rich Resources</h3>
								<p>Access a vast library of study materials, notes, and educational content.</p>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Stats Section */}
			<section className="stats-section">
				<Container>
					<Row className="text-center">
						<Col md={4} className="mb-4">
							<div className="stat-item fade-in">
								<h3>1000+</h3>
								<p>Active Students</p>
							</div>
						</Col>
						<Col md={4} className="mb-4">
							<div className="stat-item fade-in" style={{ animationDelay: '0.2s' }}>
								<h3>500+</h3>
								<p>Expert Tutors</p>
							</div>
						</Col>
						<Col md={4} className="mb-4">
							<div className="stat-item fade-in" style={{ animationDelay: '0.4s' }}>
								<h3>50+</h3>
								<p>Subjects Covered</p>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	);
};

export default LandingPage;