import { mysqlConn } from "../base/mysql"
import { type Multa, MultaSchema } from "../schemas/multa.schema";
import { findMotoristaByCpf } from "../repositories/motorista.repository"

export async function findMultas(cpf:string) {
      
    const existingCpf = await mysqlConn.query("SELECT cpf FROM motorista WHERE cpf = ?", [cpf]);
    if(existingCpf[0]?.cpf === cpf) {
        const carros = await mysqlConn.query("SELECT placa FROM carro WHERE cpfMotorista = ?", [cpf]);
        const placas = carros.map((carro: any) => carro.placa);
        let count;
        for(let i = 0; i < placas.length; i++) {
            const existingMulta = await mysqlConn.query("SELECT COUNT(*) AS count FROM multa WHERE placaCarro = ?", [placas[i]]);
            count = existingMulta[0]?.count > 0 ?? false;
            if(count !== null) {
                const result = await mysqlConn.query("SELECT valor, dataMulta, pontos, tipo FROM multa WHERE placaCarro IN (?)", [placas]);
                const multas = result.map(multa => ({
                    ...multa,
                    valor: parseFloat(multa.valor)
                }));
                return MultaSchema.array().parse(multas);
            }
        }
        return "Sem multas cadastradas"
    }
    else {
        return "CPF inexistente";
    }
}

export async function createMulta(valor: number, dataMulta: Date, pontos: number, tipo: string, placaCarro: string): Promise<Multa> {
    const insertedResult = await mysqlConn.execute("INSERT INTO multa (valor, dataMulta, pontos, tipo, placaCarro) VALUES (?, ?, ?, ?, ?)", [valor, dataMulta, pontos, tipo, placaCarro]);
    if(insertedResult === null) {
        throw new Error("Erro ao criar multa");
    }

    return MultaSchema.parse(insertedResult);
}

export async function retidos() {
    const motoristas = await mysqlConn.query("SELECT cpf FROM motorista");
    const cpf = motoristas.map((motorista: any) => motorista.cpf);
    const retidos = []
    for(let i = 0; i < motoristas.length; i++) {
        let totalPontos = 0;
        const multas = await findMultas(cpf[i]);
        if(typeof multas !== "string") {
            for(let j = 0; j < multas.length; j++) {
                const pontos = multas[j]?.pontos;
                if(pontos !== undefined) totalPontos += pontos;
            }
        }
        if(totalPontos >= 10) {
            const nome = (await findMotoristaByCpf(cpf[i])).nome
            retidos.push({nome, pontos: totalPontos})
        }
    }
    if(retidos.length === 0) return "Não há motoristas retidos"
    return retidos;
}