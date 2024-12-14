import logger from 'jet-logger';

import EnvVars from '@src/common/EnvVars';
import server from './server';
import { connect } from 'mongoose';

/**
 * Enregistrer les modèles pour éviter des problèmes
 */
require('./models/Musique');
require('./models/Liste');

const SERVER_START_MSG = ('Express server started on port: ' +
  EnvVars.Port.toString());

connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/speutifye-api").then(() =>
  server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG))
);