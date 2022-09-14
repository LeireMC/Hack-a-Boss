const getDB = require ('../../../db/getDB');
const generateError = require ('../../../helpers');
const bcrypt = require('bcrypt');


const userNew =  async (req, res, next) => {
let connection;
try {
   connection = await getDB();
   const { name, username, email, password } = req.body

   if (!name || !username || !email || !password ){
      throw generateError("¿Seguro que has puesto todos los datos necesarios? Hacen falta campos obligatrios",400)
   }

   const [user] = await connection.query(`select id from user where email = ?`,[email]);
   if (user.length > 0) {
   throw generateError("Ya hay un usuario registrado con ese email.",409)
   };

   await connection.query(`select id from user where username = ?`,[username]);
   if (user.length > 0) {
   throw generateError("Ya hay un usuario registrado con ese nombre de usuario. Por favor elige otro.",409)
   }

   const hashedPassword = await bcrypt.hash(password,10);

   await connection.query(`
   insert into user (name, username, email, password, privacy, createdAt) values (?,?,?,?,?,?)`,[name, username,email,password, public, new Date() ]);

   res.send ({
      status: 'Ok',
      message: 'Usuario registrado con éxito. ¡Bienvenid@ a Hack a Gram!'
   });


} catch (error) {
   next (error)
} finally {
   if (connection) connection.release();
}
} ;



module.exports = userNew;