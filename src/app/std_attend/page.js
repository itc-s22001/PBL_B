"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import s from './page.module.css';
import { db } from "@/app/firebase";
import { collection, addDoc } from 'firebase/firestore';

const StdAttend = () => {
  const [email, setEmail] = useState('');
  const [student, setStudent] = useState({ studentNumber: '', name: '' });
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setEmail(userEmail);
      fetchStudentByEmail(userEmail);
    }
  }, []);

  const fetchStudentByEmail = async (email) => {
    try {
      const response = await fetch(`/api/getStudentByEmail?email=${email}`);
      const data = await response.json();
      setStudent(data);
    } catch (error) {
      console.error('Failed to fetch student:', error);
    }
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSubmit = async (status) => {
    if (!student.studentNumber || !selectedClass) {
      alert('学籍番号と授業を選択してください');
      return;
    }

    try {
      await addDoc(collection(db, 'attendance'), {
        studentNumber: student.studentNumber,
        name: student.name,
        class: selectedClass,
        status: status,
        timestamp: new Date(),
      });
      alert('出席情報を登録しました');
    } catch (error) {
      console.error('Failed to register attendance:', error);
      alert('出席情報の登録に失敗しました');
    }
  };

  return (
    <>
      <div className={s.inputControlNumber}>
        <label htmlFor="StudentNumber" className="form-label required">学籍番号:</label>
        <input
          type="text"
          id="StudentNumber"
          className={s.input}
          value={student.studentNumber}
          readOnly
        />
      </div>

      <div className={s.inputControlName}>
        <label htmlFor="StudentName" className="form-label required">名前:</label>
        <input
          type="text"
          id="StudentName"
          className={s.input}
          value={student.name}
          readOnly
        />
      </div>

      <div className={s.inputControlClassContainer}>
        <div className={s.inputControlClass}>
          <label htmlFor="Class" className="form-label required">授業:</label>
        </div>
        <select className={s.dropdown} id="Class" onChange={handleClassChange}>
          <option value="">選択してください</option>
          <option value="class1">PBL</option>
          <option value="class2">Java</option>
          <option value="class3">Secure Program</option>
        </select>
      </div>

      <div>
        <p className={s.buttonContainer}>
          <button onClick={() => handleSubmit('present')} className={`${s.button} ${s.buttonA}`}>
            出席
          </button>
          <button onClick={() => handleSubmit('absent')} className={`${s.button} ${s.buttonA}`}>
            欠席
          </button>
        </p>
      </div>
    </>
  );
};

export default StdAttend;
