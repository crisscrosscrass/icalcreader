const formattinginputdate = require('../services/formattinginputdate')
test('get the properly date formatted number', () => {
    expect(formattinginputdate('2020/09/16')).toBe('09/16/2020');
})