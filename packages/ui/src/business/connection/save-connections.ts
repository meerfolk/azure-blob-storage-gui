import { saveToLocalStorage } from '../../infrastructure';

import { ConnectionModel } from './connection.model';
import Constants from './consts';

export const saveConnections = (connectionModels: Array<ConnectionModel>): void => {
  saveToLocalStorage(Constants.CONNECTION_KEY, JSON.stringify(connectionModels));
}
