export type ActionType = {
    type: string, 
    payload: any,
}

export type CellType = {
    id: number,
    amount: number,
}

export type LineType = CellType[];

export type DataType = LineType[];