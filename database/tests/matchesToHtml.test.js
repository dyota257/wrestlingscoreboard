const matchesToHtml = require('../matchesToHtml.js');

describe('the function', () => {
    let input = [
        { category: "Snr GR M 67kg", round: "R2", mat: "A", id: 12, red_name: "Jamil Vacca", red_firstname: "Jamil", red_lastname: "Vacca", red_fullname: "jamilvacca", red_club: "GLAD", blue_name: "Yit Yun Alister Yong", blue_firstname: "Yit Yun Alister", blue_lastname: "Yong", blue_fullname: "yityun alister yong", blue_club: "WOLF)" },
        { category: "Snr FS M 79kg", round: "R2", mat: "A", id: 13, red_name: "Zia Wakili", red_firstname: "Zia", red_lastname: "Wakili", red_fullname: "ziawakili", red_club: "FREO", blue_name: "Michael Fragomeni", blue_firstname: "Michael", blue_lastname: "Fragomeni", blue_fullname: "michaelfragomeni", blue_club: "GLAD)" },
        { category: "Snr FS M 79kg", round: "R2", mat: "A", id: 14, red_name: "Nima Behrouz", red_firstname: "Nima", red_lastname: "Behrouz", red_fullname: "nimabehrouz", red_club: "GLAD", blue_name: "Quilliam Salkilld", blue_firstname: "Quilliam", blue_lastname: "Salkilld", blue_fullname: "quilliamsalkilld", blue_club: "WOLF)" }
    ];

    let result = matchesToHtml(input);

    let expected = `<table class="table" name='list'>
    <tr class="header mobile" style='font-weight:bold; text-align:center;'>
        <td>Category</td>
        <td>Round</td>
        <td>Red</td>
        <td>Red Club</td>
        <td>Blue</td>
        <td>Blue Club</td>
    </tr>
    <tr matchOrder="0">
        <td data-label="id" style="display:none" >
            12
        </td>
        <td data-label="mat" style="display:none" >
            A
        </td>

        <td class="mobile" data-label="category">
            Snr GR M 67kg
        </td>
        <td class="mobile" data-label="round">
            R2
        </td>
        <td data-label="red_name" style='color:#f00;'>
            Jamil Vacca
        </td>
        <td data-label="red_firstname" style='color:#f00;display:none'>
            Jamil
        </td>
        <td data-label="red_lastname" style='color:#f00;display:none'>
            Vacca
        </td>
        <td class="mobile" data-label="red_club" style='color:#f00;'>
            GLAD
        </td>
        <td data-label="blue_name" style='color:#00f;'>
            Yit Yun Alister Yong
        </td>
        <td data-label="blue_firstname" style='color:#00f;display:none'>
            Yit Yun Alister
        </td>
        <td data-label="blue_lastname" style='color:#00f;display:none'>
            Yong
        </td>
        <td class="mobile" data-label="blue_club" style='color:#00f;'>
            WOLF
        </td>
    </tr>

    <tr matchOrder="1">
        <td data-label="id" style="display:none" >
            13
        </td>
        <td data-label="mat" style="display:none" >
            A
        </td>

        <td class="mobile" data-label="category">
            Snr FS M 79kg
        </td>
        <td class="mobile" data-label="round">
            R2
        </td>
        <td data-label="red_name" style='color:#f00;'>
            Zia Wakili
        </td>
        <td data-label="red_firstname" style='color:#f00;display:none'>
            Zia
        </td>
        <td data-label="red_lastname" style='color:#f00;display:none'>
            Wakili
        </td>
        <td class="mobile" data-label="red_club" style='color:#f00;'>
            FREO
        </td>
        <td data-label="blue_name" style='color:#00f;'>
            Michael Fragomeni
        </td>
        <td data-label="blue_firstname" style='color:#00f;display:none'>
            Michael
        </td>
        <td data-label="blue_lastname" style='color:#00f;display:none'>
            Fragomeni
        </td>
        <td class="mobile" data-label="blue_club" style='color:#00f;'>
            GLAD
        </td>
    </tr>

    <tr matchOrder="2">
        <td data-label="id" style="display:none" >
            14
        </td>
        <td data-label="mat" style="display:none" >
            A
        </td>

        <td class="mobile" data-label="category">
            Snr FS M 79kg
        </td>
        <td class="mobile" data-label="round">
            R2
        </td>
        <td data-label="red_name" style='color:#f00;'>
            Nima Behrouz
        </td>
        <td data-label="red_firstname" style='color:#f00;display:none'>
            Nima
        </td>
        <td data-label="red_lastname" style='color:#f00;display:none'>
            Behrouz
        </td>
        <td class="mobile" data-label="red_club" style='color:#f00;'>
            GLAD
        </td>
        <td data-label="blue_name" style='color:#00f;'>
            Quilliam Salkilld
        </td>
        <td data-label="blue_firstname" style='color:#00f;display:none'>
            Quilliam
        </td>
        <td data-label="blue_lastname" style='color:#00f;display:none'>
            Salkilld
        </td>
        <td class="mobile" data-label="blue_club" style='color:#00f;'>
            WOLF
        </td>
    </tr>

    </table>`;

    it('takes in the correct type of object', () => {
        expect(input[0].category).toEqual("Snr GR M 67kg");
    });

    it('takes json from the database and turns it into correct HTML (whitespace removed)', () => {
        // if the input and result had all of the whitespace removed, they would be equal
        expect(result.replaceAll(/\s/g, ''))
            .toEqual(expected.replaceAll(/\s/g, ''));
    });

    it('has no bracket characters anywhere', () => {

        // The parsing on blue_club is imperfect - make sure that it doesn't get through to the final view
        
        expect(result.indexOf('(')).toEqual(-1);
        expect(result.indexOf(')')).toEqual(-1);
    });
});