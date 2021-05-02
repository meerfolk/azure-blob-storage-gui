import { ConnectionModel } from './connection.model';
import { getConnectionList } from './get-connection-list';
import { saveConnections } from './save-connections';

export function updateConnection(connectionId: string, value: ConnectionModel): void {
    const connectionList = getConnectionList();

    const newList = connectionList.reduce<Array<ConnectionModel>>((memo, connection) => {
        const connectionToAdd = connection.id === connectionId
            ? value
            : connection;

        memo.push(connectionToAdd);
        return memo;
    }, []);

    saveConnections(newList);
}
