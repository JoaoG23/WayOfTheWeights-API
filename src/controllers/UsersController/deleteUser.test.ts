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
      // Create on new list of users
      const createUser = await request(app).post("/api/users").send(angela);

      const showUserForDelete = await request(app).get("/api/users/1");
      const deleted = await request(app).delete("/api/users/1");
      console.info(deleted.body);

      expect(deleted.statusCode).toEqual(200);
      expect(deleted.body.msg).toEqual('User deleted with success');
    });
  });
});
