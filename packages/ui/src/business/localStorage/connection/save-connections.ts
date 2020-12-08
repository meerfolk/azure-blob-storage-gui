import { ConnectionModel } from '.';

import Constants from '../../constants';

export const saveConnections = (connectionModels: ConnectionModel[]): void => {
  window.localStorage.setItem(Constants.connectionsKey, JSON.stringify(connectionModels));
}