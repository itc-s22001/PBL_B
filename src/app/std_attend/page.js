import React from 'react';
import Link from 'next/link'
import s from './page.module.css';

const std_attend = () => {
	// ここに3年生が色々書きます
	// コメントアウト

	return (
		<>
			<div className={s.inputControlNumber}>
				<label htmlFor="FirstName" className="form-label required">学籍番号:</label>
			</div>

			<div className={s.inputControlName}>
			    <labal htmlFor="FirstName" className="form-label required">名前:</labal>
			</div>

            <div className={s.inputControlClassContainer}>
                <div className={s.inputControlClass}>
                    <label htmlFor="Class" className="form-label required">授業:</label>
                </div>
                <select className={s.dropdown} id="Class">
                    <option value="class1">PBL</option>
                    <option value="class2">Java</option>
                    <option value="class3">Secure Program</option>
                </select>
            </div>

			<div>
				<p className={s.buttonContainer}>
					<Link href="/complete_attend" className={`${s.button} ${s.buttonA}`}>
						出席
					</Link>
					<Link href="/complete_attend" className={`${s.button} ${s.buttonA}`}>
						欠席
					</Link>
				</p>
			</div>
		</>
	);
};

// 名前付きエクスポート
export default std_attend