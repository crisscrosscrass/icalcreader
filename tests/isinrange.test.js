const inInRange = require('../services/isinrange')
test('check seached date is in given range', () => {
    expect(inInRange('20200904', '20200904', '20200903', '20200906')).toBe(true);
})