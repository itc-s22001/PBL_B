import s from './page.module.css';

const Test = () => {
    return (
      <>
        <div className={s.container}>
          <p className={s.h1}>学籍番号：</p>
          <input type="text" value="123456" readOnly className={s.readOnlyInput} />
        </div>
        <div className={s.container}>
          <p className={s.h2}>名前：</p>
          <input type="text" value="山田太郎" readOnly className={s.readOnlyInput} />
        </div>
        <p className={s.h2}>授業：</p>
        <div className={s.buttonContainer}>
          <button className={`${s.button} ${s.buttonA}`}>出席</button>
          <button className={`${s.button} ${s.buttonB}`}>欠席</button>
        </div>
      </>
    )
}


export default Test;