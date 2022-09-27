import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import UserModel from "../../model/schemas/UserModel";

import { User } from './Intefaces/User';
// Services 
import MessageReturns from "../services/MessageReturns";
import CreateDataService from "../services/Create";
import ListOneDataService from "../services/ListOne";
import ListAllService from "../services/ListAll";
import DeleteDataService from "../services/Delete";
import EditDataService from "../services/Edit";

class UsersControlllers {
  public async create(req: Request, res: Response) {
    try {

      const dataNewUser:User = {
        name: req.body.name,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password),
        phonenumber: req.body.phonenumber,
        email: req.body.email,
      };


      await CreateDataService.execulte(UserModel, dataNewUser);
      res.json(new MessageReturns(true, 'User inserted with success'));
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


  public async logar(req: Request, res: Response) {
    try {
      const { userName, password } = req.body;
      const userFound:User = await ListOneDataService.execulte(UserModel, {
        userName: userName,
      });

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
        res.status(400).json(new MessageReturns(false, "Password or user incorrect"));
        return;
      }

      // Get Token
      const token = jwt.sign(
        {
          id: userFound.id,
          admin: userFound.idPrevilegies,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: 4000 }
      );


      // insert token in code
      res.header("authorization-token", token);
      res
        .status(200)
        .json({
          userFound,
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
          .json(
            new MessageReturns(false, "User not exists for updated")
          );
      }

      const newData:User = {
        name: req.body.name,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password),
        phonenumber: req.body.phonenumber,
        email: req.body.email
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
}

export default new UsersControlllers();
