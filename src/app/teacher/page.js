"use client";

import s from './page.module.css';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

const Teacher = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    const checkUser = async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'user', user.uid));
        if (userDoc.exists() && userDoc.data().isTeacher) {
          setLoading(false); // ロード終了
        } else {
          setLoading(false);
          await router.replace('/'); // 権限がない場合はリダイレクト
        }
      } else {
        // setLoading(false);
        // await router.replace('/'); // ログインしていない場合はリダイレクト
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      checkUser(user);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
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
