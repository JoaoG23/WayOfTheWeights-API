import { Request, Response } from "express";
import UserModel from "../../model/schemas/UserModel";
import MessageReturns from "../services/MessageReturns";

import CreateDataService from "../services/Create";
import ListOneDataService from "../services/ListOne";
import ListAllService from "../services/ListAll";
import DeleteDataService from "../services/Delete";
import EditDataService from "../services/Edit";

class UsersControlllers {
  public async create(req: Request, res: Response) {
    try {

      type UserType = {
        name?: string;
        userName?: string;
        password?: string;
        telefone?: string;
        email?: string;
      };


      await CreateDataService.execulte(UserModel, req.body);
      res.json(new MessageReturns(true, 'Insert with success'));
    } catch (error) {
      res.status(400).send(error);
      console.error(error);
    }
  }

  public async listAll(req: Request, res: Response) {
    try {
      const users = await ListAllService.execulte(UserModel);
      res.status(200).json(users);
    } catch (error) {
      res.send(error);
      console.error(error);
    }
  }

  public async listOneForUserUsername(req: Request, res: Response) {
    try {
      const { userName } = req.params;
      const userFound = await ListOneDataService.execulte(UserModel, {
        userName: userName,
      });
      res.status(200).json(userFound);
    } catch (error) {
      res.send(error);
      console.error(error);
    }
  }

  public async listOneForId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userFound = await ListOneDataService.execulte(UserModel, {
        id: id,
      });

      if (!userFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "User not exists"));
      }
      res.status(200).json(userFound);
    } catch (error) {
      res.send(error);
      console.error(error);
    }
  }

  public async deleteUserForId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userFound = await ListOneDataService.execulte(UserModel, {
        id: id,
      });
      if (!userFound) {
        return res
          .status(400)
          .json(
            new MessageReturns(false, "User not exists for he to be removed")
          );
      }

      await DeleteDataService.execulte(UserModel, {
        id: id,
      });
      res
        .status(200)
        .json(new MessageReturns(true, "User deleted with success"));
    } catch (error) {
      res.send(error);
      console.error(error);
    }
  }

  public async updateUserForUserName(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const userFound = await ListOneDataService.execulte(UserModel, {
        id: id,
      });

      if (!userFound) {
        return res
          .status(400)
          .json(
            new MessageReturns(false, "User not exists for he to be updated")
          );
      }

      await EditDataService.execulte(UserModel, req.body, {
        id: id,
      });

      res
        .status(200)
        .json(new MessageReturns(true, "User updated with success"));
    } catch (error) {
      res.send(error);
      console.error(error);
    }
  }
}

export default new UsersControlllers();
