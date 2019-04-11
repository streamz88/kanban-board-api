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

TeamsRouter.get(
  "/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    let teams = await teamsService.findOne(id);

    res.send(teams);
  })
);

TeamsRouter.post(
  "/",
  [validator("Team")],
  asyncWrapper(async (req, res) => {
    const team = await teamsService.create(req.body);
    res.send(team);
  })
);

TeamsRouter.delete(
  "/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    await teamsService.deleteOne(id);
    res.sendStatus(200);
  })
);

export default TeamsRouter;
