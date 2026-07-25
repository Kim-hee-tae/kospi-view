import axios from "axios";
import { config } from "../../config/config";

const BASE_URL = "https://openapi.koreainvestment.com:9443";

export async function getAccessToken() {
  const response = await axios.post(
    `${BASE_URL}/oauth2/tokenP`,
    {
      grant_type: "client_credentials",
      appkey: config.APP_KEY,
      appsecret: config.APP_SECRET
    },
    {
      headers: {
        "content-type": "application/json"
      }
    }
  );

  return response.data;
}