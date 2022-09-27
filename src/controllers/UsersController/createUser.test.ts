import { it, describe, expect, afterEach, beforeEach } from "vitest";
import UserModel from "../../model/schemas/UserModel";

import request from "supertest";
import app from "../../app";
import TruncateAll from "../services/Truncate";
import { angela, gabiroba, zelanbida } from "../userForTest";

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

    it("Should to create one status 200", async () => {
      const res = await request(app).post("/api/users/").send(angela);

      expect(res.statusCode).toEqual(200);
      expect(res.headers);
      expect(res.body).toHaveProperty("msg");
      expect(res.body.msg).toBe('User inserted with success');
    });
  });
});
