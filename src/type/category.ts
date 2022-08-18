export interface Category {
    id: number;
    name: string;
}

export interface CategoryList {
    mode: string;
    data: Category[];
}