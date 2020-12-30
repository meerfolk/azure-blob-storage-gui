import Constants from './consts';

import { getFromLocalStorage } from '../../infrastructure';

import { ConnectionModel } from './connection.model';

interface IListItem {
  id: string;
  accountName: string,
  containerName: string;
  sas: string;
};

export function getConnectionList(): Array<ConnectionModel> {
  const connections = getFromLocalStorage<Array<IListItem>>(Constants.CONNECTION_KEY);

  if (!connections) {
    return [];
  }

  return connections.map(
    (connection: { id: string; accountName: string; containerName: string; sas: string }) =>
      new ConnectionModel(connection.id, connection.accountName, connection.containerName, connection.sas),
  );
}
