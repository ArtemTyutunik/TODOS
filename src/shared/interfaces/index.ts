export interface ITodo {
    label: string,
    id: number,
    description?: string,
    done?: boolean,
    priority?: '1' | '2' | '3'| '4'
    labels?: [],
    date?: string | null
}