"use strict";

module.exports = matchesToHtml;

function matchesToHtml(x) {
  var tableRows = '';
  var colorRed = "color:#f00";
  var colorBlue = "color:#00f";

  for (i = 0; i < x.length; i++) {
    tableRows = tableRows + "\n        <tr matchOrder=\"".concat(i, "\">\n            <td data-label=\"id\" style=\"display:none\" >\n                ").concat(x[i].id, "\n            </td>\n            <td data-label=\"mat\" style=\"display:none\" >\n                ").concat(x[i].mat, "\n            </td>\n            \n            <td class=\"mobile\" data-label=\"category\">\n                ").concat(x[i].category, "\n            </td>\n            <td class=\"mobile\" data-label=\"round\">\n                ").concat(x[i].round, "\n            </td>\n            <td data-label=\"red_name\" style='").concat(colorRed, ";'>\n                ").concat(x[i].red_name, "\n            </td>\n            <td data-label=\"red_firstname\" style='").concat(colorRed, ";display:none'>\n                ").concat(x[i].red_firstname, "\n            </td>\n            <td data-label=\"red_lastname\" style='").concat(colorRed, ";display:none'>\n                ").concat(x[i].red_lastname, "\n            </td>\n            <td class=\"mobile\" data-label=\"red_club\" style='").concat(colorRed, ";'>\n                ").concat(x[i].red_club, "\n            </td>\n            <td data-label=\"blue_name\" style='").concat(colorBlue, ";'>\n                ").concat(x[i].blue_name, "\n            </td>\n            <td data-label=\"blue_firstname\" style='").concat(colorBlue, ";display:none'>\n                ").concat(x[i].blue_firstname, "\n            </td>\n            <td data-label=\"blue_lastname\" style='").concat(colorBlue, ";display:none'>\n                ").concat(x[i].blue_lastname, "\n            </td>\n            <td class=\"mobile\" data-label=\"blue_club\" style='").concat(colorBlue, ";'>\n                ").concat(x[i].blue_club.slice(0, -1), "\n            </td>\n        </tr>\n        \n        ");
  }

  tableRows = "<table class=\"table\" name='list'>\n        <tr class=\"header mobile\" style='font-weight:bold; text-align:center;'>\n            <td>Category</td>\n            <td>Round</td>\n            <td>Red</td>\n            <td>Red Club</td>\n            <td>Blue</td>\n            <td>Blue Club</td>\n        </tr>\n    ".concat(tableRows, "</table>");
  return tableRows;
}