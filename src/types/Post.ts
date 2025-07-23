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
    coments?: IComment[];
    reactions?: IReactions[];
}

export interface IComment {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    authorId: string;
    postId: string;
    author: IAuthor;
}

export interface IAuthor {
    id: string;
    fullName: string;
    profilePicture?: string;
}

export interface PostPreviewProps {
    post: IPost;
}

export interface CommentProps {
    comment: IComment;
}

export interface IReactions {
    id: string;
    type: string;
    createdAt: Date;
    user: IAuthor;
    postId: string;
}