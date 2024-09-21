export function isLessThan30DaysFromNow(futureTimestamp: number) {
    const currentTimestamp = Date.now();
    const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000; 

    return (futureTimestamp - currentTimestamp) < thirtyDaysInMilliseconds;
}
