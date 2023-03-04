export interface ITodo {
    label: string,
    id: number,
    description?: string,
    done?: boolean,
    priority?: Priority,
    labels?: [],
    date?: IDate
}

export type Priority = '1' | '2' | '3'| '4'
export type IDate = string | undefined
