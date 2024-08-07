'use client'; // クライアントコンポーネントとしてマーク

import s from './page.module.css';
import { useState } from 'react';

const Test = () => {
    const [selectedClass, setSelectedClass] = useState(''); // selectedClass を定義

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    return (
        <div className={s.container}>
            <div className={s.inputControl}>
                <p className={s.inputLabel}>学籍番号：</p>
                <input type="text" value="123456" readOnly className={s.readOnlyInput} />
            </div>
            <div className={s.inputControl}>
                <p className={s.inputLabel}>名前：</p>
                <input type="text" value="山田太郎" readOnly className={s.readOnlyInput} />
            </div>
            <div className={s.inputControl}>
                <p className={s.inputLabel}>授業：</p>
                <select
                    className={s.dropdown}
                    value={selectedClass}
                    onChange={handleClassChange}
                >
                    <option value="">選択してください</option>
                    <option value="PBL">PBL</option>
                    <option value="Java">Java</option>
                    <option value="Secure Program">Secure Program</option>
                </select>
            </div>
            <div className={s.buttonContainer}>
                <button className={`${s.button} ${s.buttonA}`}>出席</button>
                <button className={`${s.button} ${s.buttonB}`}>欠席</button>
            </div>
        </div>
    );
};

export default Test;
