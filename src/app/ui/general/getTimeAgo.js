import moment from "moment";

export function getTimeAgo(date) {

    if (!date) return 'null';

    // Get time ago
    const getTime = moment(date);
    const duration = moment.duration(moment().diff(getTime));

    const daysAgo = duration.days();
    const hoursAgo = duration.hours();
    const minutesAgo = duration.minutes();
    const secondsAgo = duration.seconds();

    return daysAgo ? `${daysAgo}d` : hoursAgo ? `${hoursAgo}h` : minutesAgo ? `${minutesAgo}m` : secondsAgo ? `${secondsAgo}s` : 'few'
}