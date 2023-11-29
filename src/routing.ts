import { type Express } from "express";
import motoristaRouter from "./routes/motorista.route"
import carroRouter from "./routes/carro.route"
import multaRouter from "./routes/multa.route"

export default function routing(app: Express) {
  // ! Include your routes here !
  app.use("/api/motorista", motoristaRouter);
  app.use("/api/carro", carroRouter);
  app.use("/api/multa", multaRouter);
}
