"use client";

import React, {useEffect, useState} from 'react';
import s from './page.module.css';
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "@/app/firebase";


const StudentsLogin = () => {
	// ここに3年生が色々書きます
	// コメントアウト
  //state
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);

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

  // 初期データを取得
  useEffect(() => {
    const fetchData = async () => {
      const classesData = await getClassName();
      setClasses(classesData);
      if (classesData.length > 0) {
        setSelectedClassId(classesData[0].id); // 初期クラスIDを設定
      }
    };
    fetchData();
  }, []);

	return (
		<>
			<div className={s.inputControlNumber}>
				<label htmlFor="FirstName" className="form-label required">学籍番号:</label>
			</div>

			<div className={s.inputControlName}>
			    <labal htmlFor="FirstName" className="form-label required">名前:</labal>
			</div>

            <div className={s.inputControlClassContainer}>
                <div className={s.inputControlClass}>
                    <label htmlFor="Class" className="form-label required">授業:</label>
                </div>
                <select className={s.dropdown} id="Class" value={selectedClassId || ""} onChange={(e) => setSelectedClassId(e.target.value)}>
                    {classes.map((cls) => (<option key={cls.id} value={cls.id}>{cls.className}</option>))}
                </select>
            </div>

			<div>
				<p className={s.buttonContainer}>
					<button className={`${s.button} ${s.buttonA}`}>出席</button>
                    <button className={`${s.button} ${s.buttonA}`}>欠席</button>

				</p>
			</div>
			</>
			);
			};

// 名前付きエクスポート
export default StudentsLogin