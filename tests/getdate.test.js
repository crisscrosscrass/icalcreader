const getdate = require("../services/getdate");
test('get the properly date formatted number', () => {
    expect(getdate('20200916')).toBe('09/16/2020');
})
test('get the right length of date', () => {
    expect(getdate('20200101')).toHaveLength(10);
})