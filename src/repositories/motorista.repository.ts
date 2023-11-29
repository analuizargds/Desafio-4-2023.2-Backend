import { mysqlConn } from "../base/mysql"
import { type Motorista, MotoristaSchema } from "../schemas/motorista.schema";

export async function findAllUsers() {
    const result = await mysqlConn.query("SELECT cpf, nome, vencimentoCnh, catCnh from motorista");

    return MotoristaSchema.array().parse(result);
}

export async function findMotoristaByCpf(cpf:string) {
    const result = await mysqlConn.query("SELECT cpf, nome, vencimentoCnh, catCnh from motorista WHERE cpf = ?", [cpf]);

    return MotoristaSchema.parse(result[0]);
}

export async function createMotorista(cpf:string, nome:string, vencimentoCnh: Date, catCnh:string): Promise<Motorista> {
    
    const insertedResult = await mysqlConn.execute("INSERT INTO motorista (cpf, nome, vencimentoCnh, catCnh) VALUES (?, ?, ?, ?)", [cpf, nome, vencimentoCnh, catCnh]);
    if(insertedResult.affectedRows < 1) {
        throw new Error("Erro ao criar motorista");
    }
    return MotoristaSchema.parse(insertedResult);
}