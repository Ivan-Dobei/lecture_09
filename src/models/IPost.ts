export interface IPost {
    id: number;
    imageUrl: string;
    description: string;
    user: {
        username: string;
    };
    commentCount: number;
}

export interface ISendPost {
    image: File | null;
    description: string;
}