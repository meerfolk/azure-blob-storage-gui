import { RestError } from '@azure/storage-blob'; 
export const DEFAULT = 'Unknown Error';

interface AuthenticationErrorDetails {
    Code: string;
    AuthenticationErrorDetail: string;
}

const getAuthentificationMessage = (details: AuthenticationErrorDetails): string => {
    return [details.Code, details.AuthenticationErrorDetail].join('\n');
}

export const getErrorMessage = (error: RestError): string => {
    switch (error.statusCode) {
        case 403:
            return getAuthentificationMessage(error.details as AuthenticationErrorDetails);
        default: 
            return DEFAULT;
    }
}