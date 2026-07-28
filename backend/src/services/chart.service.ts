import axios from "axios";
import { getValidToken } from "../auth/tokenManager";
import { config } from "../config/config";

const BASE_URL = "https://openapi.koreainvestment.com:9443";

export async function getChartData(code: string) {

    const token = await getValidToken();

    const response = await axios.get(
        `${BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice`,
        {
            headers: {
                authorization: `Bearer ${token}`,
                appkey: config.APP_KEY,
                appsecret: config.APP_SECRET,
                tr_id: "FHKST03010100"
            },
            params: {
                fid_cond_mrkt_div_code: "J",
                fid_input_iscd: code,
                fid_input_date_1: "20240101",
                fid_input_date_2: "20991231",
                fid_period_div_code: "D",
                fid_org_adj_prc: "1"
            }
        }
    );

    return response.data;
}