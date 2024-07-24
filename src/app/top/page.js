import React from 'react';
import s from './page.module.css';

const Top = () => {
	// ここに3年生が色々書きます
	// コメントアウト

	return (
		<>
			<p className={s.h1}>出席完了しました</p>
		<div>
			<p className={s.buttonContainer}>
				<button className={`${s.button} ${s.buttonA}`}>出席画面に戻る</button>
			</p>
		</div>
	</>
	);
};

// 名前付きエクスポート
export default Top

