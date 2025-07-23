export interface IPost {
    id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: Date;
    updatedAt?: Date;
    authorId: string;
    author: IAuthor;
    _count: {
        comments: number;
        reactions: number;
    };
}

export interface IAuthor {
    id: string;
    fullName: string;
    profilePicture?: string;
}

export interface PostPreviewProps {
    post: IPost;
}