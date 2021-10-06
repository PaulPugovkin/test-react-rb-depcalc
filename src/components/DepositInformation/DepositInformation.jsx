import { Box } from '@mui/material';

import styles from './DepositInformation.module.css';

const DepositInformation = () => {
    return (
        <Box>
            <Box
                className={styles.logo}
                sx={{
                    height: '182px',
                    width: '290px',
                    boxShadow: '0px 9px 21px 2px rgba(60, 72, 104, 0.2)',
                }}
            ></Box>
            <Box className={styles.offer}>
                {/* <span className={styles.icon}>Inf</span> */}
                <p className={styles.text}>
                    Расчеты калькулятора являются предварительными. Для расчета
                    дохода применяются процентные ставки, действующие на момент
                    проведения расчетов.
                </p>
            </Box>
        </Box>
    );
};

export default DepositInformation;
