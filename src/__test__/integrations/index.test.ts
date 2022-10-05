import { it, describe, expect, afterEach, beforeEach } from "vitest";
import UserModel from "../../model/schemas/UserModel";

import request from "supertest";
import app from "../../app";

// Services
import TruncateAll from "../../controllers/services/Truncate";
import GenerateToken from "../../controllers/services/GenerateToken";

// Seeds
import {
  angela,
  angelaLogin,
  angelaWithId,
  emailAngela,
  emailAngelaAndNewPassword,
  gabiroba,
  zelanbida,
} from "./seedsForTests/userExample";
import {
  trainingsBack,
  trainingsBackWithId,
  trainingsLegs,
} from "./seedsForTests/trainingExample";
import {
  agachamentoExercice,
  legPressExercice,
} from "./seedsForTests/exercicesExample";
import HistoryUsersModel from "../../model/schemas/HistoryUsersModel";

// 1- Quem estou testando
// 2 - Quando eu fazer algo! When send any
// 3 - O que deveria fazer? should be
describe("Create Users", () => {
  describe("When send datas as username, name, password,phonenumber, email ", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });
    beforeEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to create one status 201", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const res = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("msg");
      expect(res.body.msg).toBe("User inserted with success");
    });
  });
});

describe("Delete Users", () => {
  describe("When send METHOD = DELETE in the routers api/users/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to find one user and to remove User", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUser = await request(app)
        .post("/api/users")
        .set("authorization-token", token)
        .send(angela);

      const showUserForDelete = await request(app)
        .get("/api/users/1")
        .set("authorization-token", token);
      const deleted = await request(app)
        .delete("/api/users/1")
        .set("authorization-token", token);

      expect(deleted.statusCode).toEqual(200);
      expect(deleted.body).toHaveProperty("msg");
      expect(deleted.body.msg).toBe("User deleted with success");
    });
  });
});

describe("List Users", () => {
  describe("When send GET in the routers api/users/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to find all users registed and show all", async () => {
      // Create on new list of users
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });

      const first = await request(app)
        .post("/api/users")
        .set("authorization-token", token)
        .send(angela);

      const second = await request(app)
        .post("/api/users")
        .set("authorization-token", token)
        .send(gabiroba);

      const third = await request(app)
        .post("/api/users")
        .set("authorization-token", token)
        .send(zelanbida);

      const res = await request(app)
        .get("/api/users")
        .set("authorization-token", token);

      expect(res.statusCode).toEqual(200);
    });
  });

  describe("When send GET in the routers api/users/1", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to find one user registed and to show your datas", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      // Create on new list of users
      const first = await request(app)
        .post("/api/users")
        .set("authorization-token", token)
        .send(gabiroba);

      const res = await request(app)
        .get("/api/users/1")
        .set("authorization-token", token);

      expect(res.statusCode).toEqual(200);
    });
  });
});

describe("Update Users", () => {
  describe("When send METHOD = PUT in the routers api/users/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to find one user and to update datas user angela to gabiroba, for params request", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUser = await request(app)
        .post("/api/users")
        .set("authorization-token", token)
        .send(angela);

      const showUserForEdit = await request(app).get("/api/users/1");

      const updated = await request(app)
        .put("/api/users/1")
        .set("authorization-token", token)
        .send(gabiroba);

      expect(updated.statusCode).toEqual(200);
      expect(updated.body).toHaveProperty("msg");
      expect(updated.body.msg).toBe("User updated with success");
    });
  });

  describe("When send METHOD = PUT in the routers api/users/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to find one user and to update datas user gabiroba to angela for body request", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUser = await request(app)
        .post("/api/users")
        .set("authorization-token", token)
        .send(gabiroba);

      const showUserForEdit = await request(app).get("/api/users");

      const updated = await request(app)
        .put("/api/users")
        .set("authorization-token", token)
        .send(angelaWithId);

      expect(updated.statusCode).toEqual(200);
      expect(updated.body).toHaveProperty("msg");
      expect(updated.body.msg).toBe("User updated with success");
    });
  });

  describe("When send METHOD = PUT in the routers api/users/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should execpetion throw error for try to one user angela that not exists", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const updated = await request(app)
        .put("/api/users/1")
        .set("authorization-token", token)
        .send(angela);

      expect(updated.statusCode).toEqual(400);
      expect(updated.body).toHaveProperty("msg");
      expect(updated.body.msg).toBe("User not exists for updated");
    });
  });
});

