import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import styles from './DepositResult.module.css';

import deposit from '../../utils/deposit';

const { getDepositRateBySummAndPeriod, getDepositByCode, normalizeDay } =
    deposit;

const DepositResult = () => {
    const [rate, setRate] = useState();
    const { selectedDeposit } = useSelector(state => state.depositCalc);

    const deposit = getDepositByCode(selectedDeposit);

    const { summ, period } = useSelector(
        state => state.depositCalc.selectedProperties,
    );

    const userData = { summ, period };

    useEffect(() => {
        setRate(getDepositRateBySummAndPeriod(deposit, userData));
    }, [period, summ, selectedDeposit]);

    const depSumm = (
        (((summ / 100) * rate) / 356) * period +
        summ
    ).toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
    });
    const profit = ((((summ / 100) * rate) / 356) * period).toLocaleString(
        'ru-RU',
        {
            style: 'currency',
            currency: 'RUB',
        },
    );

    return (
        <>
            <Box>
                <ul className={styles['list']}>
                    <li className={styles['item']}>
                        <span className={styles['item-title']}>
                            Процентная ставка
                        </span>
                        <p className={styles['result']}>{rate}%</p>
                    </li>
                    <li className={styles['item']}>
                        <span className={styles['item-title']}>
                            Сумма через{' '}
                            <span>{period && normalizeDay(period)}</span>
                        </span>
                        <p className={styles['result']}>{depSumm}</p>
                    </li>
                    <li className={styles['item']}>
                        <span className={styles['item-title']}>Доход</span>
                        <p className={styles['result']}>{profit}</p>
                    </li>
                </ul>
            </Box>
        </>
    );
};

export default DepositResult;
