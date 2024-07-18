"use client";

// api処理用のimport
import axios from "axios";
import React, {useState,useEffect} from "react";

// return()内部用のimport
import s from './page.module.css'
import Sub from './sub.js'

const Test = () => {

	{/*ここに3年生が色々書きます*/}

	const [msg, setMsg] = useState();
	const [postMsg, setPostMsg] = useState();

	const getData = async ()=> {
		try {
			const res = await axios.get('/api');
			const data = await res.data;
			setMsg(data.msg);
			console.log("data: ", data);
			console.log("data.msg: ", data.msg);
		}catch (e) {
			console.log(e)
		}
	}

	const postData = async () => {
		try {
			const res = await axios.post('/api', {test: "test"});
			const data = await res.data;
			setPostMsg(data.msg)
			console.log("postMsg:", data)
		}catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		//ここの中に設定したメソッドは常に実行される
	}, []);

	return(
		<>
			<h1 className={s.h1}>test</h1>
			<Sub/>

			{/*ボタンをクリックしたら↑で設定したgetData/sendDataが実行される*/}
			<button onClick={getData}>BUTTON</button>
			<button onClick={postData}>SEND</button>

			{/*↑が実行されたらmsg/postMsgがsetされて表示される↓*/}
			<p>{msg}</p>
			<p>{postMsg}</p>
		</>
	)
}

export default Test
