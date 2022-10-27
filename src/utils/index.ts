import { DataType, LineType, CellType } from '../../types';

export function createNum(): number {
    let num = Number((Math.random() * 1000).toFixed());
    if (num < 100) {
        return num * 10;
    }

    return num;
}

export function createLine(m: number): LineType {
    let line = [];
    for (let i = 0; i < m; i++) {
        const cell = {
            id: Number((Math.random() * 100000).toFixed()),
            amount: createNum(), //Number((Math.random() * 1000).toFixed()),
        };
        line.push(cell);
    }

    return line;
}

export function createData(n: number, m: number): DataType {
    const data = [];

    if (n > 100) {
        n = 100;
    }
    if (m > 100) {
        m = 100;
    }

    for (let i = 0; i < n; i++) {
        data.push(createLine(m));
    } 

    return data;
}

export const createColumn = (num: number, data: DataType) => {
    let column = [];

    for (let col of data) {
        column.push(col[num]);
    }

    return column;
}

export const createColumns = (data: DataType) => {
    let coluns = [];
    const n = data[0].length;

    for (let i = 0; i < n; i++) {
        const column = createColumn(i, data);

        const mean = column.reduce((acc, cell) => {
            return acc + cell.amount;
        }, 0)
        coluns.push( Number((mean / n).toFixed(2)));
    }

    return coluns;
}

export const increment = (state: any, id: number) => ({
    ...state,
    matrix: state.matrix.map((lines: LineType) => lines.map((cell: CellType) => {
        if (cell.id === id) {
            return { ...cell, amount: cell.amount + 1 }
        } else {
            return { ...cell }
        }
    })),
}) 

export const findValues = (id: number, data: LineType[]) => {
    const all: CellType[] = [];
    data.map((line: LineType) => (line.forEach((cell: CellType) => all.push(cell))));
    const sortAll = all.sort((a, b) => (a.amount - b.amount));

    const index = sortAll.findIndex((cell: CellType) => cell.id === id);

    const firstPart = sortAll.splice(0, index);
    const secondPart = sortAll.splice(1);

    const lowerNearestValue = firstPart ? firstPart[firstPart.length - 1] : null;
    const greaterNearestValue = secondPart ? secondPart[0] : null;

    let result = [];
    if (lowerNearestValue) {
        result.push(lowerNearestValue);
    }
    if (greaterNearestValue) {
        result.push(greaterNearestValue);
    }

    return result;
}

export const isNearestValue = (id: number, data: CellType[]) => {
    const result = data.map((value: CellType) => {
        if (value.id === id) {
            return true;
        }
        return false;
    })

    return !!result.find(item => item === true)
}