import { Router } from "express";
import { getChartData } from "../services/chart.service";

const router = Router();

router.get("/chart/:code", async (req, res) => {

    try {

        const result = await getChartData(req.params.code);

        res.json({
            success: true,
            data: result.output2
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "차트 조회 실패"
        });

    }

});

export default router;