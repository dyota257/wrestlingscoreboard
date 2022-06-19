const importMatches = require('../importMatches.js');

describe('importMatches()', () => {
    let rawText = `Category	Round	Mat A		Wrestler 1	Wrestler 2
        Snr 65kg	R1	A	1	Jamil Vacca (GLAD)	Thomas Leaver (SUBI)
        Snr 65kg	R1	A	2	Stephen Erceg (GLAD)	Dyota Tanuwibawa (SUBI)
        Snr 65kg	R1	A	3	Scott Miotto (AWT)	Taaniel Piiskoppel (AWT)
        Snr 74kg	R1	A	4	Shaun Johnston (GLAD)	Abdalla Biayda (PUNISH)
        Snr 74kg	R1	A	5	Oliver Hickey (SUBI)	SCRATCH
    `;

    let result = importMatches(rawText);

    it('takes text of the right format and formats it into the right VALUES clause for the SQL query', () => {

        let expected = `
        (
            "Category",
            "Round",
            "Mat A",
            0,
            "Wrestler 1",
            "Wrestler",
            "1",
            "wrestler1",
            " - ",
            "Wrestler 2",
            "Wrestler",
            "2",
            "wrestler2",
            " - "
        ),
        (
            "        Snr 65kg",
            "R1",
            "A",
            1,
            "Jamil Vacca",
            "Jamil",
            "Vacca",
            "jamilvacca",
            "GLAD",
            "Thomas Leaver",
            "Thomas",
            "Leaver",
            "thomasleaver",
            "SUBI"
        ),
        (
            "        Snr 65kg",
            "R1",
            "A",
            2,
            "Stephen Erceg",
            "Stephen",
            "Erceg",
            "stephenerceg",
            "GLAD",
            "Dyota Tanuwibawa",
            "Dyota",
            "Tanuwibawa",
            "dyotatanuwibawa",
            "SUBI"
        ),
        (
            "        Snr 65kg",
            "R1",
            "A",
            3,
            "Scott Miotto",
            "Scott",
            "Miotto",
            "scottmiotto",
            "AWT",
            "Taaniel Piiskoppel",
            "Taaniel",
            "Piiskoppel",
            "taanielpiiskoppel",
            "AWT"
        ),
        (
            "        Snr 74kg",
            "R1",
            "A",
            4,
            "Shaun Johnston",
            "Shaun",
            "Johnston",
            "shaunjohnston",
            "GLAD",
            "Abdalla Biayda",
            "Abdalla",
            "Biayda",
            "abdallabiayda",
            "PUNISH"
        ),
        (
            "        Snr 74kg",
            "R1",
            "A",
            5,
            "Oliver Hickey",
            "Oliver",
            "Hickey",
            "oliverhickey",
            "SUBI",
            "SCRATCH",
            "",
            "SCRATCH",
            "scratch",
            " - "
        )`;
        expect(result).toEqual(expected);
    });

    it("doesn't have a trailing comma", () => {
        let lastCharacter = result[result.length-1]

        expect(lastCharacter).not.toEqual(",")
    });
    
});