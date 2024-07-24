// import s from './page.module.css';

// const CheckAttend = () => {
//   return (
//     <div className={s.container}>
//       <p className={s.h1}>出席状況を確認する</p>
//       <select className={s.select}>
//         <option>PBL</option>
//       </select>
//       <table className={s.table}>
//         <thead>
//           <tr>
//             <th>日付</th>
//             <th>学籍番号</th>
//             <th>名前</th>
//             <th>ステータス</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>2024/07/15 9:30:33</td>
//             <td>s00000</td>
//             <td>アイカレ太郎</td>
//             <td>出席</td>
//           </tr>
//           <tr>
//             <td>2024/07/15 9:30:34</td>
//             <td>s00001</td>
//             <td>アイカレ花子</td>
//             <td>欠席</td>
//           </tr>
//         </tbody>
//       </table>
//       <div className={s.returnButton}>
//         <button>TOPに戻る</button>
//       </div>
//     </div>
//   );
// };

// export default CheckAttend;

import Link from "next/link";
import s from './page.module.css';

const Test = () => {
  return (
    <div className={s.container}>
      <p className={s.h1}>出席状況を確認する</p>
      <select className={s.select}>
        <option>PBL</option>
      </select>
      <div className={s.tableContainer}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>日付</th>
              <th>学籍番号</th>
              <th>名前</th>
              <th>ステータス</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024/07/15 9:30:33</td>
              <td>s00000</td>
              <td>アイカレ太郎</td>
              <td>出席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:34</td>
              <td>s00001</td>
              <td>アイカレ花子</td>
              <td>欠席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:33</td>
              <td>s00000</td>
              <td>アイカレ太郎</td>
              <td>出席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:34</td>
              <td>s00001</td>
              <td>アイカレ花子</td>
              <td>欠席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:33</td>
              <td>s00000</td>
              <td>アイカレ太郎</td>
              <td>出席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:34</td>
              <td>s00001</td>
              <td>アイカレ花子</td>
              <td>欠席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:33</td>
              <td>s00000</td>
              <td>アイカレ太郎</td>
              <td>出席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:34</td>
              <td>s00001</td>
              <td>アイカレ花子</td>
              <td>欠席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:33</td>
              <td>s00000</td>
              <td>アイカレ太郎</td>
              <td>出席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:34</td>
              <td>s00001</td>
              <td>アイカレ花子</td>
              <td>欠席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:33</td>
              <td>s00000</td>
              <td>アイカレ太郎</td>
              <td>出席</td>
            </tr>
            <tr>
              <td>2024/07/15 9:30:34</td>
              <td>s00001</td>
              <td>アイカレ花子</td>
              <td>欠席</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
        <div className={s.returnButton}>
          <Link href="/teacher">
            <button>TOPに戻る</button>
          </Link>
        </div>
    </div>
  );
};

export default Test;
