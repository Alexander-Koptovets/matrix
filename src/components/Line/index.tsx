import React, { FC, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LineType, CellType } from '../../../types';

import { Cell } from '../Cell';

import { isNearestValue } from '../../utils';

import styles from './Style.module.css';

interface LineProps {
    line: LineType,
    lineIndex: number,
    onShowNearestValue: (n: number) => void,
    nearestValue: CellType[] | null,
    onHideNearestValue: () => void,
}

export const Line: FC<LineProps> = ({ line, lineIndex, onShowNearestValue, nearestValue, onHideNearestValue }) => {
    const [isPercent, setIsPercent] = useState<boolean>(false);
    const disptch = useDispatch();

    const sum = useMemo(() => {
        return line.reduce((acc, cell) => {
            return acc + cell.amount;
        }, 0)
    }, [line]);

    const percent = (amount: number): string => {
        return `${(amount / (sum / 100)).toFixed()}%`;
    }

    const onShowPercent = () => {
        setIsPercent(true);
    }

    const onHidePercent = () => {
        setIsPercent(false);
    }

    const onRemoveLine = () => {
        disptch({ type: 'REMOVE_LINE', payload: lineIndex });
    }

    return (
        <div className={styles.line}>
            <div className={styles.line}>
                    {line.map((cell: CellType) => {
                        const isNearest = nearestValue ? isNearestValue(cell.id, nearestValue as CellType[]) : false;
                        return (
                            <Cell 
                                key={cell.id}
                                id={cell.id}
                                amount={isPercent ? percent(cell.amount) : cell.amount} 
                                gradient={isPercent ? percent(cell.amount) : null}
                                onShowNearestValue={onShowNearestValue}
                                isNearestValue={isNearest}
                                onHideNearestValue={onHideNearestValue}
                            />
                        )
                    })}
                </div>
            <div 
                className={styles.sum} 
                onMouseOver={() => onShowPercent()} 
                onMouseLeave={() => onHidePercent()}
            >
                <Cell id={sum} amount={sum} />
            </div>
            <div className={styles['remove-box']}>
                <button className={styles['remove-btn']} onClick={() => onRemoveLine()}>
                    Remove line
                </button>
            </div>
        </div>
    )
}