import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

const modalRoot = document.getElementById('modal-root');

const Modal = (onClose, handleBackdropClick) => {
    const { selectedDeposit } = useSelector(state => state.depositCalc);
    const { period, summ } = useSelector(
        state => state.depositCalc.selectedProperties,
    );

    const data = { deposit: selectedDeposit, period: period, summ: summ };

    return createPortal(
        <div
            className="Overlay"
            onClose={onClose}
            onClick={handleBackdropClick}
        >
            <div className="Modal">
                <h2>Предварительный расчет вашего депозита</h2>
                <h3>{data.deposit}</h3>
                <ul>
                    <li>Вы вложите: {summ}</li>
                    <li>Процентная ставка: </li>
                    <li>Столько дней ваши деньги будут работать: {period}</li>
                    <li>Столько денег вы заработаете: </li>
                    <li>Такая будет общая сумма к выплате: </li>
                </ul>
            </div>
        </div>,
        modalRoot,
    );
};

export default Modal;
