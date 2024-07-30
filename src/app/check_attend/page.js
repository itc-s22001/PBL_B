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
  const [className, setClassName] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  //DBから出席情報呼び出す
  const getAttendanceData = async () => {
    try {
    const querySnapshot = await getDocs(collection(db, "attendance"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
    })}catch (e) {
      console.log(e)
    };
  }

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
      console.log(e)
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
    }catch (e) {
     console.log(e);
    }


      // const attendanceList = await Promise.all(attendanceSnapshot.docs.map(async (docSnapshot) => {
      //   const data = docSnapshot.data();
      //   const studentUid = data.student_uid;
      //
      //   // userコレクションから対応するユーザーのnameを取得
      //   const userRef = doc(db, "user", studentUid);
      //   const user = await getDoc(userRef);
      //
      //   if (user.exists()) {
      //     const userData = user.data();
      //     return {
      //       ...data,
      //       student_name: userData.name,  // userコレクションのnameフィールドを追加
      //     };
      //   } else {
      //     return {
      //       ...data,
      //       student_name: "Unknown",  // ユーザーが存在しない場合の処理
      //     };
      //   }
      // }));
      // console.log("username", user.student_name)
      // setAttendanceData(attendanceList);
  };


  useEffect(() => {
    getClassName().then(
        data => {
          console.log(data)
          setClasses(data)
        }
    );
    // fetchAttendanceData();
  }, []);

  return (
    <div className={s.container}>
      <p className={s.h1}>出席状況を確認する</p>
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
