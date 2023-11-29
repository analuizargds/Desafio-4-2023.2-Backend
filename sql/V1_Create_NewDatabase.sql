CREATE DATABASE IF NOT EXISTS Detran;

USE Detran;

CREATE TABLE motorista(
    cpf VARCHAR(11) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    vencimentoCnh DATE NOT NULL,
    catCnh VARCHAR(2),
    CONSTRAINT motorista_pk PRIMARY KEY (cpf)
);

CREATE TABLE carro(
    placa VARCHAR(8) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano INT NOT NULL,
    cor VARCHAR(20) NOT NULL,
    cpfMotorista VARCHAR(11) NOT NULL,
    CONSTRAINT carro_pk PRIMARY KEY (placa),
    CONSTRAINT carro_motorista_fr FOREIGN KEY (cpfMotorista) REFERENCES motorista (cpf)
);

CREATE TABLE multa(
    id INT NOT NULL AUTO_INCREMENT,
    valor DECIMAL(10,2) NOT NULL,
    dataMulta DATE NOT NULL,
    pontos INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    placaCarro VARCHAR(8) NOT NULL,
    CONSTRAINT multa_pk PRIMARY KEY (id),
    CONSTRAINT multa_carro_fr FOREIGN KEY (placaCarro) REFERENCES carro (placa)
)AUTO_INCREMENT = 1;