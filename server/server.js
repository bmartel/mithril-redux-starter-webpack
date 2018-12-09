require("mithril/test-utils/browserMock")(global);

import Mixx from "mixx";
import { express as MixxExpress } from "mixx/loader";
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";

import appShell from "../src/app";
import createStore from "../src/store";
import routes from "../src/routes";

const app = express();
const PORT = process.env.PORT || 3000;
const buildDir = path.resolve(__dirname, "../build");

const mixx = MixxExpress({
  app: appShell,
  html: `${buildDir}/index.html`,
  manifest: `${buildDir}/asset-manifest.json`,
  createSession(cookies) {},
  createStore,
  routes,
});

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.Router().get("/", mixx.middleware()));
app.use(express.static(buildDir));

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
