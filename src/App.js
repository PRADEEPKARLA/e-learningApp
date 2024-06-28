import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import { Signup, Login } from './Auth';
import Dashboard from './Dashboard';
import CourseList from './CourseList';
import CourseDetail from './CourseDetail';
import HomePage from './HomePage';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/courses" element={<CourseDetail />} /> 
                {/* /:id */}
            </Routes>
        </Router>
    );
};

// const Home = () => (
    <div>
        <h2>Welcome to the E-Learning Platform</h2>
        <p>Browse courses, sign up, and start learning!</p>
    </div>
//);

export default App;