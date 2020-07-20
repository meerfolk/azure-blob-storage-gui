import { getConnectionList, ConnectionModel } from './';

import Constants from '../../constants';

export function saveConnection(connectionModel: ConnectionModel): void {
  const connections = getConnectionList();

  window.localStorage.setItem(Constants.connectionsKey, JSON.stringify([...connections, connectionModel]));
}