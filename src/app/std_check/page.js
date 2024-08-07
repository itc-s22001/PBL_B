'use client';

import s from './page.module.css';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

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

    const handleAttendance = async (status) => {
        if (!selectedClass) {
            alert("授業を選択してください");
            return;
        }

        const now = new Date();
        const timestamp = now.toISOString();

        const attendanceData = {
            student_id: studentId,
            name: studentName,
            status: status,
            timestamp: timestamp,
            class: selectedClass
        };

        try {
            await addDoc(collection(db, "attendance"), attendanceData);
            alert("データが保存されました");
        } catch (error) {
            console.error("エラーが発生しました: ", error);
            alert("データの保存に失敗しました");
        }
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
                <button className={`${s.button} ${s.buttonA}`} onClick={() => handleAttendance('出席')}>出席</button>
                <button className={`${s.button} ${s.buttonB}`} onClick={() => handleAttendance('欠席')}>欠席</button>
            </div>
        </div>
    );
};

export default StdCheck;
