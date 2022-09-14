const getDB = require("../../../db/getDB");
const { generateError } = require("../../../helpers");
const bcrypt = require ('bcrypt');



const userLogin = async (req, res, next) => {
   let connection;

   try {
      connection = await getDB();

      const {email, password} = req.body;
      if (!email || !password){
         throw generateError ("¿Pusiste el usuario y la contraseña? Anda, fíjate bien.",400)
      }
      
      const [user] = await connection.query(`select id from user where email = '`,[email]);

      if (user.length < 1){
         throw generateError ("Lo siento. No tenemos usuarios registrados con ese email.",404)
      }

      const validPassword = await bcrypt.compare (password, user[0].password)

      if (!validPassword){
         throw generateError("La contraseña que has introducido es incorrecta.",401)
      }

      const tokenInfo = {
         id: user[0].id
      };

      const token = jwt.sign (tokenInfo, process.env.SECRET, {
         expiresIn: '10d',
      });

      res.send ({
         status: 'Ok',
         message: 'Te has logueado con éxito. ¡Disfruta Hack a Gram!'
      })

   } catch (error) {
      next (error);
   } finally {
      if (connection) connection.release();
   }
};

module.exports = userLogin;