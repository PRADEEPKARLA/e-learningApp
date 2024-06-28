import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css'; // Import custom CSS for styling

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = () => {
        setError('');
        setSuccess('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setSuccess('User signed up successfully!');
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Email" 
                className="auth-input"
            />
            <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Password" 
                className="auth-input"
            />
            <button onClick={handleSignup} className="auth-button">Sign Up</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = () => {
        setError('');
        setSuccess('');
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setSuccess('User logged in successfully!');
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Email" 
                className="auth-input"
            />
            <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Password" 
                className="auth-input"
            />
            <button onClick={handleLogin} className="auth-button">Login</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export { Signup, Login };