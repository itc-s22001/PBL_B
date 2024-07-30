import React from 'react';
import s from './page.module.css';

const StudentsLogin = () => {
    // 出席ボタンが押されたときの処理
    const handleAttendanceClick = () => {
        console.log("出席ボタンが押されました");
        window.location.href = './complete_register'; // 相対パスで移動
    };

    // 欠席ボタンが押されたときの処理
    const handleAbsenceClick = () => {
        console.log("欠席ボタンが押されました");
        window.location.href = './complete_register'; // 相対パスで移動
    };

    return (
        <>
            <div className={s.inputControlNumber}>
                <label htmlFor="FirstName" className="form-label required">学籍番号:</label>
            </div>

            <div className={s.inputControlName}>
                <label htmlFor="FirstName" className="form-label required">名前:</label>
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

            <div className={s.buttonContainer}>
                <button className={`${s.button} ${s.buttonA}`} onClick={handleAttendanceClick}>出席</button>
                <button className={`${s.button} ${s.buttonA}`} onClick={handleAbsenceClick}>欠席</button>
            </div>
        </>
    );
};

// 名前付きエクスポート
export default StudentsLogin;
