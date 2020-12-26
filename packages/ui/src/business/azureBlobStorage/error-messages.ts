export const FORBIDDEN = 'Authorization problem';

export const DEFAULT = 'Unknown Error';

export const getErrorMessageByStatusCode = (code: number): string => {
    switch (code) {
        case 403:
            return FORBIDDEN;
        default: 
            return DEFAULT;
    }
}