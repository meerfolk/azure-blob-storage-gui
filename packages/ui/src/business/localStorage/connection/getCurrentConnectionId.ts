import constants from '../../constants';

export function getCurrentConnectionId(): string | null {
  return window.localStorage.getItem(constants.currentConnectionIdKey);
}
