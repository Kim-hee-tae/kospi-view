import "./config/env";
import { config } from "./config/config";
import app from "./app";

const PORT = config.PORT;

app.listen(config.PORT, config.HOST, () => {
  console.log(`🚀 Server running on http://${config.HOST}:${config.PORT}`);
});