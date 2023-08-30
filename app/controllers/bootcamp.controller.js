const { Router } = require("express");
const { Usuario, Bootcamp } = require("../models/index");
//const { param } = require("../routes/routes");

// Para el Bootcamp, construir los siguientes controladores:

// • Crear y guardar un nuevo Bootcamp llamado createBootcamp.

const createBootcamp = async (req, res) => {
  const { title, cue, description } = req.body;

  try {
    const newBootcamp = await Bootcamp.create({ title, cue, description });
    return res.json(newBootcamp);
  } catch (error) {
    console.log("Ups! not created");
    return res.status(400).json(error.message);
  }
};

// • Agregar un Usuario al Bootcamp llamado addUser.
const addUserBootcamp = async (req, res) => {
  try {
    const { bootcamp, usuario } = req.body;
    let letBootcamp = await Bootcamp.findOne({
      where: {
        id: bootcamp,
      },
    });
    console.log(letBootcamp);
    const letUsuario = await Usuario.findOne({
      where: {
        id: usuario,
      },
    });
    //console.log(letUsuario);
    await letBootcamp.addUser(letUsuario);
    res.json("It works!");
  } catch (error) {
    //console.log("Ups! not added", error);
    return res.status(400).json(error.message);
  }
};

// • Obtener los Bootcamp por id llamado findById.
const findById = async (req, res) => {
  let { id } = req.params;
  try {
    let bootcamp = await Bootcamp.findByPk(id, {
      include: [
        {
          model: Usuario,
          //as: "Bootcamps",
        },
      ],
    });
    return res.json(bootcamp);
  } catch (error) {
    console.log("Ups! not found");
    return res.status(400).json(error.message);
  }
};

// • Obtener todos los Usuarios incluyendo los Bootcamp llamado findAll.

const findThem = async (req, res) => {
  try {
    let usuariosConBootcamp = await Bootcamp.findAll({
      include: [
        {
          model: Usuario,
        },
      ],
    });
    return res.json(usuariosConBootcamp);
  } catch (error) {
    console.log(error);
    console.log("Ups! not found");
    return res.status(400).json(error);
  }
};

//export

module.exports = { createBootcamp, findById, addUserBootcamp, findThem };