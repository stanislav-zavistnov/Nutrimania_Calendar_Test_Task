import { generateRandomString } from "./generateRandomString";

export interface IDayOfMonth {
    dayOfWeek: string,
    dayOfMonth: number,
    id: number,
    status: string,
    reservId: string,
}

// eslint-disable-next-line
export function getMonthDays(month: number, year: number): Array<IDayOfMonth> {
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthDays: Array<IDayOfMonth> = [];

    const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
    const startDay = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;

    for (let i = 1; i < startDay; i++) {
        monthDays.push({
            dayOfWeek: "",
            dayOfMonth: 0,
            id: 0,
            status: 'default',
            reservId: generateRandomString(),
        });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month - 1, i);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dayId = date.setHours(12, 0, 0, 0);

        monthDays.push({
            dayOfWeek: dayOfWeek,
            dayOfMonth: i,
            id: dayId,
            status: 'default',
            reservId: '',
        });
    }

    return monthDays;
}
