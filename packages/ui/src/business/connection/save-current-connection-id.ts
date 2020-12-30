import { saveToLocalStorage } from '../../infrastructure';

import constants from './consts';

export function saveCurrentConnectionId(id: string): void {
  saveToLocalStorage(constants.CURRENT_CONNECTION_ID_KEY, id);
}
