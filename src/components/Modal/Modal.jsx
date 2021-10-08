import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { modal } from '../../redux/deposit/deposit-actions';
import styles from './Modal.module.css';
import deposit from '../../utils/deposit';

const { normalizeDay } = deposit;
const modalRoot = document.getElementById('modal-root');

const Modal = props => {
    const { depSumm, profit, rate } = props;

    const dispatch = useDispatch();
    const { period, summ } = useSelector(
        state => state.depositCalc.selectedProperties,
    );

    return createPortal(
        <div className="Overlay">
            <div className="Modal">
                <h2 className={styles.printTitle}>
                    Предварительный расчет вашего депозита
                </h2>
                <ul className={styles.resultList}>
                    <li className={styles.resultItem}>
                        Вы вложите:{' '}
                        <span className={styles.item}>
                            {summ.toLocaleString('ru-RU', {
                                style: 'currency',
                                currency: 'RUB',
                            })}
                        </span>
                    </li>
                    <li className={styles.resultItem}>
                        Процентная ставка:{' '}
                        <span className={styles.item}>{rate}%*</span>
                    </li>
                    <li className={styles.resultItem}>
                        Столько дней ваши деньги будут работать:{' '}
                        <span className={styles.item}>
                            {normalizeDay(period)}**
                        </span>
                    </li>
                    <li className={styles.resultItem}>
                        Столько денег вы заработаете:{' '}
                        <span className={styles.item}>{profit}***</span>
                    </li>
                    <li className={styles.resultItem}>
                        Такая будет общая сумма к выплате:{' '}
                        <span className={styles.item}>{depSumm}****</span>
                    </li>
                </ul>
                <p>
                    *Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Magni, repudiandae!
                </p>
                <p>
                    **Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt unde, aliquam mollitia officiis libero earum?
                </p>
                <p>
                    ***Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Similique, nostrum!
                </p>
                <p>
                    ****Lorem, ipsum dolor sit amet consectetur adipisicing
                    elit. Sequi necessitatibus numquam harum adipisci tempora
                    quisquam iure, praesentium laboriosam illum quia ipsum
                    deserunt blanditiis magni, sunt quis labore nulla dicta
                    fugit.
                </p>
                <div className={styles.buttonsWrapper}>
                    <button
                        className={styles.printButton}
                        onClick={() => window.print()}
                    >
                        Распечатать
                    </button>
                    <button
                        className={styles.closeButton}
                        type="button"
                        onClick={() => {
                            dispatch(modal(false));
                        }}
                    >
                        Назад к расчету
                    </button>
                </div>
            </div>
        </div>,
        modalRoot,
    );
};

export default Modal;