describe("Login User", () => {
  describe("When the user created to do login ", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should get status 200 and show all data of user angela join userToken", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const registerAngela = await request(app)
        .post("/api/auth/register")
        .set("authorization-token", token)
        .send(angela);

      const loginAngela = await request(app)
        .post("/api/auth/login")
        .set("authorization-token", token)
        .send(angelaLogin);

      expect(loginAngela.statusCode).toEqual(200);
      expect(loginAngela.headers);
      expect(loginAngela.body).toHaveProperty("msg");
      expect(loginAngela.body.tokenUser).not.toBeNull();
      expect(loginAngela.body.msg).toBe("User logged in success");
    });
  });
  describe("When user not created to do login ", () => {
    beforeEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should get status 400 don't to do login user not exists", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const loginAngela = await request(app)
        .post("/api/auth/login")
        .set("authorization-token", token)
        .send(angelaLogin);

      expect(loginAngela.statusCode).toEqual(404);
      expect(loginAngela.headers);
      console.log(loginAngela.body);
      expect(loginAngela.body).toHaveProperty("msg");
      // expect(loginAngela.body.msg).toBe("Password or user incorrect");
    });
  });
  describe("When the user change your password  ", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should user to able in the change your password", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });

      const registerAngela = await request(app)
        .post("/api/auth/register")
        .set("authorization-token", token)
        .send(angela);

      const changedPassword = await request(app)
        .put("/api/auth/forgetpassword")
        .set("authorization-token", token)
        .send(emailAngelaAndNewPassword);

      expect(changedPassword.statusCode).toEqual(200);
      expect(changedPassword.headers);
      expect(changedPassword.body).toHaveProperty("msg");
      // expect(changedPassword.body.msg).toBe("Password or user incorrect");
    });
  });
});

