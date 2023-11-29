import { z } from "zod";

export const MultaSchema = z.object ({
    valor: z.number(),
    dataMulta: z.date(),
    pontos: z.number().int().positive(),
    tipo: z.string().max(50),
})

export const MultaCreateSchema = z.object ({
    valor: z.number(),
    dataMulta: z.coerce.date(),
    pontos: z.number().int().positive(),
    tipo: z.string().max(50),
    placaCarro: z.string().min(8).max(8),
})

export type Multa = z.infer<typeof MultaSchema>;