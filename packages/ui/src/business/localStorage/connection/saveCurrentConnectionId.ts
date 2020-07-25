import constants from '../../constants';

export function saveCurrentConnectionId(id: string) {
  window.localStorage.setItem(constants.currentConnectionIdKey, id);
}
