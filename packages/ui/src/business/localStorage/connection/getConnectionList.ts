import Constants from '../../constants';

import { ConnectionModel } from './connection.model';

export function getConnectionList(): Array<ConnectionModel> {
  const connectionsStr = window.localStorage.getItem(Constants.connectionsKey);

  const connectionsArray = JSON.parse(connectionsStr || '[]');

  return connectionsArray.map(
    (connection: { id: string; accountName: string; containerName: string; sas: string }) =>
      new ConnectionModel(connection.id, connection.accountName, connection.containerName, connection.sas),
  );
}
