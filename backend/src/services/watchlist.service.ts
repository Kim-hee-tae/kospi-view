import { getCurrentPrice } from "../api/kis/price";

const WATCH_LIST = [
  "005930", // 삼성전자
  "000660", // SK하이닉스
  "035420", // NAVER
  "005380", // 현대차
  "051910"  // LG화학
];

export async function getWatchList() {

  const result = await Promise.all(

    WATCH_LIST.map(async (code) => {

      const data = await getCurrentPrice(code);

      const output = data.output;

      return {
        code: output.stck_shrn_iscd,
        name: output.rprs_mrkt_kor_name,
        price: Number(output.stck_prpr),
        change: Number(output.prdy_vrss),
        rate: Number(output.prdy_ctrt)
      };

    })

  );

  return result;
}