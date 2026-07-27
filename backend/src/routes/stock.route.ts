import { Router } from "express";
import { getStockDetail } from "../services/stock.service";

const router = Router();

router.get("/stock/:code", async (req, res) => {

  try {

    const data = await getStockDetail(req.params.code);

    res.json({
      success: true,
      data
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