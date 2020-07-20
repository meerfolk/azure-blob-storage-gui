import Constants from '../../constants';

import { ConnectionModel } from './connection.model';

export function getConnectionList(): Array<ConnectionModel> {
  const connectionsStr = window.localStorage.getItem(Constants.connectionsKey);

  return JSON.parse(connectionsStr || '[]');
}
