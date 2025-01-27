import {IUser} from "./IUser";

export interface IComment {
    id: number;
    text: string;
    user: IUser;
}