import { it, describe, expect, afterEach, beforeEach } from "vitest";
import UserModel from "../../model/schemas/UserModel";

import request from "supertest";
import app from "../../app";
import TruncateAll from "../services/Truncate";
import { angela, gabiroba, zelanbida } from "../userForTest";

describe("Delete Users", () => {
  describe("When send METHOD = DELETE in the routers api/users/", () => {
    beforeEach(() => {
      TruncateAll.execulte(UserModel);
    });

    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to find one user and to remove User", async () => {
      const createUser = await request(app).post("/api/users").send(angela);

      const showUserForDelete = await request(app).get("/api/users/1");
      const deleted = await request(app).delete("/api/users/1");
      
      expect(deleted.statusCode).toEqual(200);
      expect(deleted.body).toHaveProperty("msg");
      expect(deleted.body.msg).toBe("User deleted with success");
      console.info(deleted.body);
    });
  });
});
