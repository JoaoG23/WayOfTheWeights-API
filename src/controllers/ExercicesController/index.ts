import { Request, Response } from "express";
import ExercicesModel from "../../model/schemas/ExercicesModel";
import HistoryUsersModel from "../../model/schemas/HistoryUsersModel";

// Services
import MessageReturns from "../services/MessageReturns";
import CreateDataService from "../services/Create";
import ListOneDataService from "../services/ListOne";
import DeleteDataService from "../services/Delete";
import EditDataService from "../services/Edit";
import ListExercicesAndWeightByID from "../services/specificServices/ListExercicesAndWeightByID";
import ListExercicesWithWeightByIdTraining from "../services/specificServices/ListExercicesWithWeightByIdTraining";
import ListExercicesWithWeightAll from "../services/specificServices/ListExercicesWithWeightAll";
import ListOneLastExerciceOfTrainingID from "../services/specificServices/ListOneLastExerciceOfTrainingID";
import { Exercice } from "../../types/Exercice";
import { History } from "../../types/History";
import { LastExercice } from "../../types/LastExercice";
import ListOneLastExerciceByIdTrainingAndExercice from "../services/specificServices/ListOneLastExerciceByIdTrainingAndExercice";
class ExercicesControlllers {
  public async create(req: Request, res: Response) {
    try {
      const newExercice: Exercice = req.body;
      await CreateDataService.execulte(ExercicesModel, newExercice);

      const dateNow = new Date();
      const response = await ListOneLastExerciceOfTrainingID.execulte(
        newExercice.trainingId
      );
      const {
        iduser,
        username,
        idtraining,
        training,
        idexercices,
        exercice,
        idweights,
        weight,
      }: LastExercice = response[0];

      const dataForInsertHistory: History = {
        id_user: iduser,
        name_user: username,
        id_training: idtraining,
        training_name: training,
        id_exercice: idexercices,
        exercice_name: exercice,
        id_pound: idweights,
        pound: weight,
        dateInsert: dateNow,
      };

      // Insert data in the historic
      await CreateDataService.execulte(HistoryUsersModel, dataForInsertHistory);
      res
        .status(201)
        .json(new MessageReturns(true, 'Exercice inserted with success'));
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
      res
        .status(400)
        .json(new MessageReturns(false, "Error to list exercices"));
      console.error(error);
    }
  }

  public async listAllForIdTraining(req: Request, res: Response) {
    try {
      const { idTrainings } = req.params;
      const exerciceFound = await ListExercicesWithWeightByIdTraining.execulte(
        idTrainings
      );

      if (!exerciceFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Exercice not exists"));
      }
      res.status(200).json(exerciceFound);
    } catch (error) {
      res
        .status(400)
        .json(new MessageReturns(false, "Error to list Exercices"));
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
            new MessageReturns(
              false,
              "Exercice not exists for he to be removed"
            )
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

      const exerciceFound: Exercice = await ListOneDataService.execulte(
        ExercicesModel,
        {
          id: idFound,
        }
      );

      if (!exerciceFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Exercice not exists for updated"));
      }

      // Update data
      await EditDataService.execulte(ExercicesModel, req.body, {
        id: idFound,
      });

      // List exercices already updated
      const dateNow = new Date();
      const response =
        await ListOneLastExerciceByIdTrainingAndExercice.execulte(
          exerciceFound.trainingId,
          idFound
        );
      const {
        iduser,
        username,
        idtraining,
        training,
        idexercices,
        exercice,
        idweights,
        weight,
      }: LastExercice = response[0];

      const dataForInsertHistory: History = {
        id_user: iduser,
        name_user: username,
        id_training: idtraining,
        training_name: training,
        id_exercice: idexercices,
        exercice_name: exercice,
        id_pound: idweights,
        pound: weight,
        dateInsert: dateNow,
      };

      // Then Insert data in the historic
      await CreateDataService.execulte(HistoryUsersModel, dataForInsertHistory);

      res.status(200).json(new MessageReturns(true, "Exercice updated with success"));
    } catch (error) {
      res
        .status(400)
        .json(new MessageReturns(true, "Error to update exercice"));
      console.error(error);
    }
  }
}

export default new ExercicesControlllers();
