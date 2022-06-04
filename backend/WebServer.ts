import { startExpress } from './WebServer/Express';
import { initDatabase, initializeDatabaseConnection } from './Shared/Database';
import { ensureEnvironment } from './Shared/Utils';

ensureEnvironment(__dirname);

(async () => {
  try {
    await initializeDatabaseConnection();
    await initDatabase();
    await startExpress();
  } catch (err) {
    console.log(err);
  }
})();
