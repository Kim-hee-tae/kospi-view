export const config = {
  HOST: process.env.HOST || "0.0.0.0",
  PORT: Number(process.env.PORT || 3000),
  APP_KEY: process.env.KIS_APP_KEY || "",
  APP_SECRET: process.env.KIS_APP_SECRET || ""
};