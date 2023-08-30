const { Router } = require("express");
const { Usuario, Bootcamp } = require("../models/index.js");

// create user function

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body)
  try {
    const newUser = await Usuario.create({ firstName, lastName, email, password });
    return res.json(newUser);
  } catch (error) {
    console.log(error);
    res.send("Ups! createUser not working");
  }
};

// • Obtener los Bootcamp de un usuario llamado findUserById.
const findUserById = async (req,res) => {
  try {
    let { id } = req.params
    id = parseInt(id)
    let bootcampByUser = await Usuario.findByPk(id, {
      include: [
        {
          model: Bootcamp,
          //as: "Bootcamps",
        },
      ],
    });
    return res.json(bootcampByUser);
  } catch (error) {
    console.log(error)
    console.log("Ups! findUserById not working");
    return res.status(400).json(error);
  }
};

// • Obtener todos los Usuarios incluyendo, los Bootcamp llamado findAll. GET

const findAll = async (req,res) => {
  try {
    const todosUsuarios = await Usuario.findAll( {
      include: [
        {
          model: Bootcamp,
        },
      ],
    });
    return res.json(todosUsuarios);
  } catch (error) {
    console.log(error)
    console.log("Ups! findAll not working");
    return res.status(400).json(error);
  }
};

// • Actualizar usuario por Id llamado updateUserById. PUT

const updateUserById = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  let { id } = req.params
  id = parseInt(id)
  //console.log(req.body)
  try {
    let update = await Usuario.update({ firstName, lastName, email, password }, {
      where: {
        id,
      }});
    return res.json(update);
  } catch (error) {
    console.log(error);
    console.log("Ups! updateUserById not updating");
    return res.status(400).json(error);
  }
};

//UPDATE "Usuario" set firstName, lastName, email where id "1" 

// Change everyone without a last name to "Doe"
// await User.update({ lastName: "Doe" }, {
//   where: {
//     lastName: null
//   }
// });

// • Eliminar un usuario por Id llamado deleteUserById. DELETE
// Delete everyone named "Jane"
// await User.destroy({
//   where: {
//     firstName: "Jane"
//   }
// });

const deleteUserById = async (req,res) => {
  try {
    let { id } = req.params
    id = parseInt(id)
    let deleteUser = await Usuario.destroy( {
      where: 
        {
          id
        }
    });
    return res.json(deleteUser);
  } catch (error) {
    console.log(error)
    console.log("Ups! deleteUserById could not delete");
    return res.status(400).json(error);
  }
};


module.exports = { createUser, findUserById, findAll, updateUserById, deleteUserById };


// //{
//   "firstName": "prueba",
//   "lastName": "otra",
//   "email": "otro@mail.com"
// }