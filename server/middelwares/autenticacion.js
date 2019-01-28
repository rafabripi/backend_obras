//Verificar token
const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err , decoded)=>{
        if (err) {
            return res.status(401).json({
                ok: false,
                message: 'Error token no valido',
                err
            });
        }
        // req.usuario permitira que el controlador de cada ruta donde usemos este middelware
        // recuperar la informacion del usuario que realizo la peticion.
        req.usuario = decoded.usuario;
        next();
    });
}

//verficar que el usuario sea administrador
let verificarAdmin = (req, res, next) => {
    let typeUser = req.usuario.tipo;
    if (typeUser === 'Administrador' || 'Desarrollador') {
        next();
    }else{
        return res.status(403).json({
            message: "El usuario no es administrador"
        });
    }
}

//verificar token en el URL de la imagen
// let verficarImgToken = (req, res, next) => {
//     let token = req.query.token;
    
//     jwt.verify(token, process.env.SEED, (err , decoded)=>{
//         if (err) {
//             return res.status(401).json({
//                 ok: false,
//                 message: 'Error token no valido',
//                 err
//             });
//         }
//         req.usuario = decoded.usuario;
//         next();
//     });
// }

module.exports = {verificarToken, verificarAdmin};