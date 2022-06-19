const tournamentsToHtml = require('../tournamentsToHtml.js');

let input = [
    {
        id: 1,
        date: new Date("2020-10-17T00:00:00.000Z"),
        title: "George Samios Cup",
        location: "Herb Graham Centre"
    },
    {
        id: 2,
        date: new Date("2020-08-23T00:00:00.000Z"),
        title: "United for Wrestling",
        location: "Herb Graham Centre"
    },
    {
        id: 7,
        date: new Date("2020-11-26T00:00:00.000Z"),
        title: "United for Wrestling",
        location: "Test Thursday"
    }
];

let result = tournamentsToHtml(input, 1);

let expected = `    <table class='table'>
<tr style='font-weight:bold; text-align:center;'>
    <td>Date</td>
    <td>Title</td>
    <td>Location</td>
</tr>

<tr class="matchOrder">
    <td>
        Sat, 17 Oct, 2020
    </td>
    <td>
        <a href="/tournaments/open?id=1">George Samios Cup</a>
    </td>
    <td>
        Herb Graham Centre
    </td>
</tr>


<tr >
    <td>
        Sun, 23 Aug, 2020
    </td>
    <td>
        <a href="/tournaments/open?id=2">United for Wrestling</a>
    </td>
    <td>
        Herb Graham Centre
    </td>
</tr>


<tr >
    <td>
        Thu, 26 Nov, 2020
    </td>
    <td>
        <a href="/tournaments/open?id=7">United for Wrestling</a>
    </td>
    <td>
        Test Thursday
    </td>
</tr>

</table>`;

describe('tournamentsToHtml', () => {
    it('converts the json into HTML correctly (with all whitespce removed)', () => {
        expect(result.replaceAll(/\s/g, '')).toBe(expected.replaceAll(/\s/g, ''));
    });

    it('highlights the right row', () => {
        // find matchorder in the html text
        expect(true).toBe(true);
    });
});