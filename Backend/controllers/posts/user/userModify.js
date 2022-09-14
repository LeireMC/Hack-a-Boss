const getDB = require("../../../db/getDB")
const { generateError } = require("../../../helpers")


const userModify = async  (req, res, next) => {
   let connection;

   try {
      connection = await getDB();

      const { idUser } = req.params;
      const { name, username, email, password, lastname, avatar, bio, url, privacy } = req.body;

   } catch (error) {
      next(error);
   } finally {
      if (connection) connection.release();
   }
}