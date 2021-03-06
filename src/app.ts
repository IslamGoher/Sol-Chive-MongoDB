import express, {Application} from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import connectDB from "./db/db";
import { errorHandler } from "./middleware/errorHandler";
import { router as SolutionsRoutes } from "./routes/solutions";
import { router as userRoutes } from "./routes/users";
import { notFound } from "./controller/RouteNotFound";
import { router as oauth } from "./routes/oauth";

const app: Application = express();

// dotenv config
dotenv.config({path: path.join(__dirname, '../.env')});

// connect application with database
connectDB();

// set port
const port: number|string = process.env.PORT || 3000;

// morgan config
if(process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// handling incoming json requests
app.use(express.json());

// handling incoming x-www-form-urlencoded requests
app.use(express.urlencoded({extended: false}));

// use oauth routes
app.use(oauth);

// use solutions routes
app.use(SolutionsRoutes);

// use user routes
app.use(userRoutes);

// not found route
app.use(notFound);

// use error handler
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`server listening to port '${port}' on '${process.env.NODE_ENV}' mode`);
});