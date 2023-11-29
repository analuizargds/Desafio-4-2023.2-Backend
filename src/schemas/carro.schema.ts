import { z } from "zod";

export const CarroSchema = z.object ({
    placa: z.string().min(8).max(8),
    marca: z.string().max(50),
    modelo: z.string().max(50),
    ano: z.number().int().positive(),
    cor: z.string().max(20),
})

export const CarroCreateSchema = z.object ({
    placa: z.string().min(8).max(8),
    marca: z.string().max(50),
    modelo: z.string().max(50),
    ano: z.number().int().positive(),
    cor: z.string().max(20),
    cpfMotorista: z.string().min(11).max(11),
})

export type Carro = z.infer<typeof CarroSchema>;