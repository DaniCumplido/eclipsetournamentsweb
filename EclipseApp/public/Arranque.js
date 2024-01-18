//npm init -y
//npm install express body-parser mysql2 bcrypt express-session cookie-parser ejs
//npm i --save-dev nodemon dotenv
//npm install passport passport-local

	/****************************
				IMPORTS
	*****************************/

const express = require('express');
const path = require('path');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'tu-secreto-aqui',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


	/****************************
			  FUNCIONES
	*****************************/

const port = 3307;
app.listen(port, () => {
  console.log('Server is running on port 3307');
});

const connection = mysql2.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: ''
});

app.use(cookieParser());
app.use(session({
  secret: 'tu-secreto-aqui',
  resave: false,
  saveUninitialized: false
}));

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

	/****************************
		REGISTRO DE USUARIO
	*****************************/
  
  app.post('/usuarios', async (req, res) => {
    const { nombre, usuario, riotid, email, password, confirmPassword } = req.body;

    // Validaciones adicionales
    if (!validarNombre(nombre) || !validarNombreUsuario(usuario) || !validarRiotId(riotid) || !validarEmail(email) || password !== confirmPassword) {

      console.log(!validarNombre(nombre));
      console.log(!validarNombreUsuario(usuario));
      console.log(!validarRiotId(riotid));
      console.log(!validarEmail(email));
      console.log(!validarEmail(password !== confirmPassword));
      return res.status(400).send('Error en los datos proporcionados');
    }

    // Resto del código

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      nombre,
      usuario,
      riotid,
      email,
      password: hashedPassword
    };

    connection.query('INSERT INTO usuarios SET ?', newUser, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error inserting data into the database');
      }

      res.redirect('/index.html');
    });
  });


	/****************************
			  PASAPORTE
	*****************************/

  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      connection.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results) => {
        if (error) {
          console.log(error);
          return done(error);
        }

        if (results.length === 0) {
          return done(null, false, { message: 'El usuario no existe' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          return done(null, user);
		  
        } else {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }
      });
    }
  ));
    
  // Serialize and Deserialize User
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
      if (err) {
        return done(err);
      }

      const user = results[0];
      return done(null, user);
    });
  });

	/****************************
		    AUTENTICACION
	*****************************/

  app.post('/autenticar', async (req, res) => {
    const { email, password } = req.body;

    // Realizar una consulta a la base de datos para obtener la contraseña almacenada
    connection.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Error en la base de datos');
      }

      if (results.length === 0) {
        return res.status(401).send('El usuario no existe, ¿estás seguro de que es correcto?');
      }

      const user = results[0];

      // Comparar la contraseña proporcionada con la versión hasheada almacenada en la base de datos
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // Autenticación exitosa
        req.session.usuario = user;
        //return res.redirect('/perfil');
        return res.redirect('/perfilUsuario.html'); // Redirigir al perfil del usuario
      } else {
        return res.status(401).send('Contraseña incorrecta, inténtalo de nuevo');
      }
    });
  });

  app.get('/perfil', (req, res) => {
    if (req.isAuthenticated()) {
      const usuario = req.user; // Use req.user to access the authenticated user
      console.log('Datos del usuario:', usuario);

      res.render('perfilUsuario', { usuario });
    } else {
      res.redirect('/index.html');
    }
  });

  app.get('/perfilUsuario.html', (req, res) => {
    const usuario = req.user; // Assuming req.user is where Passport.js stores the authenticated user
    res.render('perfilUsuario', { usuario });
  });

  app.get('/getUserInfo', (req, res) => {
    res.json({ usuario: req.user });
  });
  
  	/****************************
		PERFIL DE USUARIO
	*****************************/ 

  app.post('/usuaPerf', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user object has an 'id' property
        const updatedFields = req.body; // Assuming the form data contains the updated fields

        // Validate the data and perform necessary actions
        if (updatedFields.password !== updatedFields.confirmPassword) {
            return res.status(400).send('Error: Passwords do not match');
        }

        // Call the function to update the user profile
        await updateUserProfile(userId, updatedFields);

        // Save the additional fields (cueDeX, RiotID, cueTwitch, cueDiscord) to the database
        await saveSocialMediaData(userId, updatedFields);

        // Send a response or redirect as needed
        res.redirect('/perfilUsuario.html');
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).send('Error updating user profile');
    }
  });
  
  // Function to save additional social media data to the database
  async function saveSocialMediaData(userId, data) {
    const { cueDeX, RiotID, cueTwitch, cueDiscord } = data;

    const updateQuery = 'UPDATE usuarios SET cueDeX = ?, RiotID = ?, cueTwitch = ?, cueDiscord = ? WHERE id = ?';
    await connection.query(updateQuery, [cueDeX, RiotID, cueTwitch, cueDiscord, userId]);
  }


// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  // Redirect to login if not authenticated
  res.redirect('/perfilUsuario.html');
}

// Function to update user profile in the database
async function updateUserProfile(userId, updatedFields) {
  try {
    // Extract the new password from updatedFields
    const newPassword = updatedFields.password;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Construct the update query dynamically based on updatedFields
    const updateFields = { password: hashedPassword }; // You can add other fields here

    // Construct the SET clause for the SQL query
    const setClause = Object.keys(updateFields).map(field => `${field} = ?`).join(', ');

    // Update the user profile in the database
    const updateQuery = `UPDATE usuarios SET ${setClause} WHERE id = ?`;
    
    // Create an array of values to replace the placeholders in the query
    const updateValues = [...Object.values(updateFields), userId];

    await connection.query(updateQuery, updateValues);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error; // Handle the error appropriately
  }
}

});





// Funciones de validación
function validarNombre(nombre) {
  // Al menos 3 letras
  return /^[a-zA-Z\s]{3,}$/.test(nombre);
}

function validarNombreUsuario(usuario) {
  // Al menos 3 letras
  return /^[a-zA-Z]{3,}$/.test(usuario);
}

function validarRiotId(riotId) {
  // String de texto, un hashtag (#), y 4 letras mayúsculas o números
  return /^[a-zA-Z\s]+\#[0-9A-Z]{3,5}$/.test(riotId);
}

function validarEmail(email) {
  // Verificar que contiene un @ y al menos un punto después del @
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//---------------------------------

//Inicio de sesion