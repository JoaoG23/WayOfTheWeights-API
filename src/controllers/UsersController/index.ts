import { db } from "../../model/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import UserModel from "../../model/schemas/UserModel";
import PrevilegiesUsersModel from "../../model/schemas/PrevilegiesUserModel";

import { User } from "./Intefaces/User";
// Services
import MessageReturns from "../services/MessageReturns";
import CreateDataService from "../services/Create";
import ListOneDataService from "../services/ListOne";
import ListAllService from "../services/ListAll";
import DeleteDataService from "../services/Delete";
import EditDataService from "../services/Edit";
import ListUserLoginByUsername from "../services/specificServices/ListUserLoginByUsername";
import GenerateToken from "../services/GenerateToken";

class UsersControlllers {
  public async create(req: Request, res: Response) {
    try {


      const phonenumberFound = await ListOneDataService.execulte(UserModel, {
        phonenumber: req.body.phonenumber,
      });

      if (phonenumberFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "This Phonenumber already exists"));
      }

      const emailFound = await ListOneDataService.execulte(UserModel, {
        email: req.body.email,
      });

      if (emailFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "This Email already exists"));
      }


      const dataNewUser: User = {
        name: req.body.name,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password),
        phonenumber: req.body.phonenumber,
        email: req.body.email,
      };

      console.log(await CreateDataService.execulte(UserModel, dataNewUser));

      res
        .status(201)
        .json(new MessageReturns(true, "User inserted with success"));
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

  public async teste(req: Request, res: Response) {
    try {

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

  public async logar(req: Request, res: Response) {
    try {
      const { userName, password } = req.body;
      const response = await ListUserLoginByUsername.execulte(userName);

      const userFound: User = response[0];
      if (!userFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "Password or user incorrect"));
      }

      // Verify user Criptografia
      const passwordEPasswordDatabaseMatch = bcrypt.compareSync(
        password,
        userFound.password
      );

      if (!passwordEPasswordDatabaseMatch) {
        res
          .status(400)
          .json(new MessageReturns(false, "Password or user incorrect"));
        return;
      }

      const token: any = await GenerateToken.execulte({
        id: userFound.id,
        previlegie: userFound?.userData?.force,
      });

      const DataShowUserLogin: User = {
        id: userFound.id,
        name: userFound.name
      };

      // insert token in code
      res.header("authorization-token", token);
      res.status(200).json({
        userData: DataShowUserLogin,
        situation: true,
        msg: "User logged in success",
        tokenUser: token,
      });
    } catch (error) {
      res.send(error);
      console.error(error);
    }
  }

  public async deleteUserForId(req: Request, res: Response) {
    try {
      let idFound = req.params.id;
      if (!idFound) {
        idFound = req.body.id;
      }

      const userFound = await ListOneDataService.execulte(UserModel, {
        id: idFound,
      });
      if (!userFound) {
        return res
          .status(400)
          .json(
            new MessageReturns(false, "User not exists for he to be removed")
          );
      }

      await DeleteDataService.execulte(UserModel, {
        id: idFound,
      });
      res
        .status(200)
        .json(new MessageReturns(true, "User deleted with success"));
    } catch (error) {
      res.send(error);
      console.error(error);
    }
  }

  public async updateUserForId(req: Request, res: Response) {
    try {
      let idFound = req.params.id;
      if (!idFound) {
        idFound = req.body.id;
      }

      const userFound = await ListOneDataService.execulte(UserModel, {
        id: idFound,
      });

      if (!userFound) {
        return res
          .status(400)
          .json(new MessageReturns(false, "User not exists for updated"));
      }

      const newData: User = {
        name: req.body.name,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password),
        phonenumber: req.body.phonenumber,
        email: req.body.email,
      };

      await EditDataService.execulte(UserModel, newData, {
        id: idFound,
      });

      res
        .status(200)
        .json(new MessageReturns(true, "User updated with success"));
    } catch (error) {
      res.send(error);
      console.error(error);
    }
  }
  public async forgetPassword(req: Request, res: Response) {
    try {
        const emailFound = req.body.email;

      const userFound = await ListOneDataService.execulte(UserModel, {
        email: emailFound,
      });

      if (!userFound) {
        return res
          .status(400)
          .json(new MessageReturns(false,"Email don't exists of system"));
      }

      res
        .status(200)
        .json(new MessageReturns(true, "In the moment was send one e-mail! Look your inbox! Please"));
    } catch (error) {
      res.send(error);
      console.error(error);
    }
  }
}

export default new UsersControlllers();
