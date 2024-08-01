'use client';

import styles from './page.module.css'
import Link from "next/link";

import React,{useState} from "react";
import {useRouter} from "next/navigation";

import { db } from "@/app/firebase";
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';

const Class = () => {
    // useRouter
    const router = useRouter();

    // state
    const [className, setClassName] = useState('');

    const addClass = async (ev) => {
        ev.preventDefault();

        // バリデーション: not null
        if (!className) {
        alert('授業名を入力してください');
        return;
        }
        try {
            //firebaseにクラスを登録
            const data = await addDoc(collection(db,'class'), {
                className
            });

            // 自動生成されたIDを取得
            const id = data.id;

            // 自動生成されたIDを含むデータでFirestoreを更新
            await setDoc(doc(db, 'class', id), {
                className,
                id // 自動生成されたIDを含める
            });

            //set state
            setClassName('')

            //画面遷移
            alert("授業を登録しました")
            console.log("成功", data)

        }catch (e) {
            alert(e)
           console.log("エラーでてます:", e)
        }
    }

    return(
        <>
            <form className={styles.container}>
            <h1>授業を登録する</h1>
            <div className={styles.enlarge}>
                <table className={styles.table}>
                    <tbody>
                    <tr>
                        <td className={`${styles.label} ${styles.labelOrange}`}>授業名:</td>
                        <td className={styles.valueOrange}>
                            <input type="text" className={styles.input} placeholder="授業名" value={className} onChange={(ev) => setClassName(ev.target.value)}/>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
            <div className={styles.buttonContainer}>
                <button type="submit" className={`${styles.button} ${styles.buttonA}`} onClick={addClass} >登録する</button>
                <Link href="/teacher">
                    <button className={`${styles.button} ${styles.buttonB}`}> TOPに戻る</button>
                </Link>
            </div>
        </form>
        </>
    )
}

export default Class