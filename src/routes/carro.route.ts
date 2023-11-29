import { Router } from "express";
import { CarroCreateSchema } from "../schemas/carro.schema";
import { findCars, createCar } from "../repositories/carro.repository";

const router = Router();

router.get("/:cpfMotorista", async (req, res) => {

    const cpfMotorista = req.params.cpfMotorista
    const carros = await findCars(cpfMotorista);
    return res.status(200).json(carros)

});

router.post("/", async (req, res) => {
    const { placa, marca, modelo, ano, cor, cpfMotorista } = CarroCreateSchema.parse(req.body);
    const carro = await createCar(placa, marca, modelo, ano, cor, cpfMotorista);
    return res.status(201).json(carro);
});

export default router;
