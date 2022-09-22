import { it, describe, expect, afterEach, beforeEach } from "vitest";
import UserModel from "../model/schemas/UserModel";

import request from "supertest";
import app from "../app";
import TruncateAll from "./services/Truncate";
import { angela, gabiroba, zelanbida } from "./userForTest";

describe("Create one New User", () => {
  afterEach(() => {
    TruncateAll.execulte(UserModel);
  });

  it("Should to create user with userName is angela if not exist", async () => {
    const res = await request(app).post("/api/users/").send(angela);

    expect(res.statusCode).toEqual(200);
    expect(res.headers);
    expect(res.body).toHaveProperty("msg");
  });
});

describe("Don't create one User", () => {
  afterEach(() => {
    TruncateAll.execulte(UserModel);
  });

  it("ERROR Should not create one user if exists", async () => {
    // Create on new User same name
    await request(app).post("/api/users/").send(angela);

    const secondUser = await request(app).post("/api/users/").send(angela);

    expect(secondUser.statusCode).toEqual(400);
    expect(secondUser.headers);
    expect(secondUser.body).toHaveProperty("msg");
    expect(secondUser.body.msg).toBe("User already exists");
  });

  beforeEach(() => {
    TruncateAll.execulte(UserModel);
  });
});

describe("Listing all users", () => {
  beforeEach(() => {
    TruncateAll.execulte(UserModel);
  });

  afterEach(() => {
    TruncateAll.execulte(UserModel);
  });

  it("Should to find all users registed", async () => {
    // Create on new list of users
    await request(app).post("/api/users").send(angela);
    await request(app).post("/api/users").send(gabiroba);
    await request(app).post("/api/users").send(zelanbida);

    const res = await request(app).get("/api/users");
    console.info(res.body);

    expect(res.statusCode).toEqual(200);
  });
});

describe("List one User for userName", () => {
  beforeEach(() => {
    TruncateAll.execulte(UserModel);
  });

  afterEach(() => {
    TruncateAll.execulte(UserModel);
  });

  it("Should to find one user registed for params UserName", async () => {
    // Create on new User
    await request(app).post("/api/users").send(gabiroba);

    const userFound = await request(app).get("/api/users/username/gabiroba");

    expect(userFound.statusCode).toEqual(200);
  });
});

describe("List one User for ID", () => {
  beforeEach(() => {
    TruncateAll.execulte(UserModel);
  });
  afterEach(() => {
    TruncateAll.execulte(UserModel);
  });

  it("Should to find one user registed for params id", async () => {

    const userFound = await request(app).get("/api/users/1");

    expect(userFound.body.msg).toBe("User not exists");
    expect(userFound.statusCode).toEqual(400);
  });
});

describe("Delete on User", () => {
  beforeEach(() => {
    TruncateAll.execulte(UserModel);
  });

  afterEach(() => {
    TruncateAll.execulte(UserModel);
  });

  it("Should to find one user and remove he", async () => {
    // Create on new User
    await request(app).post("/api/users").send(gabiroba);
    const userFound = await request(app).delete("/api/users/1");

    expect(userFound.body.msg).toBe("User deleted with success");
    expect(userFound.statusCode).toEqual(200);
  });
});

describe("ERROR Don't delete one User", () => {
  beforeEach(() => {
    TruncateAll.execulte(UserModel);
  });

  afterEach(() => {
    TruncateAll.execulte(UserModel);
  });

  it("Should don't remove on user if he not exists", async () => {
    const tryToDeleteUserNotFound = await request(app).delete(
      "/api/users/1"
    );

    expect(tryToDeleteUserNotFound.body.msg).toBe(
      "User not exists for he to be removed"
    );
    expect(tryToDeleteUserNotFound.statusCode).toEqual(400);
  });
});


describe("Update one User",  () => {
  beforeEach(() => {
    TruncateAll.execulte(UserModel);
  });

  afterEach(() => {
    TruncateAll.execulte(UserModel);
  });
  
  it("Should to update data of users", async () => {
    await request(app).post("/api/users").send(angela);
    const updatedData = await request(app).put("/api/users").send({
      id:1,
      name: "joao",
      userName:"joao", 
      password:"joao"
    });

    expect(updatedData.statusCode).toEqual(200);
    expect(updatedData.body.msg).toBe("User updated with success");
    expect(updatedData.headers);
    expect(updatedData.body).toHaveProperty("msg");
  });
});

describe("ERRO: Update user that not exists",  () => {
  beforeEach(() => {
    TruncateAll.execulte(UserModel);
  });

  afterEach(() => {
    TruncateAll.execulte(UserModel);
  });
  
  it("Should to update data of users", async () => {
    const updatedData = await request(app).put("/api/users").send({
      id:1,
      name: "joao",
      userName:"joao", 
      password:"joao"
    });

    expect(updatedData.statusCode).toEqual(400);
    expect(updatedData.body.msg).toBe("User not exists for he to be updated");
    expect(updatedData.headers);
    expect(updatedData.body).toHaveProperty("msg");
  });
});