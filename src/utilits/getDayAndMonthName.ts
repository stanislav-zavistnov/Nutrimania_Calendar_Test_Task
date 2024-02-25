export function getDayAndMonthName(date: Date): { day: number, monthName: string } {
    const day: number = date.getDate();
    const monthNames: string[] = [
        "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ];
    const monthIndex: number = date.getMonth();
    const monthName: string = monthNames[monthIndex];
    return { day, monthName };
}