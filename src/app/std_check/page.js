'use client';

import s from './page.module.css';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";  // Timestampをインポート

const StdCheck = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [classes, setClasses] = useState([]);
    const [userUid, setUserUid] = useState('');
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserUid(user.uid); 
                const userData = await fetchUserData(user.email);
                if (userData) {
                    setStudentId(userData.student_id);
                    setStudentName(userData.name);
                }
            }
        });

        fetchClasses();

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

    const fetchClasses = async () => {
        const classCollection = collection(db, "class");
        const classQuery = query(classCollection);
        const classSnapshot = await getDocs(classQuery);
        const classList = classSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClasses(classList);
    };

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    const handleAttendance = async (status) => {
        if (!selectedClass) {
            alert("授業を選択してください");
            return;
        }

        // 現在の時刻を取得し、Firestore用のタイムスタンプを作成
        const now = Timestamp.now();

        const attendanceData = {
            student_uid: userUid,  // ユーザーのUID
            status: status,
            date: now,  // Firestoreのタイムスタンプ形式で保存
            class_id: selectedClass
        };

        try {
            await addDoc(collection(db, "attendance"), attendanceData);
            alert("データが保存されました");
            router.push('/complete_attend'); // データ保存後にリダイレクト
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
                    {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>{cls.className}</option>
                    ))}
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
