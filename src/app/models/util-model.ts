export interface WorkHoursDB{
    id: number,
    day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN",
    startTime: string,
    endTime: string,
    spotId: number
}
