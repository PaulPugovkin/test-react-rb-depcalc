import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import styles from './DepositResult.module.css';
import Modal from '../Modal';

import deposit from '../../utils/deposit';

import { modal } from '../../redux/deposit/deposit-actions.js';

const { getDepositRateBySummAndPeriod, getDepositByCode, normalizeDay } =
    deposit;

const DepositResult = () => {
    const dispatch = useDispatch();

    const [rate, setRate] = useState();
    const { selectedDeposit } = useSelector(state => state.depositCalc);
    const { isModal } = useSelector(state => state.depositCalc);

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
                            <button
                                className={styles['item-period']}
                                onClick={() => {
                                    dispatch(modal(true));
                                }}
                            >
                                {period && normalizeDay(period)}
                            </button>
                        </span>
                        <p className={styles['result']}>{depSumm}</p>
                    </li>
                    <li className={styles['item']}>
                        <span className={styles['item-title']}>Доход</span>
                        <p className={styles['result']}>{profit}</p>
                    </li>
                </ul>
            </Box>
            {isModal && <Modal depSumm={depSumm} profit={profit} rate={rate} />}
        </>
    );
};

DepositResult.propTypes = {
    styles: PropTypes.object,
    rate: PropTypes.number,
    selectedDeposit: PropTypes.string,
    isModal: PropTypes.bool,
    deposit: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
            param: PropTypes.arrayOf(
                PropTypes.shape({
                    period_from: PropTypes.number,
                    summs_and_rate: PropTypes.arrayOf(
                        PropTypes.shape({
                            summ_from: PropTypes.number,
                            rate: PropTypes.number,
                        }),
                    ),
                }),
            ),
        }),
    ),
    summ: PropTypes.number,
    period: PropTypes.number,
    userData: PropTypes.shape({
        period: PropTypes.number,
        summ: PropTypes.number,
    }),
    depSumm: PropTypes.string,
    profit: PropTypes.string,
};

export default DepositResult;
