export function getMonthName(date: Date): string {
    const monthNames: string[] = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    const monthIndex: number = date.getMonth();
    return monthNames[monthIndex];
}