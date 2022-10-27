import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import styles from './Style.module.css';

interface CellProps {
    id: number,
    amount: number | string,
    lineIndex?: Number,
    gradient?: string | null,
    onShowNearestValue?: (id: number) => void,
    isNearestValue?: boolean,
    onHideNearestValue?: () => void,
}

export const Cell: FC<CellProps> = ({ id, lineIndex, amount, gradient, onShowNearestValue, isNearestValue, onHideNearestValue }) => {
    const disptch = useDispatch();
    const gradientValue = useMemo(() => {
        return gradient ? `linear-gradient(transparent ${100 - Number(gradient.substring(0, 2))}%, red ${gradient})` : 
            (isNearestValue ? '#1905f2' : 'none');
    }, [gradient, isNearestValue])

    const onIncrement = () => {
        disptch({type: 'INCREMENT', payload: { id: id, lineIndex: lineIndex }});
    }

    return (
        <div 
            className={styles.cell} 
            style={ { background: gradientValue }} 
            onClick={() => onIncrement()}
            onMouseOver={onShowNearestValue ? () => onShowNearestValue(id) : () => {}}
            onMouseLeave={onHideNearestValue ? () => onHideNearestValue() : () => {}}
        >
            {amount}
        </div>
    )
}