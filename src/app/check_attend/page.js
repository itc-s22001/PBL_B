"use client";

import Link from "next/link";
import s from './page.module.css';
import { useState, useEffect } from "react";

//firebase
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const CheckAttend = () => {
  //state
  const [classes, setClasses] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [selectedClassId, setSelectedClassId] = useState(null);

  //DBから出席情報呼び出す
  const getAttendanceData = async (classId) => {
    try {
      //attendanceコレクションからデータ取得
      const attendanceCollection = collection(db, "attendance");
      //クエリ　class_idフィールドの値がclassIdと一致するものだけとってくる
      const attendanceQuery = query(attendanceCollection, where("class_id", "==", classId));
      const attendanceSnapshot = await getDocs(attendanceQuery);
      const attendanceList = attendanceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      //return data
      return attendanceList;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  //user id
  const getUserByUid = async (uid) => {
    try {
      //userコレクションからデータ取得
      const userCollection = collection(db, "user");
      //クエリ　uidフィールドの値がuidと一致するものだけとってくる
      const userQuery = query(userCollection, where("uid", "==", uid));
      const userSnapshot = await getDocs(userQuery);
      const userList = userSnapshot.docs.map(doc => doc.data());
      return userList.length > 0 ? userList[0] : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  //DBからクラス名持ってくる
  const getClassName = async () => {
    try {
      //classコレクションからデータ取得
      const classCollection = collection(db, "class");
      //クエリ
      const classQuery = query(classCollection);
      const classSnapshot = await getDocs(classQuery);
      const classList = classSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return classList;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const fetchUserNames = async (attendanceList) => {
    const userMapTemp = {};
    for (const attendance of attendanceList) {
      if (!userMapTemp[attendance.student_uid]) {
        const userData = await getUserByUid(attendance.student_uid);
        userMapTemp[attendance.student_uid] = userData ? userData.name : "Unknown";
      }
    }
    setUserMap(userMapTemp);
  };

  const fetchAttendanceData = async (classId) => {
    const data = await getAttendanceData(classId);
    setAttendanceData(data);
    await fetchUserNames(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const classesData = await getClassName();
      setClasses(classesData);
      if (classesData.length > 0) {
        setSelectedClassId(classesData[0].id);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      fetchAttendanceData(selectedClassId);
    }
  }, [selectedClassId]);

  return (
    <div className={s.container}>
      <p className={s.h1}>出席状況を確認する</p>

      {/*DBから授業名を持ってくる*/}
      <select
        className={s.select}
        value={selectedClassId || ""}
        onChange={(e) => setSelectedClassId(e.target.value)}
      >
        {classes.map((cls) => (
          <option key={cls.id} value={cls.id}>{cls.className}</option>
        ))}
      </select>

      <div className={s.tableContainer}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>日付</th>
              <th>学籍番号</th>
              <th>名前</th>
              <th>ステータス</th>
            </tr>
          </thead>

          {/*DBから出席状況持ってくる*/}
          <tbody>
            {attendanceData.map((attendance) => (
              <tr key={attendance.id}>
                <td>{new Date(attendance.date.seconds * 1000).toLocaleString()}</td>
                <td>{attendance.student_uid}</td>
                <td>{userMap[attendance.student_uid] || "Loading..."}</td>
                <td>{attendance.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.returnButton}>
        <Link href="/teacher">
          <button>TOPに戻る</button>
        </Link>
      </div>
    </div>
  );
};

export default CheckAttend;
