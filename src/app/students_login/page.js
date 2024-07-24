import React from 'react';
import s from './page.module.css';

const StudentsLogin = () => {
	// ここに3年生が色々書きます
	// コメントアウト

	return (
		<>
			<div className={s.inputControlEmail}>
				<label htmlFor="FirstName" className="form-label required">メールアドレス</label>
				<input type="text"  placeholder="メールアドレスを入力してください(半角英数字)" className={s.Forminput}/>
				<div className="error"></div>
			</div>

			<div className={s.inputControlPassword}>
			<labal htmlFor="FirstName" className="form-label required">　パスワード　</labal>
			<input type="text" placeholder="パスワードを入力してください(半角英数字)" className={s.Forminput}/>
			</div>

			<div>
				<p className={s.buttonContainer}>
					<button className={`${s.button} ${s.buttonA}`}>ログイン</button>
				</p>
			</div>
			</>
			);
			};

// 名前付きエクスポート
export default StudentsLogin

