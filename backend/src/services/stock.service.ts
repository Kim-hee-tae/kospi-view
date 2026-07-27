import { getCurrentPrice } from "../api/kis/price";

export async function getStockDetail(code: string) {

  const result = await getCurrentPrice(code);

  const output = result.output;
console.log("===== OUTPUT =====");
console.log(output);
console.log("==================");
  return {
    code: output.stck_shrn_iscd,
    name: output.hts_kor_isnm,
    price: Number(output.stck_prpr),
    change: Number(output.prdy_vrss),
    rate: Number(output.prdy_ctrt),

    per: Number(output.per),
    pbr: Number(output.pbr),
    eps: Number(output.eps),
    bps: Number(output.bps),

    volume: Number(output.acml_vol),

    marketCap: Number(output.hts_avls)
  };

}