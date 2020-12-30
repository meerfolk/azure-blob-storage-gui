export const saveToLocalStorage = (key: string, value: string): void => {
    window.localStorage.setItem(key, value);
}

export const getFromLocalStorage = <T>(key: string, isJson: boolean = true): T | null => {
    const item = window.localStorage.getItem(key);

    if (!item) {
        return null;
    }

    return isJson ? JSON.parse(item) : item;
}