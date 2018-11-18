interface ICategoryItem {
    item: string,
    createdOn: string,
}
export interface ICategoryModel {
    id: number,
    name: string,
    imageUrl: string,
    createdOn: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
    CategoryItems: Array<ICategoryItem>
}