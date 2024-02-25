import styles from './header.module.css';
import calendarIcon from '../../assets/images/calendar.svg';
import { useSelector } from 'react-redux';
import { RootState, setCalendarStatus, setCurrentDay } from '../../store';
import { getDayAndMonthName } from '../../utilits/getDayAndMonthName';
import { useDispatch } from 'react-redux';
import { getDateWithoutTime } from '../../utilits/getDateWithoutTime';

export function Header() {
    const dispatch = useDispatch();
    const currentDay = useSelector<RootState, Date>(state => state.currentDate);
    const todayDate = new Date();
    const currentDayForCompare = getDateWithoutTime(currentDay).getTime();
    const todayDateForCompare = getDateWithoutTime(todayDate).getTime();
    const { day, monthName } = getDayAndMonthName(currentDay);
    function handleSetPrevDayClick() {
        const newDate = new Date(currentDay);
        newDate.setDate(currentDay.getDate() - 1);
        dispatch(setCurrentDay(newDate));
    }
    function handleSetNextDayClick() {
        const newDate = new Date(currentDay);
        newDate.setDate(currentDay.getDate() + 1);
        dispatch(setCurrentDay(newDate));
    }
    function handleSetCalendarStatus() {
        dispatch(setCalendarStatus(true));
    }
    return (
        <div className={styles.header}>
            <button className={styles.btn} onClick={handleSetPrevDayClick}>
                <span className={`${styles.arrow} ${styles.prev}`}></span>
            </button>
            <button className={styles.calendarBtn} onClick={handleSetCalendarStatus}>
                <img className={styles.calendarBtn__img} src={calendarIcon} alt="date" />
                <p className={styles.calendarBtn__descr}>
                    {`${day} ${monthName}`}
                </p>
            </button>
            <button className={styles.btn}
                onClick={handleSetNextDayClick}
                disabled={currentDayForCompare === todayDateForCompare}>
                <span className={`${styles.arrow} ${styles.next}`}></span>
            </button>
        </div>
    );
}