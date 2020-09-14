function isInRange(startD, endD, startDate, endDate) {
    return (startD >= startDate && startD <= endDate) ||
        (startDate >= startD && startDate <= endD);
}

module.exports = isInRange