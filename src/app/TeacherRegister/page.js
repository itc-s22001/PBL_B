"use client";

// pages/index.js
import styles from './page.module.css';
import Link from "next/link";

// api処理用のimport
import React, {useState} from "react";
import {useRouter} from "next/navigation";

//firebase
import { auth,db } from "@/app/firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';

const Home = () => {
    // useRouter
    const router = useRouter();

    // state
    const [student_id, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //教師か生徒か
    const [isTeacher, setIsTeacher] = useState(true);

    // 生徒をDBに登録
    const addTeacher = async (ev) => {
        ev.preventDefault();

        // バリデーション: not null
        if (!name) {
            alert('名前を入力してください');
            return;
        }
        if (!email) {
            alert('メールアドレスを入力してください');
            return;
        }
        if (!password) {
            alert('パスワードを入力してください(6文字以上)');
            return;
        }

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            //firebaseにユーザ情報を保存
            const data = await addDoc(collection(db,'user'), {
            uid: user.uid,
            student_id,
            name,
            email,
            //教師か生徒か
            isTeacher
            });

            //set state
            setStudentId('');
            setName('')
            setEmail('');
            setPassword('');
            //教師か生徒か
            setIsTeacher(true)

            alert('登録しました')
            console.log("成功", data)

        }catch (e) {
            //登録できなかったときalertで理由出す
            if (e.code === 'auth/weak-password') {
                alert('パスワードは6文字以上にしてください');
            } if (e.code === 'auth/invalid-email') {
              alert('メールアドレスはexample@example.comの形式で登録してください')
            } if (e.code === 'auth/email-already-in-use') {
              alert('すでに使用されているメールアドレスです')
            } else {
                alert('ユーザー登録に失敗しました: ' + e.message);
            }

           console.log("エラーでてます:", e)
        }
    }

    return(
        <>
            <p className={styles.h1}>教師を登録する</p>
            <form className={styles.container}>
                <div className={styles.enlarge}>
                    <table className={styles.table}>
                        <tbody>
                        <tr>
                            <td className={styles.labelOrange}>名前:</td>
                            <td className={styles.valueOrange}>
                                <input type="text" className={styles.input} placeholder="名前" value={name}
                                       onChange={(ev) => setName(ev.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.labelOrange}>メールアドレス:</td>
                            <td className={styles.valueOrange}>
                                <input type="email" className={styles.input} placeholder="メールアドレス" value={email}
                                       onChange={(ev) => setEmail(ev.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.labelOrange}>パスワード:</td>
                            <td className={styles.valueOrange}>
                                <input type="password" className={styles.input} placeholder="パスワード"
                                       value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={`${styles.button} ${styles.buttonA}`}
                            onClick={addTeacher}>登録する
                    </button>
                </div>
            </form>
        </>
    );
}

export default Home;
