import { useSelector } from 'react-redux';
import { IDayOfMonth } from '../../utilits/getMonthDays';
import styles from './calendar.module.css';
import { IMonthData, RootState, setCalendarStatus, setCurrentDay } from '../../store';
import { getMonthName } from '../../utilits/getMonthName';
import { formatDate } from '../../utilits/formatDate';
import { getDateWithoutTime } from '../../utilits/getDateWithoutTime';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export function Calendar() {
    const dispatch = useDispatch();
    const currentDay = useSelector<RootState, Date>(state => state.currentDate);
    const todayDate = new Date();
    const currentDayAtTwelve = currentDay.setHours(12, 0, 0, 0);
    const [choosenDay, setChoosenDay] = useState(currentDayAtTwelve);
    const currentMonth = getMonthName(currentDay);
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
    const todayDateForCompare = getDateWithoutTime(todayDate).getTime();
    function handleSetPrevMonthClick() {
        const newDate = new Date(currentDay);
        newDate.setMonth(newDate.getMonth() - 1);
        dispatch(setCurrentDay(newDate));
    }
    function handleSetNextMonthClick() {
        const newDate = new Date(currentDay);
        newDate.setMonth(newDate.getMonth() + 1);
        dispatch(setCurrentDay(newDate));
    }
    function handleSetCalendarStatus() {
        const newDate = new Date(choosenDay);
        dispatch(setCurrentDay(newDate));
        dispatch(setCalendarStatus(false));
    }
    function hendleSetChoosenDay(arg: number, marker: number) {
        const argToDate = new Date(arg);
        const compareDate = getDateWithoutTime(argToDate).getTime();
        if (compareDate > todayDateForCompare || !marker) {
            return
        }
        setChoosenDay(arg);
    }
    function compareMonthsAndYears(date1: Date, date2: Date) {
        const year1 = date1.getFullYear();
        const month1 = date1.getMonth();
        const year2 = date2.getFullYear();
        const month2 = date2.getMonth();

        if (year1 === year2 && month1 === month2) {
            return true;
        } else {
            return false;
        }
    }
    function fillMyCalendar(array: Array<IDayOfMonth>) {
        return (
            array.map((item: IDayOfMonth) => {
                const itemDayCompare = getDateWithoutTime(new Date(item.id)).getTime();
                const itemDate = new Date(item.id);
                const itemDateAtTwelve = itemDate.setHours(12, 0, 0, 0);
                const todayDateAtTwelve = itemDate.setHours(12, 0, 0, 0);
                return (
                    <div key={item.id || item.reservId}
                        className={`${styles.dateRowCell} ${choosenDay === todayDateAtTwelve ? styles.active : ''}`}
                        onClick={() => { hendleSetChoosenDay(itemDateAtTwelve, item.dayOfMonth) }}>
                        <span className={`${styles.dateRow__date} 
                        ${item.dayOfWeek === 'Saturday' || item.dayOfWeek === 'Sunday' ? styles.weekend : ''}`}>
                            {item.dayOfMonth ? item.dayOfMonth : ''}
                        </span>
                        {item.dayOfMonth && itemDayCompare <= todayDateForCompare
                            ? <span className={`
                                ${styles.dateRow__line} 
                                ${item.status === 'green' ? styles.green : ''}
                                ${item.status === 'orange' ? styles.orange : ''}`} />
                            : ''}
                    </div>
                );
            })
        );
    }
    return (
        <div className={styles.calendarWrap}>
            <div className={styles.calendar}>
                <h2 className={styles.calendar__title}>
                    Календарь
                </h2>
                <div className={styles.calendar__nav}>
                    <button className={styles.btn} onClick={handleSetPrevMonthClick}>
                        <span className={styles.btn__prev}></span>
                    </button>
                    <p className={styles.descr}>
                        {currentMonth}
                    </p>
                    <button className={styles.btn}
                        onClick={handleSetNextMonthClick}
                        disabled={compareMonthsAndYears(todayDate, currentDay)}>
                        <span className={styles.btn__next}></span>
                    </button>
                </div>
                <div className={styles.calendarGridWrap}>
                    <div className={styles.weekDaysWrap}>
                        <div>пн</div>
                        <div>вт</div>
                        <div>ср</div>
                        <div>чт</div>
                        <div>пт</div>
                        <div>сб</div>
                        <div>вс</div>
                    </div>
                </div>
                <div className={styles.datesWrap}>
                    <div className={styles.dateRow}>
                        {fillMyCalendar(currentDaysArray)}
                    </div>
                </div>
                <button className={styles.chooseBtn} onClick={handleSetCalendarStatus}>
                    Выбрать
                </button>
            </div>
        </div>
    );
}