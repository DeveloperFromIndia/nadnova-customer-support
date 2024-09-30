export interface IUser {
    id: number,
    telegramId: number,
    username: string,
}

export interface IUserByPage {
    totalPages:number,
    currentPage:number,
    users: IUser[]
}