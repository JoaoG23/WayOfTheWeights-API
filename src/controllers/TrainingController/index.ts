import { Request, Response } from "express";
import TrainingModel from "../../model/schemas/TrainingModel";

// Services
import MessageReturns from "../services/MessageReturns";
import CreateDataService from "../services/Create";
import ListOneDataService from "../services/ListOne";
import ListAllService from "../services/ListAll";
import DeleteDataService from "../services/Delete";
import EditDataService from "../services/Edit";
import ListAllByCriteriaService from "../services/ListAllByCriteria";
import { Training } from "./Intefaces/Training";

class TrainingsControlllers {
  public async create(req: Request, res: Response) {
    try {
      const { title , description , userId } = req.body;

      const newTraining :Training = {
        title:title,
        description:description,
        userId:userId
      }

      await CreateDataService.execulte(TrainingModel, newTraining);
      res
        .status(201)
        .json(new MessageReturns(false, "Training inserted with success"));
    } catch (error) {
      res
        .status(400)
        .json(new MessageReturns(false, "Error of the inserted training"));
      console.error(error);
    }
  }

  public async listAll(req: Request, res: Response) {
    try {
      const trainings = await ListAllService.execulte(TrainingModel);
      res.status(200).json(trainings);
    } catch (error) {
      res.status(400).json(error);
      console.error(error);
    }
  }

  public async listOneForId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const trainingFound = await ListOneDataService.execulte(TrainingModel, {
        id: id,
      });

      if (!trainingFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Training not exists"));
      }
      res.status(200).json(trainingFound);
    } catch (error) {
      res.status(400).json(new MessageReturns(false, "Error to list trainings"));
      console.error(error);
    }
  }

  public async listAllForIdUser(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const trainingFound = await ListAllByCriteriaService.execulte(TrainingModel, {
        userId: idUser,
      });

      if (!trainingFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Training not exists"));
      }
      res.status(200).json(trainingFound);
    } catch (error) {
      res.status(400).json(new MessageReturns(false, "Error to list trainings"));
      console.error(error);
    }
  }

  public async deleteForId(req: Request, res: Response) {
    try {
      let idFound = req.params.id;
      if (!idFound) {
        idFound = req.body.id;
      }

      const trainingFound = await ListOneDataService.execulte(TrainingModel, {
        id: idFound,
      });
      if (!trainingFound) {
        return res
          .status(400)
          .json(
            new MessageReturns(false, "User not exists for he to be removed")
          );
      }

      await DeleteDataService.execulte(TrainingModel, {
        id: idFound,
      });
      res
        .status(200)
        .json(new MessageReturns(true, "Training deleted with success"));
    } catch (error) {
      res.status(400).json(error);
      console.error(new MessageReturns(false, "Error to delete training"));
    }
  }

  public async updateForId(req: Request, res: Response) {
    try {
      let idFound = req.params.id;
      if (!idFound) {
        idFound = req.body.id;
      }

      const trainingFound = await ListOneDataService.execulte(TrainingModel, {
        id: idFound,
      });

      if (!trainingFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Training not exists for updated"));
      }

      await EditDataService.execulte(TrainingModel, req.body, {
        id: idFound,
      });

      res
        .status(200)
        .json(new MessageReturns(true, "Training updated with success"));
    } catch (error) {
      res.status(400).json(new MessageReturns(true, "Training updated with success"));
      console.error(error);
    }
  }
}

export default new TrainingsControlllers();
