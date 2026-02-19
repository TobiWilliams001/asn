export interface LoginFormInterface {
    email: string;
    password: string;
}

export interface ArticleInterface {
    description: string;
    title: string;
    category: string;
    body: string;
    image: File | string;
    author: string;
}