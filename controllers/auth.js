//const express = require('express');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');



/* const crearUsuario = (request, res = response) => {  //esto es para habiliar el autocompletado de node:  response = express.response
    //console.log('Se requiere: /');
    //console.log(request);
    const { name, email, password, password2 } = request.body;   
   // console.log(password2);
   
   const usuario = new Usuario();
   
    res.status(201).json({ //status cuando grabamos info correctamente
        ok: true,
        msg: 'register',
        //user: request.body
        name,
        email,
        password,
        password2
    })
} */


const crearUsuario = async (request, res = response) => {

    //const { name, email, password, password2 } = request.body;    

    const { email, password } = request.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }

        usuario = new Usuario(request.body);

        //encriptar contraseña:
        const salt = bcrypt.genSaltSync(12);
        usuario.password = bcrypt.hashSync(password, salt); //nota: no es necesario encriptar ni enviar el password 2 a la bd


        //guardar en bd
        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',

        });
    }

}

const loginUsuario = async (request, res = response) => {
    //console.log('Se requiere: /');

    const { email, password } = request.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña no son correctos'
            });
        }

        //confirmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña no son correctos'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);


        //Generar nuestro JWT
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',

        });
    }


}

const revalidarToken = async (request, res = response) => {
    //console.log('Se requiere: /');
    /* const uid = request.uid;
    const name = request.name; */
    const { uid, name } = request;

    //Generar JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid: uid,
        name: name,
        token,
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}