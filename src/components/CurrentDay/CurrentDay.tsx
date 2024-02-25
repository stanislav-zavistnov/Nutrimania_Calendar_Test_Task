import { useDispatch } from 'react-redux';
import styles from './currentday.module.css';
import { useSelector } from 'react-redux';
import { IMonthData, RootState, updateDayStatus } from '../../store';
import { IDayOfMonth } from '../../utilits/getMonthDays';
import { formatDate } from '../../utilits/formatDate';

export function CurrentDay() {
    const dispatch = useDispatch();
    const currentDay = useSelector<RootState, Date>(state => state.currentDate);
    const monthsStore = useSelector<RootState, Array<IMonthData>>(state => state.monthsStore);
    function findMonthData(monthsStore: IMonthData[], id: string): IDayOfMonth[] {
        const monthData = monthsStore.find(monthData => monthData.id === id);
        if (monthData) {
            return monthData.daysArr;
        } else {
            return [];
        }
    }
    const currentDaysArray = findMonthData(monthsStore, formatDate(currentDay));
    function getSearchId(date: Date) {
        const newDate = new Date(date);
        const result = newDate.setHours(12, 0, 0, 0);
        return result;
    }
    function findDayOfMonthById(monthDays: IDayOfMonth[], id: number): IDayOfMonth | undefined {
        return monthDays.find(day => day.id === id);
    }
    const currentDayObject = findDayOfMonthById(currentDaysArray, getSearchId(currentDay));
    const handleUpdateStatus = (arg: string) => {
        const id = getSearchId(currentDay);
        dispatch(updateDayStatus(id, arg));
    }
    return (
        <div className={styles.menu}>
            {currentDayObject?.status === 'default' && (
                <div className={styles.menu}>
                    <button className={styles.btn} onClick={() => { handleUpdateStatus('green') }}>
                        <p className={styles.btn__descr_green}>VAR_GREEN</p>
                    </button>
                    <button className={styles.btn} onClick={() => { handleUpdateStatus('orange') }}>
                        <p className={styles.btn__descr_orange}>VAR_ORANGE</p>
                    </button>
                    <button className={styles.btn} onClick={() => { handleUpdateStatus('grey') }}>
                        <p className={styles.btn__descr_grey}>VAR_GREY</p>
                    </button>
                </div>
            )}
            {currentDayObject?.status !== 'default' && (
                <button className={styles.resetBtn} onClick={() => { handleUpdateStatus('default') }}>
                    reset
                </button>
            )}
            {currentDayObject?.status === 'green' && (
                <button className={styles.btn} onClick={() => { handleUpdateStatus('green') }}>
                    <p className={styles.btn__descr_green}>VAR_GREEN</p>
                </button>
            )}
            {currentDayObject?.status === 'grey' && (
                <button className={styles.btn} onClick={() => { handleUpdateStatus('grey') }}>
                    <p className={styles.btn__descr_grey}>VAR_GREY</p>
                </button>
            )}
            {currentDayObject?.status === 'orange' && (
                <button className={styles.btn} onClick={() => { handleUpdateStatus('orange') }}>
                    <p className={styles.btn__descr_orange}>VAR_ORANGE</p>
                </button>
            )}
        </div>
    );
}