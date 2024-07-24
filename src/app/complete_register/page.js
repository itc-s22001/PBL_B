import s from './page.module.css';

const Test = () => {
  return (
    <>
      <p className={s.h1}>登録しました</p>
      <div className={s.buttonContainer}>
        <button className={`${s.button} ${s.buttonA}`}>登録画面に戻る</button>
        <button className={`${s.button} ${s.buttonB}`}> TOPに戻る　</button>
      </div>
    </>
  );
};

export default Test;
