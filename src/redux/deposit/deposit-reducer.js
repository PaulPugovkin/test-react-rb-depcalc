import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
    userDepositProperties,
    userDepositType,
    modal,
} from './deposit-actions';

const selectedProperties = createReducer('', {
    [userDepositProperties]: (_, { payload }) => ({ ...payload }),
});
const selectedDeposit = createReducer('unic', {
    [userDepositType]: (_, { payload }) => payload,
});

const isModal = createReducer(false, {
    [modal]: (_, { payload }) => payload,
});

export default combineReducers({
    selectedProperties,
    selectedDeposit,
    isModal,
});
