'use client'

import React from 'react';
import s from './page.module.css';
import { useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { useRouter } from "next/navigation"; // useRouterの代わりにuseRouterをインポート
import { getAuth, signInWithEmailAndPassword, } from "firebase/auth"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";


const StudentsLogin = () => {
	// ここに3年生が色々書きます
	// コメントアウト
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const [user, setUser] = useState(null);
	const auth = getAuth();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				fetchUserData(currentUser.email);
			}
		});
		return () => unsubscribe();
	}, []);

	// useEffect(() => {
	//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
	//         setUser(currentUser);
	//     });
	//     return () => unsubscribe();
	// }, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		// const auth = getAuth();
		//メールとパスワードでログイン
		try {
			await signInWithEmailAndPassword(auth, email, password)

			// データベースからデータの取得
			const querySnapshot = await getDocs(collection(db, "user"));
			const tasks = querySnapshot.docs.map((doc) => doc.data());
			console.log(tasks[0].email)

			if (email === "taro@test.com") {
				router.push(`/teacher`) //教員でログイン時の遷移先
			} else {
				router.push(`/complete_attend`); // ログイン成功後に遷移する
			}
		} catch (error) {
			console.error("エラーです", error);
			alert('メールかパスワードが間違っています');
		}
		// try {
		//     // グーグルでサインイン
		//     await signInWithPopup(auth, provider);
		//     router.push(`/`); // ログイン成功後に遷移する
		// } catch (error) {
		//     console.error("エラーです", error);
		// }
	};
	const fetchUserData = async (email) => {
		const db = getFirestore();
		const q = query(collection(db, "users"), where("email", "==", email));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setUser(doc.data());
		});
	}


	return (
		<>
			<form onSubmit={handleLogin}>
				<div className={s.inputControlEmail}>
					<label htmlFor="FirstName" className="form-label required">メールアドレス</label>
					<input type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="メールアドレスを入力してください(半角英数字)"
						className={s.Forminput} />
					<div className="error"></div>
				</div>

				<div className={s.inputControlPassword}>
					<labal htmlFor="FirstName" className="form-label required">　パスワード　</labal>
					<input type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="パスワードを入力してください(半角英数字)"
						className={s.Forminput} />
				</div>

				<div>
					<p className={s.buttonContainer}>
						<button className={`${s.button} ${s.buttonA}`} type="submit">ログイン</button>
					</p>
				</div>
			</form>
			{user && (
				<div>
					<h1>ユーザー情報</h1>
					<p>ID: {user.id}</p>
					<p>名前: {user.name}</p>
					<p>メール: {user.email}</p>
				</div>
			)}
		</>
	);
};

// 名前付きエクスポート
export default StudentsLogin;

