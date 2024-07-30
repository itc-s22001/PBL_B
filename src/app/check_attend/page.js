"use client";

import Link from "next/link";
import s from './page.module.css';
import {useState, useEffect} from "react";

//firebase
import {db} from "../firebase";
import {collection, query, where, getDocs} from "firebase/firestore";

const CheckAttend = () => {
  //state
  const [attendanceData, setAttendanceData] = useState([]);
  const [student_uid, setStudentUid] = useState('');
  const [class_id, setClassId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  //DBから出席情報呼び出す
  const getAttendanceData = async () => {
    try {
    const querySnapshot = await getDocs(collection(db, "attendance"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      setStudentUid(data.student_uid);
      setClassId(data.class_id);
      setDate(data.date);
      setStatus(data.status);

      //console
      console.log(`student_uid: ${data.student_uid}, class_id: ${data.class_id}, date: ${data.date}, status: ${data.status}`);

    })}catch (e) {
      console.log(e)
    };
  }

  //
  const fetchData = async () => {
    try {
      const classQuery = query(collection(db, "class"), where("id", "==", "UJxHrzU9mWMirirlq65O"));
      const classSnapshot = await getDocs(classQuery);

      if (!classSnapshot.empty) {
        const attendanceQuery = query(collection(db, "attendance"), where("class_id", "==", "UJxHrzU9mWMirirlq65O"));
        const attendanceSnapshot = await getDocs(attendanceQuery);
        const attendanceList = attendanceSnapshot.docs.map(doc => doc.data());

        setAttendanceData(attendanceList);  // 取得したデータを状態にセット
      } else {
        console.log("No class document found.");
      }

    } catch (e) {
     console.log(e)
    }
    };




  useEffect(() => {
    getAttendanceData();
    // console.log(attendanceData)
    // fetchData();
  }, []);

  return (
    <div className={s.container}>
      <p className={s.h1}>出席状況を確認する</p>
      <select className={s.select}>
        <option>PBL</option>
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
          <tbody>
          <tr>
            <td>2024/07/15 9:30:33</td>
              <td>s00000</td>
              <td>アイカレ太郎</td>
              <td>出席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:34</td>
              <td>s00001</td>
              <td>アイカレ花子</td>
              <td>欠席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:33</td>
              <td>s00000</td>
              <td>アイカレ太郎</td>
              <td>出席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:34</td>
              <td>s00001</td>
              <td>アイカレ花子</td>
              <td>欠席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:33</td>
              <td>s00000</td>
              <td>アイカレ太郎</td>
              <td>出席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:34</td>
              <td>s00001</td>
              <td>アイカレ花子</td>
              <td>欠席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:33</td>
              <td>s00000</td>
              <td>アイカレ太郎</td>
              <td>出席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:34</td>
              <td>s00001</td>
              <td>アイカレ花子</td>
              <td>欠席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:33</td>
              <td>s00000</td>
              <td>アイカレ太郎</td>
              <td>出席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:34</td>
              <td>s00001</td>
              <td>アイカレ花子</td>
              <td>欠席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:33</td>
              <td>s00000</td>
              <td>アイカレ太郎</td>
              <td>出席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:34</td>
              <td>s00001</td>
              <td>アイカレ花子</td>
              <td>欠席</td>
            </tr>
            {/* Add more rows as needed */}
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
