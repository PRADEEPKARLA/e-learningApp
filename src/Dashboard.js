// Dashboard.js
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Button, Modal, Form, ProgressBar } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete, AiFillPlusCircle } from 'react-icons/ai';
import './Dashboard.css';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: '', progress: 0 });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError('');
            try {
                const user = auth.currentUser;
                if (user) {
                    const coursesRef = collection(firestore, 'users', user.uid, 'courses');
                    const snapshot = await getDocs(coursesRef);
                    const userCourses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setCourses(userCourses);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleAddCourse = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const coursesRef = collection(firestore, 'users', user.uid, 'courses');
                await addDoc(coursesRef, newCourse);
                setCourses([...courses, newCourse]);
                setShowAddModal(false);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditCourse = async (id, updatedCourse) => {
        try {
            const user = auth.currentUser;
            if (user) {
                const courseDoc = doc(firestore, 'users', user.uid, 'courses', id);
                await updateDoc(courseDoc, updatedCourse);
                setCourses(courses.map(course => (course.id === id ? { ...course, ...updatedCourse } : course)));
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            const user = auth.currentUser;
            if (user) {
                const courseDoc = doc(firestore, 'users', user.uid, 'courses', id);
                await deleteDoc(courseDoc);
                setCourses(courses.filter(course => course.id !== id));
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="dashboard-container">
            <h2>My Dashboard</h2>
            <Form.Control
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-3"
            />
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
                <AiFillPlusCircle /> Add Course
            </Button>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <ul>
                    {courses.map(course => (
                        <li key={course.id}>
                            <div>
                                {course.title} - <ProgressBar now={course.progress} label={`${course.progress}%`} />
                            </div>
                            <div>
                                <Button variant="warning" onClick={() => handleEditCourse(course.id, course)}>
                                    <AiFillEdit /> Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteCourse(course.id)}>
                                    <AiFillDelete /> Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCourseTitle">
                            <Form.Label>Course Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter course title"
                                value={newCourse.title}
                                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCourseProgress">
                            <Form.Label>Progress</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter progress"
                                value={newCourse.progress}
                                onChange={(e) => setNewCourse({ ...newCourse, progress: parseInt(e.target.value) })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddCourse}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;

