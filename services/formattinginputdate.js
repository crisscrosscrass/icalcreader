function formattingInputDate(today) {
    return `${today.slice(5, 7)}/${today.slice(8, 10)}/${today.slice(0, 4)}`;
}

module.exports = formattingInputDate