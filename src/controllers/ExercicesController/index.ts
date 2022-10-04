import { Request, Response } from "express";
import ExercicesModel from "../../model/schemas/ExercicesModel";

// Services
import MessageReturns from "../services/MessageReturns";
import CreateDataService from "../services/Create";
import ListOneDataService from "../services/ListOne";
import DeleteDataService from "../services/Delete";
import EditDataService from "../services/Edit";
import ListExercicesAndWeightByID from "../services/specificServices/ListExercicesAndWeightByID";
import ListExercicesWithWeightByIdTraining from "../services/specificServices/ListExercicesWithWeightByIdTraining";
import ListExercicesWithWeightAll from "../services/specificServices/ListExercicesWithWeightAll";
import HistoryUsersModel from "../../model/schemas/HistoryUsersModel";

class ExercicesControlllers {
  public async create(req: Request, res: Response) {
    try {
      await CreateDataService.execulte(ExercicesModel, req.body);
      res
        .status(201)
        .json(new MessageReturns(true, "Exercice inserted with success"));

        // Crie um select * fro
    } catch (error) {
      res
        .status(400)
        .json(new MessageReturns(false, "Error of the inserted Exercice"));
      console.error(error);
    }
  }

  public async listAll(req: Request, res: Response) {
    try {
      const exercices = await ListExercicesWithWeightAll.execulte();
      res.status(200).json(exercices);
    } catch (error) {
      res.status(400).json(error);
      console.error(error);
    }
  }

  public async listOneForId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const exercice = await ListExercicesAndWeightByID.execulte(id);
      const exerciceFound = exercice[0];

      if (!exerciceFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Exercice not exists"));
      }
      res.status(200).json(exerciceFound);
    } catch (error) {
      res.status(400).json(new MessageReturns(false, "Error to list exercices"));
      console.error(error);
    }
  }

  public async listAllForIdTraining(req: Request, res: Response) {
    try {
      const { idTrainings } = req.params;
      const exerciceFound = await ListExercicesWithWeightByIdTraining.execulte(idTrainings);

      if (!exerciceFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Exercice not exists"));
      }
      res.status(200).json(exerciceFound);
    } catch (error) {
      res.status(400).json(new MessageReturns(false, "Error to list Exercices"));
      console.error(error);
    }
  }

  public async deleteForId(req: Request, res: Response) {
    try {
      let idFound = req.params.id;
      if (!idFound) {
        idFound = req.body.id;
      }

      const exerciceFound = await ListOneDataService.execulte(ExercicesModel, {
        id: idFound,
      });
      if (!exerciceFound) {
        return res
          .status(400)
          .json(
            new MessageReturns(false, "Exercice not exists for he to be removed")
          );
      }

      await DeleteDataService.execulte(ExercicesModel, {
        id: idFound,
      });
      res
        .status(200)
        .json(new MessageReturns(true, "Exercice deleted with success"));
    } catch (error) {
      res.status(400).json(error);
      console.error(new MessageReturns(false, "Error to delete Exercice"));
    }
  }

  public async updateForId(req: Request, res: Response) {
    try {
      let idFound = req.params.id;
      if (!idFound) {
        idFound = req.body.id;
      }

      const exerciceFound = await ListOneDataService.execulte(ExercicesModel, {
        id: idFound,
      });

      if (!exerciceFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Exercice not exists for updated"));
      }

      await EditDataService.execulte(ExercicesModel, req.body, {
        id: idFound,
      });

      res
        .status(200)
        .json(new MessageReturns(true, "Exercice updated with success"));
    } catch (error) {
      res.status(400).json(new MessageReturns(true, "Exercice updated with success"));
      console.error(error);
    }
  }
}

export default new ExercicesControlllers();
