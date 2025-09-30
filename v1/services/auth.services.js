import Usuario from "../models/usuario.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const registerService = async ({ username, password, rol, nombre }) => {
    const usuarioExistente = await Usuario.findOne({ username });
    if (usuarioExistente) {
        let err = new Error("El nombre de usuario ya existe");
        err.status = 409;
        throw err;
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const usuario = new Usuario({ username, password: hashPassword, rol, nombre });
    await usuario.save();
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

export const loginService = async ({ username, password }) => {
    const usuario = await Usuario.findOne({ username });
    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
        let err = new Error("Credenciales inválidas");
        err.status = 401;
        throw err;
    }
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}
