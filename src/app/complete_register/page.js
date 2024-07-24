import s from './page.module.css';
import Link from "next/link";

const Test = () => {
  return (
    <>
      <p className={s.h1}>登録しました</p>
      <div className={s.buttonContainer}>
          <Link href="/StudentRegister">
            <button className={`${s.button} ${s.buttonA}`}>登録画面に戻る</button>
          </Link>
          <Link href="/teacher">
            <button className={`${s.button} ${s.buttonB}`}> TOPに戻る　</button>
          </Link>
      </div>
    </>
  );
};

export default Test;
