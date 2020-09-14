function getDate(date) {
    // expect to get a String like 20201021
    date === undefined ? date = "000000" : ""
    return `${date.slice(4, 6)}/${date.slice(6, 8)}/${date.slice(0, 4)}`;
}

module.exports = getDate