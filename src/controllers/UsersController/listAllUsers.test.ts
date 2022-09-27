import { it, describe, expect, afterEach, beforeEach } from "vitest";
import UserModel from "../../model/schemas/UserModel";

import request from "supertest";
import app from "../../app";
import TruncateAll from "../services/Truncate";
import { angela, gabiroba, zelanbida } from "../userForTest";

describe("List Users", () => {
  describe("When send GET in the routers api/users/", () => {
    beforeEach(() => {
      TruncateAll.execulte(UserModel);
    });

    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to find all users registed and show all", async () => {
      // Create on new list of users
      const first = await request(app).post("/api/users").send(angela);
      const second = await request(app).post("/api/users").send(gabiroba);
      const third = await request(app).post("/api/users").send(zelanbida);

      const res = await request(app).get("/api/users");
      console.info(res.body);

      expect(res.statusCode).toEqual(200);
    });
  });
  describe("When send GET in the routers api/users/1", () => {
    beforeEach(() => {
      TruncateAll.execulte(UserModel);
    });

    afterEach(() => {
      TruncateAll.execulte(UserModel);
    });

    it("Should to find one user registed and to show your datas", async () => {
      // Create on new list of users
      const first = await request(app).post("/api/users").send(gabiroba);

      const res = await request(app).get("/api/users/1");
      console.info(res.body);

      expect(res.statusCode).toEqual(200);
    });
  });
});
