import { getFromLocalStorage } from '../../infrastructure';

import { ISettings } from './interfaces';
import { SETTINGS_KEY } from './consts';

export const loadSettings = (): ISettings | null => {
    return getFromLocalStorage<ISettings>(SETTINGS_KEY);
}