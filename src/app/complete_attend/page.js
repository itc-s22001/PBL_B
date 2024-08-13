import React from 'react';
import Link from 'next/link';
import s from './page.module.css';

const Top = () => {
	return (
		<>
			<p className={s.h1}>完了しました</p>
			<div>
				<p className={s.buttonContainer}>
					<Link href="/students_login">
						<button className={`${s.button} ${s.buttonA}`}>TOPに戻る</button>
					</Link>
				</p>
			</div>
		</>
	);
};

// 名前付きエクスポート
export default Top;
