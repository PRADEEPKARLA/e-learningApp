import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import custom CSS for styling
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const HomePage = () => {
    return (
        <div>
        <div className="homepage">
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to [E-LERANING]</h1>
                    <p>Explore a World of Knowledge</p>
                    <Link to="/signup" className="cta-button">Get Started</Link>
                </div>
            </section>

            <section className="featured-courses">
                <div className="container">
                    <h2>Featured Courses</h2>
                    <div className="course-grid">
                        {/* Example course card */}
                        <div className="course-card">
                            {/* <img src="course-image.jpg" alt="Course Image" /> */}
                            <h3>Course Title</h3>
                            <p>Short description of the course. Lorem ipsum dolor sit amet.</p>
                            <Link to="/courses/course-id" className="course-link">Learn More</Link>
                        </div>
                        {/* Repeat similar course cards */}
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <div className="container">
                    <h2>What Our Students Say</h2>
                    <div className="testimonial-slider">
                        {/* Example testimonial */}
                        <div className="testimonial">
                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac lacus vel sapien interdum condimentum."</p>
                            <p className="user-name">John Doe</p>
                        </div>
                        {/* Repeat similar testimonials */}
                    </div>
                </div>
            </section>

            <section className="benefits">
                <div className="container">
                    <h2>Why Choose Us?</h2>
                    <div className="benefits-list">
                        <div className="benefit">
                            <h3>Flexibility</h3>
                            <p>Learn at your own pace, anytime, anywhere.</p>
                        </div>
                        <div className="benefit">
                            <h3>Quality Content</h3>
                            <p>Expertly curated courses with industry-leading instructors.</p>
                        </div>
                        <div className="benefit">
                            <h3>Certifications</h3>
                            <p>Earn certificates upon course completion to showcase your skills.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <h3>[E-LEARNING]</h3>
                            <p>The Platform where dreams come true</p>
                        </div>
                        <div className="footer-links">
                            <ul>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/terms">Terms of Service</Link></li>
                                <li><Link to="/privacy">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    </div>
                    <div className="footer-social">
                        <p>Follow Us:</p>
                        <div className="footer-social">
                    <div className="social-icons">
                        <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} className="icon facebook" />
                        </a>
                        <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} className="icon twitter" />
                        </a>
                        <a href="https://www.instagram.com/youraccount" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className="icon instagram" />
                        </a>
                        {/* Add more social media icons as needed */}
                    </div> 
                         </div> {/*Add social media icons or links */}
                    
                </div>
            </footer>
        </div>
        </div>
    );
};

export default HomePage;