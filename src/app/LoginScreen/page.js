'use client'

import { useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useRouter } from "next/navigation"; // useRouterの代わりにuseRouterをインポート
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import db from "../firebase"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            router.push(`/`); // ログイン成功後に遷移する
        } catch (error) {
            console.error("エラーです", error);
        }
        // try {
        //     // グーグルでサインイン
        //     await signInWithPopup(auth, provider);
        //     router.push(`/`); // ログイン成功後に遷移する
        // } catch (error) {
        //     console.error("エラーです", error);
        // }
    };

    return (
        // <div>
        //     {user ? (
        //         <>
        //             <div>
        //                 <img src={user.photoURL} alt="" />
        //             </div>
        //         </>
        //     ) : (
        //         // <div onClick={() => router.push('/')}>
        //             <button onClick={handleLogin}>グーグルでサインイン</button>
        //         // </div>
        //     )}
        // </div>
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
