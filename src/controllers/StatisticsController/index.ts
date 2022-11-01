import { Request, Response } from "express";
import HistoryUsersModel from "../../model/schemas/HistoryUsersModel";

// Services
import MessageReturns from "../services/MessageReturns";
import ListAllService from "../services/ListAll";
import ListDataGeneric from "../services/ListDataGeneric";

class StatisticsControlllers {
  public async listAll(req: Request, res: Response) {
    try {
      const history = await ListAllService.execulte(HistoryUsersModel);
      if (!history) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Not there is data"));
      }
      res.status(200).json(history);
    } catch (error) {
      res
        .status(400)
        .json(new MessageReturns(false, "Error to list statistic"));
      console.error(error);
    }
  }

  public async lastExerciceAndDatas(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const response = await ListDataGeneric.execulte(HistoryUsersModel, {
        where: {
          id_user: userId,
        },
        order: [["id", "DESC"]],
        limit: 1,
      });

      if (!response) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Not there is data"));
      }

      const unoData = response[0];

      res.status(200).json(unoData);
    } catch (error) {
      res
        .status(400)
        .json(new MessageReturns(false, "Error to list statistic"));
      console.error(error);
    }
  }


  public async last3ExercicesUpdated(req: Request, res: Response) {
    try {
      const { userId, exerciceId } = req.query;
      const response = await ListDataGeneric.execulte(HistoryUsersModel, {
        where: {
          id_user: userId,
          id_exercice:exerciceId
        },
        order: [["id", "DESC"]],
        limit: 3,
      });

      if (!response) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Not there is data"));
      }

      res.status(200).json(response);
    } catch (error) {
      res
        .status(400)
        .json(new MessageReturns(false, "Error to list statistic"));
      console.error(error);
    }
  }
}

export default new StatisticsControlllers();
