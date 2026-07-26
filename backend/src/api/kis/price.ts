import axios from "axios";
import { getValidToken } from "../../auth/tokenManager";
import { config } from "../../config/config";

const BASE_URL = "https://openapi.koreainvestment.com:9443";

export async function getCurrentPrice(code: string) {

  const token = await getValidToken();

  const response = await axios.get(
    `${BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-price`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        appkey: config.APP_KEY,
        appsecret: config.APP_SECRET,
        tr_id: "FHKST01010100"
      },
      params: {
        fid_cond_mrkt_div_code: "J",
        fid_input_iscd: code
      }
    }
  );

  return response.data;
}