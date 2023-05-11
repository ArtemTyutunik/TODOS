export interface ITodo {
    label: string,
    id: number,
    description?: string,
    done?: boolean,
    priority: Priority,
    Tags?: string[],
    date?: IDate
}

export type Priority = '1' | '2' | '3'| '4'
export type IDate = string | undefined
export type Anchor = null | HTMLElement

export interface IUser {
    accessToken: string,
    login: string,
    todos: ITodo[],
    user_id: string
}
