import { useState } from 'react';
import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from '@material-ui/core';
import data from '../../data/depcalc.json';

const { deposits } = data;

const DepositSelector = () => {
    const [depositType, setDepositType] = useState('');

    const handleChange = event => {
        setDepositType(event.target.value);
    };

    return (
        <>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Выберите вклад
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={depositType}
                        label="Вклад"
                        onChange={handleChange}
                    >
                        {deposits.map(({ code, name }) => (
                            <MenuItem key={code} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
};

export default DepositSelector;
