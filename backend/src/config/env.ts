import dotenv from "dotenv";
import fs from "fs";

const LOCAL_ENV = "C:/key/kis.env";

if (process.env.RENDER) {
  console.log("▶ Render 환경");
  dotenv.config();
} else {
  if (fs.existsSync(LOCAL_ENV)) {
    console.log("▶ Local ENV :", LOCAL_ENV);
    dotenv.config({ path: LOCAL_ENV });
  } else {
    console.log("▶ .env 없음");
    dotenv.config();
  }
}