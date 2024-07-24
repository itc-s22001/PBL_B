// pages/index.js
import styles from './page.module.css';
import Link from "next/link";

// 仮の学生データ（実際はデータベースから取得する）
const students = [
    { id: 1, student_id: '123456', name: '田中太郎', email: 'tanaka@example.com', password: 'password123' }//例なので消して大丈夫です。
    // データベースから取得する場合はここに実際のデータ取得コードを記述
];

const Home = () => (
    <div className={styles.container}>
        <h1>生徒を登録する</h1>
        <div className={styles.enlarge}>
            <table className={styles.table}>
                <tbody>
                <tr>
                    <td className={`${styles.label} ${styles.labelOrange}`}>学籍番号:</td>
                    <td className={`${styles.value} ${styles.valueOrange}`}>{students[0].student_id}</td>
                </tr>
                <tr>
                    <td className={styles.labelOrange}>名前:</td>
                    <td className={styles.valueOrange}>{students[0].name}</td>
                </tr>
                <tr>
                    <td className={styles.labelOrange}>メールアドレス:</td>
                    <td className={styles.valueOrange}>{students[0].email}</td>
                </tr>
                <tr>
                    <td className={styles.labelOrange}>パスワード:</td>
                    <td className={styles.valueOrange}>{students[0].password}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div className={styles.buttonContainer}>
            <Link href="/complete_register">
                <button className={`${styles.button} ${styles.buttonA}`}>登録する</button>
            </Link>
            <Link href="/teacher">
                <button className={`${styles.button} ${styles.buttonB}`}> TOPに戻る</button>
            </Link>
        </div>
    </div>
);

export default Home;
