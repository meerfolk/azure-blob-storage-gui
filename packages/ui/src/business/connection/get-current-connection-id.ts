import { getFromLocalStorage } from '../../infrastructure';

import constants from './consts';

export function getCurrentConnectionId(): string | null {
  return getFromLocalStorage(constants.CURRENT_CONNECTION_ID_KEY, false);
}
