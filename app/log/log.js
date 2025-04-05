import pino from "pino";
import path from "path";
import fs from "fs";

const logDirectory = path.join("logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const infoStream = pino.destination(path.join(logDirectory, "success.log"));
const warnStream = pino.destination(path.join(logDirectory, "error.log"));
export const logger = {
  success: (par = null) => {
    try {
      if (par) {
        if (typeof par == typeof []) {
          pino({ level: "error" }, infoStream).error(JSON.stringify(par));
        } else {
          pino({ level: "error" }, infoStream).error(par);
        }
      } else {
        console.log(`некорректные данные`);
      }
    } catch (error) {
      console.error(error);
    }
  },
  error: (par = null) => {
    try {
      if (par) {
        if (typeof par == typeof []) {
          pino({ level: "error" }, warnStream).error(JSON.stringify(par));
        } else {
          pino({ level: "error" }, warnStream).error(par);
        }
      } else {
        console.log(`некорректные данные`);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
