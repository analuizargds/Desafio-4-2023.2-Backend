import { Router } from "express";
import { MultaCreateSchema } from "../schemas/multa.schema";
import { findMultas, createMulta, retidos } from "../repositories/multa.repository";

const router = Router();

router.get("/retidos", async (req, res) => {
    const motoristasRetidos = await retidos();
    return res.status(201).json(motoristasRetidos);
});

router.get("/:cpfMotorista", async (req, res) => {

    const cpfMotorista = req.params.cpfMotorista
    const multas = await findMultas(cpfMotorista);
    return res.status(200).json(multas)

});

router.post("/", async (req, res) => {
    const { valor, dataMulta, pontos, tipo, placaCarro } = MultaCreateSchema.parse(req.body);
    const multa = await createMulta(valor, dataMulta, pontos, tipo, placaCarro);
    return res.status(201).json(multa);
});


export default router;
