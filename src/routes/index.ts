import { Router } from 'express';
import Paths from '../common/Paths';
import listeRouter from './ListeRoutes';
import musiqueRouter from './MusiqueRoutes';

const apiRouter = Router();

apiRouter.use(Paths.Liste.Base, listeRouter);
apiRouter.use(Paths.Musiques.Base, musiqueRouter);

export default apiRouter;