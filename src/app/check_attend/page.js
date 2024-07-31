"use client";

import Link from "next/link";
import s from './page.module.css';
import {useState, useEffect} from "react";

//firebase
import {db} from "../firebase";
import {collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";

const CheckAttend = () => {
  const PBL_ID = "UJxHrzU9mWMirirlq65O"

  //state
  const [classes, setClasses] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  //DBから出席情報呼び出す
  const getAttendanceData = async () => {
    try {
      //attendanceコレクションからデータ取得
      const attendanceCollection = collection(db, "attendance");
      //クエリ
      const attendanceQuery = query(attendanceCollection);
      const attendanceSnapshot = await getDocs(attendanceQuery);
      const attendanceList = attendanceSnapshot.docs.map(doc => doc.data());

      //return data
      return attendanceList;
    }catch (e) {
      console.log(e)
    }
  }

  //user id
  const getUserByUid = async (uid) => {
    try {
      //userコレクションからデータ取得
      const userCollection = collection(db, "users");
      const userQuery = query(userCollection, where("uid", "==", uid));
      const userSnapshot = await getDocs(userQuery);

      // ユーザー情報を取得
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return userList.length > 0 ? userList[0] : null; // ユーザーが存在しない場合はnullを返す
    }catch (e) {
      console.log(e);
      return null;
    }
  }

  //DBからクラス名持ってくる
  const getClassName = async () => {
    try {
      //classコレクションからデータ取得
      const classCollection = collection(db, "class");
      //クエリ
      const classQuery = query(classCollection);
      const classSnapshot = await getDocs(classQuery);
      const classList = classSnapshot.docs.map(doc => doc.data());
      // dataをreturn
      return classList;
    }catch (e) {
      console.log(e);
    }
  }

  const fetchAttendanceData = async () => {
    try {
      // attendanceコレクションからデータを取得
      const attendanceCollection = collection(db, "attendance");
      // class_idがPBLのやつ
      const attendanceQuery = query(attendanceCollection, where("class_id", "==", PBL_ID));
      const attendanceSnapshot = await getDocs(attendanceQuery);

      // 結果を処理
      attendanceSnapshot.forEach((doc) => {
        console.log("attendance data:", doc.data())
      });
    } catch (e) {
      console.log(e);
    }
  }

  //use effect
  useEffect(() => {
    getAttendanceData().then(
        data => {
          console.log("getAttendanceData: ", data);
          setAttendanceData(data);
        }
    )
    getClassName().then(
        data => {
          console.log("getClassName: ", data);
          setClasses(data);
        }
    );
    // fetchAttendanceData();
  }, []);

  return (
    <div className={s.container}>
      <p className={s.h1}>出席状況を確認する</p>

      {/* DBから授業名を持ってくる */}
      <select className={s.select}>
        {classes.map((classes) => (
            <option key={classes.id} value={classes.className}>{classes.className}</option>
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
          <tbody>

          {/*this*/}
           {attendanceData.map((attendance) => (
              <tr key={attendance.id}>
                <td>{new Date(attendance.date.seconds * 1000).toLocaleDateString()}</td>
                <td>{attendance.student_uid}</td>
                <td>{/* 名前フィールド */}</td>
                <td>{attendance.status}</td>
              </tr>
            ))}

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
