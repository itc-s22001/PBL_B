'use client';

import s from './page.module.css';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const StdCheck = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await fetchUserData(user.email);
                if (userData) {
                    setStudentId(userData.student_id);
                    setStudentName(userData.name);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchUserData = async (email) => {
        const q = query(collection(db, "user"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        } else {
            return null;
        }
    };

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    return (
        <div className={s.container}>
            <div className={s.inputControl}>
                <p className={s.inputLabel}>学籍番号：</p>
                <input type="text" value={studentId} readOnly className={s.readOnlyInput} />
            </div>
            <div className={s.inputControl}>
                <p className={s.inputLabel}>名前：</p>
                <input type="text" value={studentName} readOnly className={s.readOnlyInput} />
            </div>
            <div className={s.inputControl}>
                <p className={s.inputLabel}>授業：</p>
                <select
                    className={s.dropdown}
                    value={selectedClass}
                    onChange={handleClassChange}
                >
                    <option value="">選択してください</option>
                    <option value="PBL">PBL</option>
                    <option value="Java">Java</option>
                    <option value="Secure Program">Secure Program</option>
                </select>
            </div>
            <div className={s.buttonContainer}>
                <button className={`${s.button} ${s.buttonA}`}>出席</button>
                <button className={`${s.button} ${s.buttonB}`}>欠席</button>
            </div>
        </div>
    );
};

export default StdCheck;
