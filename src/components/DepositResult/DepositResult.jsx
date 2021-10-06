import { Box } from '@mui/material';
import styles from './DepositResult.module.css';

import { useSelector } from 'react-redux';

const DepositResult = () => {
    const { summ, period } = useSelector(
        state => state.depositCalc.selectedProperties,
    );

    const depSumm = (((summ * 0.05) / 356) * period + summ).toLocaleString();
    const profit = (((summ * 0.05) / 356) * period).toLocaleString();

    return (
        <>
            <Box>
                <ul className={styles['list']}>
                    <li className={styles['item']}>
                        <span className={styles['item-title']}>
                            Процентная ставка
                        </span>
                        <p className={styles['result']}>5%</p>
                    </li>
                    <li className={styles['item']}>
                        <span className={styles['item-title']}>
                            Сумма через <span>{period} дней</span>
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
