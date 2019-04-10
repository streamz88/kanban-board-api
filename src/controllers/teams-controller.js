import { Router } from "express";
import TeamsService from "../services/teams-service";
import validator from "../middleware/validator";

const TeamsRouter = Router();
const teamsService = new TeamsService();
const asyncWrapper = requestHandler => {
  return (req, res, next) => {
    return requestHandler(req, res).catch(next);
  };
};

TeamsRouter.get(
  "/",
  asyncWrapper(async (req, res) => {
    let userId = null;
    let teams = await teamsService.findAll(userId);

    res.send(teams);
  })
);

export default TeamsRouter;
