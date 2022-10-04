import { Request, Response } from "express";
import HistoryUsersModel from "../../model/schemas/HistoryUsersModel";

// Services
import MessageReturns from "../services/MessageReturns";
import CreateDataService from "../services/Create";
import ListOneDataService from "../services/ListOne";
import ListAllService from "../services/ListAll";
import DeleteDataService from "../services/Delete";
import EditDataService from "../services/Edit";
import ListAllByCriteriaService from "../services/ListAllByCriteria";

class StatisticsControlllers {

  public async listAll(req: Request, res: Response) {
    try {
      const trainings = await ListAllService.execulte(HistoryUsersModel);
      res.status(200).json(trainings);
    } catch (error) {
      res.status(400).json(error);
      console.error(error);
    }
  }


}

export default new StatisticsControlllers();
