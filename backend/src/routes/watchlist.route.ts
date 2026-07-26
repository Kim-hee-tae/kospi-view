import { Router } from "express";
import { getWatchList } from "../services/watchlist.service";

const router = Router();

router.get("/watchlist", async (req, res) => {
  try {

    const data = await getWatchList();

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