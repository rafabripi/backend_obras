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
        req.usuario = decoded.usuario;
        next();
    });
}

let verificarAdmin = (req, res, next) => {
    let typeUser = req.usuario.tipo;
    if (typeUser === 'Administrador') {
        next();
    }else{
        return res.status(403).json({
            message: "El usuario no es administrador"
        });
    }
}

module.exports = {verificarToken, verificarAdmin};