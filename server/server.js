require("mithril/test-utils/browserMock")(global);

import Mixx from "mixx";
import { express as MixxExpress } from "mixx/loader";
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";

import App from "../src/index";
import createStore from "../src/store";

const app = express();
const PORT = process.env.PORT || 3000;
const buildDir = path.resolve(__dirname, "../build");

const mixx = MixxExpress({
  html: `${buildDir}/app.html`,
  manifest: `${buildDir}/mixx.json`,
  createSession(cookies) {},
  createStore,
  routes: App.routes,
});

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static(buildDir));
app.use(mixx.middleware());

Mixx.preloadAll().then(() => {
  app.listen(PORT, console.log(`App listening on port ${PORT}!`));
});

// Handle the bugs somehow
app.on("error", error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});
