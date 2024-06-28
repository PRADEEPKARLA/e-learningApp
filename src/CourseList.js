// CourseList.js
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';
// //import './CourseList.css'; // Import custom CSS for styling

// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);

// const CourseList = () => {
//     const [courses, setCourses] = useState([]);  // Initialize courses as an empty array
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchCourses = async () => {
//             setLoading(true);
//             setError('');
//             try {
//                 const coursesRef = collection(firestore, 'courses');
//                 const snapshot = await getDocs(coursesRef);
//                 const coursesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 setCourses(coursesData);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCourses();
//     }, []);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p className="error-message">{error}</p>;
//     }

//     return (
//         <div className="container">
//             <h2>Course List</h2>
//             <ul className="course-list">
//                 {courses.map(course => (
//                     <li key={course.id} className="course-item">
//                         <Link to={`/courses/${course.id}`}>{course.title}</Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default CourseList;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import './CourseList.css'; // Import custom CSS for styling

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

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError('');
            try {
                const coursesRef = collection(firestore, 'courses');
                const snapshot = await getDocs(coursesRef);
                const coursesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCourses(coursesData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="container">
            <h2>Course List</h2>
            <input
                type="text"
                placeholder="Search for a course"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <ul className="course-list">
                {filteredCourses.map(course => (
                    <li key={course.id} className="course-item">
                        <Link to={`/courses/${course.id}`}>{course.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;