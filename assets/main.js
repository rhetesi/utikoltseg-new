"use strict";

// import from config
import { workCity, pricePerKm } from "./config.js";

//Namespace import of date.js module
import * as dateModule from "./date.js";
// usage example: const actualMonth = utiktgDateModule.actualMonth();

import { createAnyElement } from "./html.js";

// import jsPDF from "jspdf";
// import autoTable from 'jspdf-autotable';

/**
 * pdf import as Global module format
 */

const { jsPDF } = window.jspdf;

// import jsPDF from "./jspdf.es.min.js";
// import autoTable from "./jspdf.plugin.autotable.js";
// import 'jspdf-autotable';

// basedatas object declaration
const basedatas = {
  name: "",
  city: "",
  address: "",
  distance: "",
  vehicle: "",
  plate: "",
};

// select some HTML element
const monthSelect = document.querySelector(".monthselect");
// const monthSelectionButton = document.querySelector('.monthselection');
const daysPicker = document.querySelector(".dayspicker");
const printButton = document.querySelector(".print");

let htmlElement;

htmlElement = `
<div>
<input type='radio' class='mSelect' id='beforeMonth' name='month' value='beforeMonth'>
<label for='beforeMonth'>${dateModule.beforeMonth.toLocaleDateString(
  "hu-HU",
  dateModule.dateMonthView
)}</label>
<input type='radio' class='mSelect' id='actualMonth' name='month' value='actualMonth'>
<label for='actualMonth'>${dateModule.actualMonth.toLocaleDateString(
  "hu-HU",
  dateModule.dateMonthView
)}</label>
</div>
`;

// console.log(monthSelect);
// monthSelect.insertAdjacentText('beforeend', 'hello');
monthSelect.insertAdjacentHTML("beforeend", htmlElement);

const fm = document.querySelector(".firstMonth");
const sm = document.querySelector(".secondMonth");

fm.insertAdjacentText(
  "beforeend",
  `${dateModule.beforeMonth.toLocaleDateString(
    "hu-HU",
    dateModule.dateMonthView
  )}`
);
sm.insertAdjacentText(
  "beforeend",
  `${dateModule.actualMonth.toLocaleDateString(
    "hu-HU",
    dateModule.dateMonthView
  )}`
);

// daysPicker.insertAdjacentText('beforeend', 'Hello Roland');

/* daysPicker
1.) Create a table with
1.1.) 2 columns header (date & checked)
2.) generate as many rows as many days are in the selected month
2.1.) in a row the first cell díisplay the month's dates from 1st to the last date
2.2.) the rows second cell is a checkbox
3.) apeend the generated elemnts to its parent (td -> tr; tr&th -> tbody&thead; tbody&thead -> table; table -> daysPickers)
*/
const addFullMonth = (month) => {
  /*
    Ez volt a régi hónap lista készítő

    let table = document.querySelector("#gepjarmu");
    let tBody = table.querySelector("tbody");
    for (let i = 0; i < actualMonthLength; i++) {
    let tr = createAnyElement("tr");
    let td = createAnyElement("td");
    let day = i + 1;
    td.innerHTML = actualYear + ". " + monthName[month] + " " + day + ".";
    tr.appendChild(td);
    td = createAnyElement("td" , {class: "text-center"} );
    let checkBox = createAnyElement("input", {
        type: "checkbox",
        class: "checkbox",
        id: day,
        //name: actualYear + ". " + month + ". " + day + ".", // Ez a hagyományos szüveg összevonás
        name: `${actualYear}. ${month + 1}. ${day}.`, // Ez pedig sokszor a jobb módszer, mert itt a változók nem string-ként kezeltek.
        value: date.setFullYear(actualYear, month, day)
    });
    td.appendChild(checkBox);
    tr.appendChild(td);
    tBody.appendChild(tr);
    }
    let tr = createAnyElement("tr");
    let td = createAnyElement("td");
    tr.appendChild(td);
    td = createAnyElement("td");

    Idáig
    */
  let table = document.querySelector(".daysPickerTable");
  let tableHead = document.querySelector(".daysPickerTableHead");
  let tableHeadMonth = tableHead.querySelector(".dayOfMonthColumn");
  let tableBody = document.querySelector(".dayspicker");

  tableHeadMonth.insertAdjacentText(
    "beforeend",
    `${new Date(month.getFullYear(), month.getMonth()).toLocaleDateString(
      "hu-HU",
      dateModule.dateYearAndMonthViev
    )}`
  );

  for (let i = 1; i <= dateModule.monthLength(month); i = i + 1) {
    let tr = createAnyElement("tr");

    let td = createAnyElement("td");
    td.insertAdjacentText("beforeend", i);
    // td.insertAdjacentText(
    //   "beforeend",
    //   `${new Date(month.getFullYear(), month.getMonth(), i).toLocaleDateString(
    //     "hu-HU",
    //     dateModule.dateLongView
    //   )}, `
    // );
    // tr.appendChild("td");
    // td = createAnyElement("td", { class: "text-center" });
    // let checkBox = createAnyElement("input", {
    //   type: "checkbox",
    //   class: "checkbox",
    //   id: `${new Date(month.getFullYear(), month.getMonth(), i)}`,
    //   name: `${new Date(month.getFullYear(), month.getMonth(), i)}`,
    //   value: new Date(month.getFullYear(), month.getMonth(), i),
    // });
    // td.appendChild(checkBox);
    tr.appendChild(td);
    tableBody.appendChild(tr);
  }

  /* for (let i = 1; i <= dateModule.monthLength(month); i = i + 1) {
    // daysPicker.insertAdjacentText('beforeend', `${new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i).toLocaleDateString('hu-HU', dateModule.dateLongView)}, `);
    daysPicker.insertAdjacentText(
      "beforeend",
      `${new Date(month.getFullYear(), month.getMonth(), i).toLocaleDateString(
        "hu-HU",
        dateModule.dateLongView
      )}, `
    );
    } */
};

addFullMonth(dateModule.actualMonth);
// const doc = new jsPDF();
// doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf");
