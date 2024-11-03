import {IUser} from "./IUser";

export interface IPost {
    id: number;
    imageUrl: string;
    description: string;
    user: IUser;
    commentCount: number;
}