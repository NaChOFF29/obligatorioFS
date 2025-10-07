import { loginService, registerService } from "../services/auth.services.js";

export const login = async (req, res) => {
  try {
    const token = await loginService(req.body);
    res.status(201).json({ message: "Login successful", token });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const token = await registerService(req.body);
    res.status(201).json({ message: "Usuario registrado con éxito", token });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
