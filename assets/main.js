"use strict";

// import from config
import {
  workCity,
  pricePerKm
} from "./config.js";

//Namespace import of date.js module
import * as dateModule from "./date.js";
// usage example: const actualMonth = utiktgDateModule.actualMonth();

import {
  createAnyElement
} from "./html.js";

// import jsPDF from "jspdf";
// import autoTable from 'jspdf-autotable';

/**
 * pdf import as Global module format
 */

const {
  jsPDF
} = window.jspdf;

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

const addFullMonth = (month) => {

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
    // adott sorhoz tartozó dátum készítése és változóhoz rendelése
    let dpdate = new Date(month.getFullYear(), month.getMonth(), i);

    // egy táblázat sor készítése
    let tr = createAnyElement("tr");

    // az adott táblázat sor elős cellájának elkészítése
    let td = createAnyElement("td");

    // hogy maga a dátum is kattintható legyen, a cellába egy címke (label) kerül, mely az adott sor jelölőnégyzetével (checkbox) van összekötve
    let label = createAnyElement("label", {
      for: `${dpdate}`
    });
    label.insertAdjacentText("beforeend", `${dpdate.toLocaleDateString("hu-HU", dateModule.dateLongView)}`);
    td.appendChild(label);

    // cella hozzáadása a sorhoz
    tr.appendChild(td);

    // adott tábláazt sorba jelöőnégyzet készítése, s tulajdonságainak beállítása
    td = createAnyElement("td", {
      class: "text-center"
    });
    let checkbox = createAnyElement("input", {
      type: "checkbox",
      class: "checkbox",
      id: `${dpdate}`,
      value: `${dpdate}`
    });
    td.appendChild(checkbox);

    tr.appendChild(td);
    tableBody.appendChild(tr);
  }

};

addFullMonth(dateModule.actualMonth);
// const doc = new jsPDF();
// doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf");