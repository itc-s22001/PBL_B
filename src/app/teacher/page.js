import s from './page.module.css';

const Test = () => {
  return (
    <>
      <p className={s.h1}>教師用TOP</p>
      <div className={s.buttonContainer}>
        <button className={`${s.button} ${s.buttonA}`}>出席確認</button>
        <button className={`${s.button} ${s.buttonB}`}>生徒登録</button>
      </div>
    </>
  );
};

export default Test;
