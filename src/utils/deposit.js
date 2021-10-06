import data from '../data/depcalc.json';

const { deposits } = data;

const deposit = {
    getDepositByCode: selectedDeposit => {
        let params;
        deposits.map(({ code, param }) => {
            if (code !== selectedDeposit) return;
            params = param;
        });
        return params;
    },
    getDepositMinPeriod: data => {
        const newArr = [];
        data.map(({ period_from }) => newArr.push(period_from));
        return newArr[0];
    },
    getDepositPeriods: data => {
        const newArr = [];
        data.map(({ period_from }) => {
            newArr.push(period_from);
        });
        return newArr;
    },
    getSelectedPeriod: (data, userData) => {
        const period = [];
        data.map(({ period_from }) => {
            if (userData.period - period_from >= 0) {
                period.splice(0, 1, period_from);
                return period;
            }
        });
        return period[0];
    },
    getDepositMinSumm: (data, userData) => {
        const minSumm = [];
        data.map(({ period_from, summs_and_rate }) => {
            if (period_from === deposit.getSelectedPeriod(data, userData)) {
                summs_and_rate.map(({ summ_from }) => {
                    minSumm.push(summ_from);
                    return minSumm;
                });
            }
        });
        return minSumm[0];
    },
};

// перебираемая сумма меньше значения пользователя
export default deposit;
