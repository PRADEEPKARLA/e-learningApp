// SomeComponent.js
import React, { useEffect, useState } from 'react';
import firestore from './firebaseConfig';

const SomeComponent = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesCollection = await firestore.collection('courses').get();
            const coursesData = coursesCollection.docs.map(doc => doc.data());
            setCourses(coursesData);
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <h2>Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>{course.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SomeComponent;