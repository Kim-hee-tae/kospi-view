import { Router } from "express";
import { getAccessToken } from "../api/kis/auth";

const router = Router();

router.get("/token", async (req, res) => {
  try {
    const token = await getAccessToken();

    res.json({
      success: true,
      data: token
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