describe("Trainings Of Users", () => {
  describe("When create one User and One trainings send datas with title,description,idUser in the Router POST /api/training/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able insert one training for user angela and return statusCode 201", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUser = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);
      const trainingCreate = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      expect(trainingCreate.statusCode).toEqual(201);
      expect(trainingCreate.headers);
      expect(trainingCreate.body).toHaveProperty("msg");
      expect(trainingCreate.body.msg).toBe("Training inserted with success");
    });
  });

  describe("When one user to get method = GET in the router = /api/training/user/1", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able show ao all training with user angela and return statusCode 200", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUser = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const oneTrainingCreateForUser = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const twoTrainingCreateForUser = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsBack);

      const listOneExercicesOfAngela = await request(app)
        .get("/api/training/user/1")
        .set("authorization-token", token);

      expect(listOneExercicesOfAngela.statusCode).toEqual(200);
      expect(listOneExercicesOfAngela.headers);
    });
  });
  describe("When one user to get method = GET in the router = /api/training/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able to show all training in the app and return statusCode 200", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUser = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const oneTrainingCreateForUser = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const twoTrainingCreateForUser = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsBack);

      const listOneExercices = await request(app)
        .get("/api/training/")
        .set("authorization-token", token);

      expect(listOneExercices.statusCode).toEqual(200);
      expect(listOneExercices.headers);
    });
  });

  describe("When one user to get method = GET in the router = /api/training/1", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able to show one training of ID 1 in the app and return statusCode 200", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUser = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const oneTrainingCreateForUser = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const twoTrainingCreateForUser = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsBack);

      const listOneExercices = await request(app)
        .get("/api/training/1")
        .set("authorization-token", token);

      expect(listOneExercices.statusCode).toEqual(200);
      expect(listOneExercices.headers);
    });
  });

  describe("When the user access the METHOD = DELETE in the router /api/training/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able delete one training, sending for PARAMS id of training of USER ANGELA, if not exist exercices that and return statusCode 200", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUserAngela = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const createTrainingLegsAngela = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const deleteTrainingOfTheAngela = await request(app)
        .delete("/api/training/1")
        .set("authorization-token", token);

      expect(deleteTrainingOfTheAngela.statusCode).toEqual(200);
      expect(deleteTrainingOfTheAngela.headers);
      expect(deleteTrainingOfTheAngela.body.situation).toBe(true);
      console.log(deleteTrainingOfTheAngela.body);
    });
  });

  describe("When create user access the METHOD = DELETE in the router /api/training/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able delete one training, sending for BODY id of training of USER ANGELA, if not exist exercices that and return statusCode 200", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUserAngela = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const createTrainingLegsAngela = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const deleteTrainingOfTheAngela = await request(app)
        .delete("/api/training")
        .set("authorization-token", token)
        .send({ id: 1 });

      expect(deleteTrainingOfTheAngela.statusCode).toEqual(200);
      expect(deleteTrainingOfTheAngela.headers);
      expect(deleteTrainingOfTheAngela.body.situation).toBe(true);
      console.log(deleteTrainingOfTheAngela.body);
    });
  });

  describe("When create user access the METHOD = PUT in the router /api/training/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able update one training, sending for BODY id of training of USER ANGELA for trainingBack data statusCode 200", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUserAngela = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const createTrainingLegsAngela = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const updateTrainingLegsToTrainingBackOfTheAngela = await request(app)
        .put("/api/training")
        .set("authorization-token", token)
        .send(trainingsBackWithId);

      expect(updateTrainingLegsToTrainingBackOfTheAngela.statusCode).toEqual(
        200
      );
      expect(updateTrainingLegsToTrainingBackOfTheAngela.body.situation).toBe(
        true
      );
      expect(updateTrainingLegsToTrainingBackOfTheAngela.headers);
      console.log(updateTrainingLegsToTrainingBackOfTheAngela.body);
    });
  });
});

