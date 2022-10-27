import React, { FC, useMemo, useState } from 'react';
import { LineType, DataType } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';

import { Line } from '../Line';
import { Cell } from '../Cell';

import { createColumns, findValues } from '../../utils';

import styles from './Style.module.css';

type StateType = {
    matrix: DataType,
}

export const Matrix: FC = () => {
    const disptch = useDispatch();
    const data: any = useSelector<StateType>(state => state.matrix);
    const mean: number[] = useMemo(() => createColumns(data), [data]);
    const [isNearest, setIsNearest] = useState<boolean | number>(false);

    const onShowNearestValue = (id: number) => {
        setIsNearest(id);
    }

    const onHideNearestValue = () => {
        setIsNearest(false);
    }

    const onAddLine = () => {
        disptch({ type: 'ADD_LINE', payload: mean.length || 1 });
    }

    return (
        <>
            <div>
                {data.map((line: LineType, index: number) => {
                    return (
                        <Line 
                            key={line[0].id + 1} 
                            line={line} 
                            lineIndex={index} 
                            onShowNearestValue={onShowNearestValue}
                            nearestValue={isNearest ? findValues(isNearest as number, data) : null}
                            onHideNearestValue={onHideNearestValue}
                        />
                    )
                })}
            </div>
            <div className={styles.mean}>
                {mean.map((value) => {
                    return (
                        <Cell key={value} id={value} amount={value} />
                    )
                })}
            </div>
            <div>
                <button className={styles['add-btn']} onClick={() => onAddLine()}>
                    Add line
                </button>
            </div>
        </>
    )
}
