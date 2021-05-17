//custom validator fechas con check

const moment = require('moment');



const isDate = (value, { req, location, path }) => {   //req, location, path vienen de rest
    // console.log(value);
    //  console.log(req, location, path);

    if (!value) {
        return false;
    }

    const fecha = moment(value);
    //const fecha = moment(value, "MMM Do YYYY hA", "America/Toronto"); esto soluciona un warning pero como es info en backend entonces no importa, luego se formatea
    if (fecha.isValid()) { //funcion del moment para validar fechas
        return true;
    } else {
        return false;
    }

}

module.exports = {
    isDate
}