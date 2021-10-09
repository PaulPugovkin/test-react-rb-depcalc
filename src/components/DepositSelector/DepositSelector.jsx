import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userDepositType } from '../../redux/deposit/deposit-actions';
import PropTypes from 'prop-types';

import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import styles from './DepositSelector.module.css';

import data from '../../data/depcalc.json';

const { deposits } = data;

const DepositSelector = ({ title }) => {
    const dispatch = useDispatch();

    const [depositType, setDepositType] = useState('standart');

    const handleChange = event => {
        setDepositType(event.target.value);
        dispatch(userDepositType(event.target.value));
    };

    return (
        <>
            <h2>{title}</h2>
            <Box
                sx={{
                    width: '490px',
                    marginTop: '34px',
                    marginBottom: '34px',
                }}
            >
                <FormControl fullWidth className={styles.form}>
                    <InputLabel id="demo-simple-select-label">
                        Выберите вклад
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={depositType}
                        label="Выберите вклад"
                        onChange={handleChange}
                    >
                        {deposits.map(({ code, name }) => (
                            <MenuItem key={code} value={code}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
};

DepositSelector.propTypes = {
    styles: PropTypes.object,
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
    depositType: PropTypes.string,
    handleChange: PropTypes.func,
    title: PropTypes.string,
};

export default DepositSelector;
