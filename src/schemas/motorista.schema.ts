import { z } from "zod";

export const MotoristaSchema = z.object({
    cpf: z.string().min(11).max(11),
    nome: z.string().min(10).max(100),
    vencimentoCnh: z.date(),
    catCnh: z.string().min(1).max(2),
});

export const MotoristaCreateSchema = z.object({
    cpf: z.string().min(11).max(11),
    nome: z.string().min(10).max(100),
    vencimentoCnh: z.coerce.date(),
    catCnh: z.string().min(1).max(2),
});

export type Motorista = z.infer<typeof MotoristaSchema>;