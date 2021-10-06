import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { userDepositProperties, userDepositType } from './deposit-actions';

const selectedProperties = createReducer('', {
    [userDepositProperties]: (_, { payload }) => ({ ...payload }),
});
const selectedDeposit = createReducer('unic', {
    [userDepositType]: (_, { payload }) => payload,
});

export default combineReducers({
    selectedProperties,
    selectedDeposit,
});
