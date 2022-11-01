import { QueryTypes } from "sequelize";
import { db } from "../../../../model/database";
class ListUserLoginByUsername {
  public static async execulte(userName: string): Promise<object> {
    try {
      const datas = await db.query(
        `SELECT 
        users.id,
        users.name,
        users."userName",
        users.password,
        users.phonenumber,
        users.email,
        users."idPrevilegies",
        previlegies_users.force
        FROM users 
        RIGHT JOIN previlegies_users ON previlegies_users.id = users."idPrevilegies" WHERE users."userName" = ? `,
        {
          replacements: [userName],
          type: QueryTypes.SELECT,
        }
      );
      return datas.length > 0 ? datas : null;
    } catch (error) {
      return error;
    }
  }
}

export default ListUserLoginByUsername;
