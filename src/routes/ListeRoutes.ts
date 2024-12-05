import Paths from "@src/common/Paths";
import ListeService from "@src/services/ListeService";
import { Router } from "express";

const listeRouter = Router();

listeRouter.get(Paths.Liste.GetAll, ListeService.getAll);

export default listeRouter