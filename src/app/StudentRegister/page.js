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

// 仮の学生データ（実際はデータベースから取得する）
// const students = [
//     { id: 1, student_id: '123456', name: '田中太郎', email: 'tanaka@example.com', password: 'password123' }//例なので消して大丈夫です。
    // データベースから取得する場合はここに実際のデータ取得コードを記述
// ];

const Home = () => {
    // useRouter
    const router = useRouter();

    // state
    const [student_id, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 生徒をDBに登録
    const addStudent = async (ev) => {
        ev.preventDefault();

        // バリデーション: not null
        if (!student_id) {
        alert('学籍番号を入力してください');
        return;
        }
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
            });

            //set state
            setStudentId('');
            setName('')
            setEmail('');
            setPassword('');

            //画面遷移
            router.push('/complete_register');

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
        <form className={styles.container}>
            <h1>生徒を登録する</h1>
            <div className={styles.enlarge}>
                <table className={styles.table}>
                    <tbody>
                    <tr>
                        <td className={`${styles.label} ${styles.labelOrange}`}>学籍番号:</td>
                        <td className={styles.valueOrange}>
                            <input type="text" className={styles.input} placeholder="学籍番号" value={student_id} onChange={(ev) => setStudentId(ev.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelOrange}>名前:</td>
                        <td className={styles.valueOrange}>
                            <input type="text" className={styles.input} placeholder="名前" value={name} onChange={(ev) => setName(ev.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelOrange}>メールアドレス:</td>
                        <td className={styles.valueOrange}>
                            <input type="email" className={styles.input} placeholder="メールアドレス" value={email} onChange={(ev) => setEmail(ev.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelOrange}>パスワード:</td>
                        <td className={styles.valueOrange}>
                            <input type="password" className={styles.input} placeholder="パスワード" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.buttonContainer}>
                    <button type="submit" className={`${styles.button} ${styles.buttonA}`} onClick={addStudent}>登録する</button>
                <Link href="/teacher">
                    <button className={`${styles.button} ${styles.buttonB}`}> TOPに戻る</button>
                </Link>
            </div>
        </form>
        </>
    );
}

export default Home;
