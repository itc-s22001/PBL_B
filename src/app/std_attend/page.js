"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import s from './page.module.css';
import { auth, db } from '@/app/firebase';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

const StdAttend = () => {
  const [student, setStudent] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!auth.currentUser) {
        router.push('/LoginScreen'); // ログインページにリダイレクト
        return;
      }

      try {
        const userDoc = doc(db, 'user', auth.currentUser.uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          setStudent(userSnapshot.data());
        } else {
          console.error('User not found');
          // ユーザーが見つからない場合の処理
          alert('ユーザー情報が見つかりません');
        }
      } catch (error) {
        console.error('Failed to fetch student data:', error);
        alert('データの取得に失敗しました');
      }
    };

    fetchStudentData();
  }, [router]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleAttendance = async (status) => {
    if (!student || !selectedClass) {
      alert('授業を選択してください');
      return;
    }

    try {
      await addDoc(collection(db, 'attendance'), {
        studentId: student.student_id,
        name: student.name,
        class: selectedClass,
        status,
        timestamp: new Date(),
      });

      alert('出席状況が登録されました');
    } catch (error) {
      console.error('Failed to record attendance:', error);
      alert('出席状況の登録に失敗しました');
    }
  };

  if (!student) return <div>Loading...</div>;

  return (
    <>
      <div className={s.inputControlNumber}>
        <label htmlFor="StudentNumber" className="form-label required">学籍番号:</label>
        <span>{student.student_id}</span>
      </div>

      <div className={s.inputControlName}>
        <label htmlFor="StudentName" className="form-label required">名前:</label>
        <span>{student.name}</span>
      </div>

      <div className={s.inputControlClassContainer}>
        <div className={s.inputControlClass}>
          <label htmlFor="Class" className="form-label required">授業:</label>
          <select className={s.dropdown} id="Class" value={selectedClass} onChange={handleClassChange}>
            <option value="">選択してください</option>
            <option value="class1">PBL</option>
            <option value="class2">Java</option>
            <option value="class3">Secure Program</option>
          </select>
        </div>
      </div>

      <div>
        <p className={s.buttonContainer}>
          <button className={`${s.button} ${s.buttonA}`} onClick={() => handleAttendance('present')}>
            出席
          </button>
          <button className={`${s.button} ${s.buttonA}`} onClick={() => handleAttendance('absent')}>
            欠席
          </button>
        </p>
      </div>
    </>
  );
};

export default StdAttend;
