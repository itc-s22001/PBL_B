"use client";

import s from './page.module.css';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import {getFirestore, doc, getDoc, query, collection, where, getDocs} from 'firebase/firestore';
import { db, auth } from '@/app/firebase';

const Teacher = () => {
  //state
  const [userId, setUserId] = useState(null);
  const [isTeacher, setIsTeacher] = useState(null);
  const router = useRouter();

  const getUserId = async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db,'user',user.email))
      return userDoc.id;
    }
  }

  //user情報をemailからとってくる
  const getUserByEmail = async (email) => {
    try {
      //userコレクションからデータ取得
      const userCollection = collection(db, "user");
      //クエリ　uidフィールドの値がuidと一致するものだけとってくる
      const userQuery = query(userCollection, where("email", "==", email));
      const userSnapshot = await getDocs(userQuery);
      const userList = userSnapshot.docs.map(doc => doc.data());
      console.log("userList:", userList)
      return userList.length > 0 ? userList[0] : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     const id = await getUserId(user);
  //     setUserId(id);
  // });
  //
  //   useEffect(() => {
  //     unsubscribe
  //     getUserByEmail(userId)
  //   })
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const id = await getUserId(user);
      setUserId(id);
    });

    return () => unsubscribe();
  }, []);

    useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const user = await getUserByEmail(userId);
        if (user) {
          setIsTeacher(user.isTeacher);
          if (!user.isTeacher) {
            router.push('/');
          }
        }
      }
    };

    fetchUserData();
  }, [userId, router]);

  if (isTeacher === null) {
    return <div>Loading...</div>; // ローディング状態を表示
  }

  return (
    <>
      <p className={s.h1}>教師用TOP</p>
      <div className={s.buttonContainer}>
        <Link href="/check_attend">
          <button className={`${s.button} ${s.buttonA}`}>出席確認</button>
        </Link>
        <div className={s.register}>
          <Link href="/StudentRegister">
            <button className={`${s.button} ${s.buttonB}`}>生徒登録</button>
          </Link>
          <Link href="/Class">
            <button className={`${s.button} ${s.buttonC}`}>授業登録</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Teacher;
