import s from './page.module.css';
import Link from "next/link";

const Test = () => {
  return (
    <>
      <p className={s.h1}>教師用TOP</p>
      <div className={s.buttonContainer}>
          <Link href="/check_attend">
              <button className={`${s.button} ${s.buttonA}`}>出席確認</button>
          </Link>
          <Link href="/StudentRegister">
            <button className={`${s.button} ${s.buttonB}`}>生徒登録</button>
          </Link>
      </div>
    </>
  );
};

export default Test;
