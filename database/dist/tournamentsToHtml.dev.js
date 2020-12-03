"use strict";

module.exports = tournamentsToHtml;

var dateFormat = require('../database/dateFormat.js');

function tournamentsToHtml(x, id) {
  var tableRows = '';

  for (i = 0; i < x.length; i++) {
    tableRows = tableRows + "\n        <tr ".concat(x[i].id == id ? 'class="matchOrder"' : '', ">\n            <td>\n                ").concat(dateFormat(x[i].date), "\n            </td>\n            <td>\n                <a href=\"/tournaments/open?id=").concat(x[i].id, "\">").concat(x[i].title, "</a>\n            </td>\n            <td>\n                ").concat(x[i].location, "\n            </td>\n        </tr>\n        \n        ");
  }

  tableRows = "<table class='table'>\n        <tr style='font-weight:bold; text-align:center;'>\n            <td>Date</td>\n            <td>Title</td>\n            <td>Location</td>\n        </tr>\n        ".concat(tableRows, "</table>");
  console.log('tournamentToHtml: ' + id);
  return tableRows;
}