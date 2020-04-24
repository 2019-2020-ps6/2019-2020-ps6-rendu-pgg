import { Attempt } from './attempt.model';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    attempts: Attempt[];
}
