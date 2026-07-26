import { getCurrentPrice } from "../api/kis/price";
import { watchList } from "../data/watchlist";
import { STOCKS } from "../constants/stocks";


export async function getWatchList() {

  const result = await Promise.all(

    watchList.map(async (code) => {

      const data = await getCurrentPrice(code);

      const output = data.output;

      return {
        code: output.stck_shrn_iscd,
        name: STOCKS[code] ?? code,
        price: Number(output.stck_prpr),
        change: Number(output.prdy_vrss),
        rate: Number(output.prdy_ctrt)
      };

    })

  );

  return result;
}