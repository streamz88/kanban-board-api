import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

const CommonMiddleware = app => {
  app.use(bodyParser.json());
  app.use(morgan("common"));
  app.use(cors());
  app.use(helmet());
};

export default CommonMiddleware;
