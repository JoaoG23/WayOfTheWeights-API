import { it, describe, expect, afterEach, beforeEach } from "vitest";
import UserModel from "../../model/schemas/UserModel";

import request from "supertest";
import app from "../../app";
import TruncateAll from "../services/Truncate";
import { angela, gabiroba, zelanbida } from "../userForTest";

describe("Update Users", () => {
  describe("When send METHOD = PUT in the routers api/users/", () => {
    beforeEach(() => {
      TruncateAll.execulte(UserModel);
    });

    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to find one user and to update datas User", async () => {
      const createUser = await request(app).post("/api/users").send(angela);

      const showUserForDelete = await request(app).get("/api/users/1");


      const updated = await request(app).put("/api/users/1").send(gabiroba);
      
      console.info(updated.body);
      expect(updated.statusCode).toEqual(200);
      expect(updated.body).toHaveProperty("msg");
      expect(updated.body.msg).toBe("User updated with success");
    });
  });
});
