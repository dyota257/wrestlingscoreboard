const dateFormat = require('../../database/dateFormat.js');

describe('dateFormat() function', () => {
    it('changes a Date object into a correctly formatted string', () => {
        let testDate = new Date('2021-07-25T00:00:00Z');

        let formattedDate = dateFormat(testDate);
        expect(formattedDate).toEqual('Sun, 25 Jul, 2021');
    });
});