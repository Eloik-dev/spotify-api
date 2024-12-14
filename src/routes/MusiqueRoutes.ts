import Paths from "@src/common/Paths";
import MusiqueService from "@src/services/MusiqueService";
import { Router } from "express";

const musiqueRouter = Router();

musiqueRouter.post(Paths.Musiques.Search, MusiqueService.search);
musiqueRouter.post(Paths.Musiques.Create, MusiqueService.create);
musiqueRouter.put(Paths.Musiques.Update, MusiqueService.update);
musiqueRouter.delete(Paths.Musiques.Delete, MusiqueService.delete);

export default musiqueRouter;
