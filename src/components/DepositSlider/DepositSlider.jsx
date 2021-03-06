import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDepositProperties } from '../../redux/deposit/deposit-actions';
import PropTypes from 'prop-types';

import deposit from '../../utils/deposit';

import styles from './DepositSlider.module.css';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Slider, Box } from '@mui/material';

const {
    getDepositByCode,
    getDepositMinPeriod,
    getDepositMinSumm,
    normalizeDay,
} = deposit;

const MAX_SUMM = 99999999;

const DepositSlider = () => {
    const { selectedDeposit } = useSelector(state => state.depositCalc);
    const [minPeriod, setMinPeriod] = useState(1);
    const [minSumm, setMinSumm] = useState();
    const [userData, setUserData] = useState({
        period: 1,
        summ: 500000,
    });

    const depositType = getDepositByCode(selectedDeposit);

    const dispatch = useDispatch();

    const handleChange = e => {
        setUserData(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        setMinSumm(getDepositMinSumm(depositType, userData));
        setUserData(state => ({
            ...state,
            summ:
                getDepositMinSumm(depositType, userData) < state.summ
                    ? state.summ
                    : getDepositMinSumm(depositType, userData),
        }));
    }, [userData.period]);

    useEffect(() => {
        setMinSumm(getDepositMinSumm(depositType, userData));
        setUserData(state => ({
            ...state,
            period:
                getDepositMinPeriod(depositType) < state.period
                    ? state.period
                    : getDepositMinPeriod(depositType),
            summ:
                getDepositMinSumm(depositType, userData) > state.summ
                    ? getDepositMinSumm(depositType, userData)
                    : state.summ,
        }));
        setMinPeriod(getDepositMinPeriod(depositType));
    }, [selectedDeposit]);

    useEffect(() => dispatch(userDepositProperties(userData)), [userData]);

    return (
        <div>
            {selectedDeposit && (
                <Box
                    sx={{
                        width: '534px',
                        marginBottom: '56px',
                    }}
                >
                    <Box sx={{ width: '490px', position: 'relative' }}>
                        <ul className={styles['slider-description']}>
                            <li className={styles['description-title']}>
                                ???????? ????????????
                            </li>
                            <li className={styles['description-value']}>
                                {normalizeDay(userData.period)}
                            </li>
                        </ul>
                        <Slider
                            className={styles.slider}
                            name="period"
                            onChange={handleChange}
                            defaultValue={minPeriod}
                            value={userData.period}
                            min={minPeriod}
                            max={365}
                        />
                        <HtmlTooltip
                            title={
                                <>
                                    <Typography color="inherit">
                                        <h3>Tooltip</h3>
                                    </Typography>
                                    <span>Tooltip text</span>
                                </>
                            }
                        >
                            <Button>?</Button>
                        </HtmlTooltip>
                    </Box>

                    <Box sx={{ width: '490px', position: 'relative' }}>
                        <ul className={styles['slider-description']}>
                            <li className={styles['description-title']}>
                                ?????????? ????????????
                            </li>
                            <li className={styles['description-value']}>
                                {userData.summ ? (
                                    userData?.summ.toLocaleString('ru-RU', {
                                        style: 'currency',
                                        currency: 'RUB',
                                    })
                                ) : (
                                    <span>load</span>
                                )}{' '}
                            </li>
                        </ul>
                        <Slider
                            className={styles.slider}
                            name="summ"
                            onChange={handleChange}
                            defaultValue={minSumm}
                            value={userData.summ}
                            min={minSumm}
                            max={MAX_SUMM}
                            step={100000}
                        />
                        <HtmlTooltip
                            title={
                                <>
                                    <Typography color="inherit">
                                        <h3>Tooltip</h3>
                                    </Typography>
                                    <span>Tooltip text</span>
                                </>
                            }
                        >
                            <Button className={styles.tooltip}>?</Button>
                        </HtmlTooltip>
                    </Box>
                </Box>
            )}
        </div>
    );
};

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip
        {...props}
        className={styles.tooltip}
        sx={{
            position: 'absolute',
            top: 0,
            right: '-40px',
            minWidth: '24px',
            padding: '4px 8px',
            fontSize: '14px',
            lineHeight: '16px',
            bgcolor: '#f1f5f7',
            borderRadius: '12px',
        }}
        placement={'right-start'}
        arrow={true}
        classes={{ popper: className }}
    />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.87)',
        width: 234,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        boxShadow: '0px 5px 21px rgba(0, 0, 0, 0.1)',
    },
}));

DepositSlider.propTypes = {
    deposit: PropTypes.objectOf(PropTypes.func),
    MAX_SUMM: PropTypes.number,
    selectedDeposit: PropTypes.string,
    minPeriod: PropTypes.number,
    setMinPeriod: PropTypes.func,
    minSumm: PropTypes.number,
    setMinSumm: PropTypes.func,
    userData: PropTypes.shape({
        period: PropTypes.number,
        summ: PropTypes.number,
    }),
    setUserData: PropTypes.func,
    depositType: PropTypes.arrayOf(
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
};

export default DepositSlider;
