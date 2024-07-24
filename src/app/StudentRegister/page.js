"use client";

// pages/index.js
import styles from './page.module.css';
import Link from "next/link";

// api処理用のimport
import axios from "axios";
import React, {useState,useEffect} from "react";

// 仮の学生データ（実際はデータベースから取得する）
// const students = [
//     { id: 1, student_id: '123456', name: '田中太郎', email: 'tanaka@example.com', password: 'password123' }//例なので消して大丈夫です。
    // データベースから取得する場合はここに実際のデータ取得コードを記述
// ];

const Home = () => {

    // set state
    const [student_id, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //生徒をDBに登録
    const addStudent = async (e) => {
        try {
            const res = await axios.post('/api/StudentRegister', {
                student_id: student_id,
                name: name,
                email: email,
                password: password
            }
            )
            console.log(res.data)
        }catch (e) {
           console.log("エラー出てます: ", e)
        }
    }

    return(
        <>
        <div className={styles.container}>
            <h1>生徒を登録する</h1>
            <div className={styles.enlarge}>
                <table className={styles.table}>
                    <tbody>
                    <tr>
                        <td className={`${styles.label} ${styles.labelOrange}`}>学籍番号:</td>
                        <td className={styles.valueOrange}>
                            <input className={styles.input} placeholder="学籍番号" value={student_id} onChange={(ev) => setStudentId(ev.target.value)}/>
                        </td>
                        {/*<td className={`${styles.value} ${styles.valueOrange}`} >{students[0].student_id}</td>*/}
                    </tr>
                    <tr>
                        <td className={styles.labelOrange}>名前:</td>
                        <td className={styles.valueOrange}>
                            <input className={styles.input} placeholder="名前" value={name} onChange={(ev) => setName(ev.target.value)}/>
                        </td>
                        {/*<td className={styles.valueOrange}>{students[0].name}</td>*/}
                    </tr>
                    <tr>
                        <td className={styles.labelOrange}>メールアドレス:</td>
                        <td className={styles.valueOrange}>
                            <input className={styles.input} placeholder="メールアドレス" value={email} onChange={(ev) => setEmail(ev.target.value)}/>
                        </td>
                        {/*<td className={styles.valueOrange}>{students[0].email}</td>*/}
                    </tr>
                    <tr>
                        <td className={styles.labelOrange}>パスワード:</td>
                        <td className={styles.valueOrange}>
                            <input className={styles.input} placeholder="パスワード" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                        </td>
                        {/*<td className={styles.valueOrange}>{students[0].password}</td>*/}
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.buttonContainer}>
                <Link href="/complete_register">
                    <button className={`${styles.button} ${styles.buttonA}`} onClick={addStudent}>登録する</button>
                </Link>
                <Link href="/teacher">
                    <button className={`${styles.button} ${styles.buttonB}`}> TOPに戻る</button>
                </Link>
            </div>
        </div>
        </>
    );
}

export default Home;
