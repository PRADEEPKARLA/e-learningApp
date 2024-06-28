// CourseDetail.js
// import React from 'react';
// import { useParams } from 'react-router-dom';

// const CourseDetail = ({ courses }) => {
//     const { id } = useParams();
//     const course = courses.find(course => course.id === parseInt(id));

//     if (!course) return <div>Course not found</div>;

//     return (
//         <div>
//             <h2>{course.title}</h2>
//             <p>{course.description}</p>
//             <p>{course.syllabus}</p>
//             <p>{course.instructor}</p>
//         </div>
//     );
// };

// export default CourseDetail;    

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import './CourseDetail.css'; // Import custom CSS for styling

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
const firestore = getFirestore(app);

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            setError('');
            try {
                const courseRef = doc(firestore, 'courses', id);
                const docSnap = await getDoc(courseRef);
                if (docSnap.exists()) {
                    setCourse({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('Course not found');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="course-detail-container">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <h3>Syllabus:</h3>
            <ul>
                {course.syllabus.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h3>Instructor:</h3>
            <p>{course.instructor}</p>
        </div>
    );
};

export default CourseDetail;