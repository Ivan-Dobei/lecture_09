export interface IPost {
    id: number;
    imageUrl: string;
    description: string;
    user: {
        username: string;
    };
    commentCount: number;
}

export interface IPostData {
    data: IPost[];
    total: number;
    page: string;
    lastPage: number;
}

export interface IPostDataPagination {
    total: number;
    page: string;
    lastPage: number;
}

export interface ISendPost {
    image: File | null;
    description: string;
}