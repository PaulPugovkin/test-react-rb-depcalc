import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDepositProperties } from '../../redux/deposit/deposit-actions';

import deposit from '../../utils/deposit';

import styles from './DepositSlider.module.css';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Slider, Box } from '@mui/material';

const { getDepositByCode, getDepositMinPeriod, getDepositMinSumm } = deposit;

const MAX_SUMM = 10000000;

const DepositProperties = () => {
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
    }, [userData.period]);

    useEffect(() => {
        setUserData(state => ({
            ...state,
            period: getDepositMinPeriod(depositType),
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
                                Срок вклада
                            </li>
                            <li className={styles['description-value']}>
                                {userData.period}
                            </li>
                        </ul>
                        <Slider
                            className={styles.slider}
                            name="period"
                            onChange={handleChange}
                            defaultValue={minPeriod}
                            min={minPeriod}
                            max={356}
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
                                Сумма вклада
                            </li>
                            <li className={styles['description-value']}>
                                {userData?.summ.toLocaleString()} Р
                            </li>
                        </ul>
                        <Slider
                            className={styles.slider}
                            name="summ"
                            onChange={handleChange}
                            defaultValue={minSumm}
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

export default DepositProperties;
