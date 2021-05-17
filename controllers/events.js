//const express = require('express');
const { response } = require('express');

const Evento = require('../models/Evento');




const getEventos = async (request, res = response) => {
    const evento = await Evento.find() //se pueden poner condiciones para buscar cosas especificas y tambien para hacer paginaciones
        .populate('user', 'name'); //agrega los campos del usuario asociado
    res.json({
        ok: true,
        evento
    });

}

const crearEvento = async (request, res = response) => {
    //console.log( request.body);
    const evento = new Evento(request.body);

    try {
        evento.user = request.uid;    //console.log(request.uid);
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado,
        });

    } catch (error) {
        //console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',

        });
    }
}

const actualizarEventos = async (request, res = response) => {
    const eventoId = request.params.id;
    const uid = request.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay ningun evento asociado con ese id'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            });
        }

        const nuevoEvento = {
            ...request.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        // {new:true} es para no mostrar la version previa a la actualizacion y ver de una vez la actualizada

        res.json({
            ok: true,
            eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',

        });

    }

}


const eliminarEventos = async (request, res = response) => {
    const eventoId = request.params.id;
    const uid = request.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay ningun evento asociado con ese id'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete(eventoId);     

        res.json({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',

        });

    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEventos,
    eliminarEventos
}