describe("Exercices Of Users", () => {
  describe("When create one user, trainings and exercices send datas in the Router POST /api/exercice/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able insert one training for user angela and return statusCode 201", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUser = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);
      const trainingCreate = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const createExercices = await request(app)
        .post("/api/exercice/")
        .set("authorization-token", token)
        .send(legPressExercice);

      expect(createExercices.statusCode).toEqual(201);
      expect(createExercices.headers);
      expect(createExercices.body.situation).toBe(true);
      expect(createExercices.body).toHaveProperty("msg");
      expect(createExercices.body.msg).toBe("Exercice inserted with success");
    });
  });

  describe("When one user to get method = GET in the router = /api/exercice/training/1", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able to show all exercices with user angela, trainings and return statusCode 200", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUser = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const createdTrainingForUser = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const firstExerciceCreatedforUser = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(agachamentoExercice);

      const secondExerciceCreatedforUser = await request(app)
        .post("/api/exercice/")
        .set("authorization-token", token)
        .send(legPressExercice);

      const listOneExercicesOfAngela = await request(app)
        .get("/api/exercice/training/1")
        .set("authorization-token", token);

      expect(listOneExercicesOfAngela.statusCode).toEqual(200);
      expect(listOneExercicesOfAngela.headers);
    });
  });
  describe("When one user to get method = GET in the router = /api/exercice/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able to show all exercice in the app and return statusCode 200", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUser = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const oneTrainingCreateForUser = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const exerciceCreatedforUser = await request(app)
        .post("/api/exercice/")
        .set("authorization-token", token)
        .send(legPressExercice);

      const listOneExercices = await request(app)
        .get("/api/exercice/")
        .set("authorization-token", token);

      expect(listOneExercices.statusCode).toEqual(200);
      expect(listOneExercices.headers);
    });
  });

  describe("When one user to get method = GET in the router = /api/exercice/1", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able to show one exercice of ID 1 in the app and return statusCode 200", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUser = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const oneTrainingCreateForUser = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const exerciceCreatedforUser = await request(app)
        .post("/api/exercice/")
        .set("authorization-token", token)
        .send(legPressExercice);

      const listOneExercices = await request(app)
        .get("/api/exercice/1")
        .set("authorization-token", token);
      console.log(listOneExercices.body);

      expect(listOneExercices.statusCode).toEqual(200);
      expect(listOneExercices.headers);
    });
  });

  describe("When the user access the METHOD = DELETE in the router /api/training/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able delete one exercice, sending for PARAMS id of exercice of USER ANGELA, return statusCode 200", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUserAngela = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const createTrainingLegsAngela = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const exerciceCreatedforUser = await request(app)
        .post("/api/exercice/")
        .set("authorization-token", token)
        .send(legPressExercice);

      const exerciceDeletedforUser = await request(app)
        .delete("/api/exercice/1")
        .set("authorization-token", token);

      expect(exerciceDeletedforUser.statusCode).toEqual(200);
      expect(exerciceDeletedforUser.headers);
      expect(exerciceDeletedforUser.body.situation).toBe(true);
      console.log(exerciceDeletedforUser.body);
    });
  });

  describe("When create user access the METHOD = DELETE in the router /api/exercice/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able delete one exercices, sending for BODY id of exercices of USER ANGELA return statusCode 200", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUserAngela = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const createTrainingLegsAngela = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const exerciceCreatedforUser = await request(app)
        .post("/api/exercice/")
        .set("authorization-token", token)
        .send(legPressExercice);

      const exerciceDeletedforUser = await request(app)
        .delete("/api/exercice/")
        .set("authorization-token", token)
        .send({ id: 1 });

      expect(exerciceDeletedforUser.statusCode).toEqual(200);
      expect(exerciceDeletedforUser.headers);
      expect(exerciceDeletedforUser.body.situation).toBe(true);
      console.log(exerciceDeletedforUser.body);
    });
  });

  describe("When create user access the METHOD = PUT in the router /api/exercices/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to be able update one exercices, sending for BODY id of exercices of USER ANGELA for exercices data statusCode 200", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUserAngela = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const createTrainingLegsAngela = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const exerciceCreatedforUser = await request(app)
        .post("/api/exercice/")
        .set("authorization-token", token)
        .send(legPressExercice);

      const updateOneExercice = await request(app)
        .put("/api/exercice/1")
        .set("authorization-token", token)
        .send(agachamentoExercice);

      expect(updateOneExercice.statusCode).toEqual(200);
      expect(updateOneExercice.body.situation).toBe(true);
      expect(updateOneExercice.headers);
    });
  });
});

describe('Data and Statitics', () => {
  describe("When to create one new exercices, insert he in the history METHOD = GET in the router /api/statistic/", () => {
    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });
    afterEach(() => {
      TruncateAll.execulte(HistoryUsersModel);
    });

    it("Should to be able to insert in the table history and show all data ", async () => {
      const token = await GenerateToken.execulte({ id: 1, previlegie: 2 });
      const createUserAngela = await request(app)
        .post("/api/users/")
        .set("authorization-token", token)
        .send(angela);

      const createTrainingLegsAngela = await request(app)
        .post("/api/training/")
        .set("authorization-token", token)
        .send(trainingsLegs);

      const exerciceCreatedforUser = await request(app)
        .post("/api/exercice/")
        .set("authorization-token", token)
        .send(legPressExercice);

      const updateOneExercice = await request(app)
        .put("/api/exercice/1")
        .set("authorization-token", token)
        .send(agachamentoExercice);

      const showTableHistory = await request(app)
        .get("/api/statistics/")
        .set("authorization-token", token)


      expect(showTableHistory.statusCode).toEqual(200);
      expect(showTableHistory.headers);
    });
  });
});
