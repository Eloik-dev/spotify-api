import Paths from "@src/common/Paths";
import ListeService from "@src/services/ListeService";
import { Router } from "express";

const listeRouter = Router();

listeRouter.get(Paths.Liste.GetAll, ListeService.getAll);
listeRouter.get(Paths.Liste.Get, ListeService.get);
listeRouter.post(Paths.Liste.Search, ListeService.search);
listeRouter.post(Paths.Liste.Create, ListeService.create);
listeRouter.put(Paths.Liste.Update, ListeService.update);
listeRouter.delete(Paths.Liste.Delete, ListeService.delete);

export default listeRouter