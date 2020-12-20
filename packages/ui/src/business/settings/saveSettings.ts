import { saveToLocalStorage } from '../../infrastructure';

import { ISettings } from './interfaces';
import { SETTINGS_KEY } from './consts';

export const saveSettings = (settings: ISettings): void => {
    saveToLocalStorage(SETTINGS_KEY, JSON.stringify(settings));
};
