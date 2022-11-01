import { Request, Response } from "express";
import WeightModel from "../../model/schemas/WeightModel";
// Services
import MessageReturns from "../services/MessageReturns";
import ListAllService from "../services/ListAll";

class WeightsController {
  public async listAll(req: Request, res: Response) {
    try {
      const weights = await ListAllService.execulte(WeightModel);
      if (!weights) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Not there is data"));
      }
      res.status(200).json(weights);
    } catch (error) {
      res
        .status(400)
        .json(new MessageReturns(false, "Error to list statistic"));
      console.error(error);
    }
  }
}

export default new WeightsController();
