import { Router } from "express";
import { getCurrentPrice } from "../api/kis/price";

const router = Router();

router.get("/price", async (req, res) => {
  try {

    const code = String(req.query.code || "");

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "code 파라미터가 필요합니다."
      });
    }

    const result = await getCurrentPrice(code);

    const output = result.output;

    res.json({
      success: true,
      data: {
        code: output.stck_shrn_iscd,
        name: output.rprs_mrkt_kor_name,
        price: Number(output.stck_prpr),
        change: Number(output.prdy_vrss),
        rate: Number(output.prdy_ctrt),
        open: Number(output.stck_oprc),
        high: Number(output.stck_hgpr),
        low: Number(output.stck_lwpr),
        volume: Number(output.acml_vol),
        amount: Number(output.acml_tr_pbmn),
        per: Number(output.per),
        pbr: Number(output.pbr),
        eps: Number(output.eps),
        bps: Number(output.bps)
      }
    });

  } catch (err: any) {

    console.error(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: err.response?.data || err.message
    });

  }
});

export default router;