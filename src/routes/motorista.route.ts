import { Router } from "express";
import { createMotorista, findAllUsers } from "../repositories/motorista.repository";
import { MotoristaCreateSchema } from "../schemas/motorista.schema";

const router = Router()

router.get("/", async (req, res) => {
    // execute
    const motoristas = await findAllUsers();
    // send
    return res.status(200).json(motoristas);
});

router.post("/", async (req, res) => {
    // validate
    const { cpf, nome, vencimentoCnh, catCnh } = MotoristaCreateSchema.parse(req.body);
    // execute
    const motorista = await createMotorista(cpf, nome, vencimentoCnh, catCnh);
    // send
    return res.status(201).json(motorista);
});

export default router;