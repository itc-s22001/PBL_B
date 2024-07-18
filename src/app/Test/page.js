"use client";

// backend用
import axios from "axios";

import s from './page.module.css'
import Sub from './sub.js'

const Test = () => {

	{/*ここに3年生が色々書きます*/}

	const getData = async ()=> {
		try {
			const response = await axios.get('/api');
			console.log(response)
		}catch (e) {
			console.log(e)
		}
	}

	return(
		<>
			<p className={s.h1}>test</p>
			<Sub />
			<button onClick={getData}>BUTTON</button>
		</>
	)
}
export default Test
