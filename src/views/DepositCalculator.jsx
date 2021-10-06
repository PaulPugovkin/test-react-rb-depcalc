import DepositSelector from '../components/DepositSelector';
import DepositSlider from '../components/DepositSlider/';
import DepositResult from '../components/DepositResult';
import DepositInformation from '../components/DepositInformation/';

import { Box } from '@material-ui/core';

import styles from './DepositCalculator.module.css';

const DepositCalculator = () => {
    return (
        <div className={styles.container}>
            <Box
                sx={{
                    width: '534px',
                    padding: '50px 107px 86px 28px',
                }}
            >
                <DepositSelector title="Депозитный калькулятор" />
                <DepositSlider />
                <DepositResult />
            </Box>
            <Box>
                <DepositInformation />
            </Box>
        </div>
    );
};

export default DepositCalculator;
