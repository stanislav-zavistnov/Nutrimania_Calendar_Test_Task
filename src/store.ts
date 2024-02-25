import { ActionCreator, AnyAction, Reducer } from "redux";
import { IDayOfMonth, getMonthDays } from "./utilits/getMonthDays";

export type RootState = {
    calendarIsOpen: boolean,
    currentDate: Date,
    monthsStore: Array<IMonthData> | [],
}

export interface IMonthData {
    id: string,
    daysArr: Array<IDayOfMonth>
}

const initialState: RootState = {
    calendarIsOpen: false,
    currentDate: new Date,
    monthsStore: [],
}

function fillMonthsStore() {
    const startYear = 2023;
    const startMonth = 1;
    const endYear = 2024;
    const endMonth = 3;
    const monthsStore: IMonthData[] = [];

    for (let year = endYear; year >= startYear; year--) {
        const endMonthOfThisYear = year === endYear ? endMonth : 12;
        const startMonthOfThisYear = year === startYear ? startMonth : 1;

        for (let month = endMonthOfThisYear; month >= startMonthOfThisYear; month--) {
            const monthString = `${month < 10 ? '0' : ''}${month}.${year}`;
            const daysArr = getMonthDays(month, year);
            monthsStore.push({ id: monthString, daysArr });
        }
    }

    return monthsStore;
}
const storedData = localStorage.getItem('myData');
const parsedData = storedData ? JSON.parse(storedData) : '';
parsedData ? initialState.monthsStore = parsedData : initialState.monthsStore = fillMonthsStore();

const SET_CURRENT_DAY = 'SET_CURRENT_DAY';
const SET_CALENDAR_STATUS = 'SET_CALENDAR_STATUS';
const UPDATE_DAY_STATUS = 'UPDATE_DAY_STATUS';

export const setCurrentDay: ActionCreator<AnyAction> = (newCurrentDay: Date) => ({
    type: SET_CURRENT_DAY,
    newCurrentDay,
});

export const setCalendarStatus: ActionCreator<AnyAction> = (status: boolean) => ({
    type: SET_CALENDAR_STATUS,
    status,
});

export const updateDayStatus: ActionCreator<AnyAction> = (id: number, status: string) => ({
    type: UPDATE_DAY_STATUS,
    id,
    status,
});

export const rootReducer: Reducer<RootState> = (state: RootState = initialState, action: AnyAction) => {
    let updatedMonthsStore;
    switch (action.type) {
        case SET_CURRENT_DAY:
            return {
                ...state,
                currentDate: action.newCurrentDay,
            };
        case SET_CALENDAR_STATUS:
            return {
                ...state,
                calendarIsOpen: action.status,
            };
        case UPDATE_DAY_STATUS:
            updatedMonthsStore = state.monthsStore.map(monthData => {
                const updatedDaysArr = monthData.daysArr.map(day => {
                    if (day.id === action.id) {
                        return { ...day, status: action.status };
                    }
                    return day;
                });
                return { ...monthData, daysArr: updatedDaysArr };
            });
            localStorage.setItem('myData', JSON.stringify(updatedMonthsStore));
            return {
                ...state,
                monthsStore: updatedMonthsStore,
            };
        default:
            return state;
    }
}