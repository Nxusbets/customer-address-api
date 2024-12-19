const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Configuración de la base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Middleware de autenticación JWT
function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// Modelo de Usuario
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Modelo de Dirección
const Address = sequelize.define('Address', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

User.hasMany(Address);
Address.belongsTo(User);

sequelize.sync({ force: false })
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

const app = express();
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Direcciones de Clientes',
    availableEndpoints: [
      { method: 'GET', path: '/addresses', description: 'Obtener direcciones del usuario autenticado' },
      { method: 'POST', path: '/addresses', description: 'Crear una nueva dirección' },
      { method: 'PUT', path: '/addresses/:id', description: 'Actualizar una dirección existente' },
      { method: 'DELETE', path: '/addresses/:id', description: 'Eliminar una dirección' },
    ],
  });
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ error: 'Usuario no encontrado' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Contraseña incorrecta' });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});


// Ruta para obtener las direcciones de un usuario autenticado
app.get('/addresses', verifyToken, async (req, res) => {
  try {
    const addresses = await Address.findAll({ where: { userId: req.user.userId } });

    if (addresses.length === 0) {
      return res.status(404).json({ message: 'No se encontraron direcciones para este usuario' });
    }

    res.json(addresses);
  } catch (error) {
    console.error('Error al obtener las direcciones:', error);
    res.status(500).json({ error: 'Error al obtener las direcciones' });
  }
});

// Ruta para crear una dirección
app.post('/addresses', verifyToken, async (req, res) => {
  const { firstName, lastName, middleName, address, email } = req.body;

  try {
    const newAddress = await Address.create({
      firstName,
      lastName,
      middleName,
      address,
      email,
      userId: req.user.userId,
    });
    res.status(201).json(newAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la dirección' });
  }
});

// Ruta para actualizar una dirección
app.put('/addresses/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, middleName, address, email } = req.body;

  try {
    const address = await Address.findOne({ where: { id, userId: req.user.userId } });
    if (!address) {
      return res.status(404).json({ error: 'Dirección no encontrada' });
    }

    address.firstName = firstName || address.firstName;
    address.lastName = lastName || address.lastName;
    address.middleName = middleName || address.middleName;
    address.address = address || address.address;
    address.email = email || address.email;

    await address.save();
    res.json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la dirección' });
  }
});

// Ruta para eliminar una dirección
app.delete('/addresses/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const address = await Address.findOne({ where: { id, userId: req.user.userId } });
    if (!address) {
      return res.status(404).json({ error: 'Dirección no encontrada' });
    }

    await address.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la dirección' });
  }
});




// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
