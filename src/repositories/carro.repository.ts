import { mysqlConn } from "../base/mysql";
import { type Carro, CarroSchema  } from "../schemas/carro.schema"

export async function findCars(cpfMotorista:string) {
    const existingCpf = await mysqlConn.query("SELECT cpf, nome FROM motorista WHERE cpf = ?", [cpfMotorista]);
    if(existingCpf[0]?.cpf === cpfMotorista) {
        const result = await mysqlConn.query("SELECT placa, marca, modelo, ano, cor FROM carro WHERE cpfMotorista = ?", [cpfMotorista])
            return CarroSchema.array().parse(result);
    }

    return "O motorista não possui carro cadastrado";
}

export async function createCar(placa: string, marca:string, modelo:string, ano: number, cor:string, cpfMotorista: string): Promise<Carro> {
    const insertedResult = await mysqlConn.execute("INSERT INTO carro (placa, marca, modelo, ano, cor, cpfMotorista) VALUES (?, ?, ?, ?, ?, ?)", [placa, marca, modelo, ano, cor, cpfMotorista]);
    if(insertedResult === null) {
        throw new Error("Erro ao cadastrar carro");
    }
    
    return CarroSchema.parse(insertedResult);
}