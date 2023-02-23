"use strict";

// import from config
import {
  workCity,
  pricePerKm
} from "./config.js";

//Namespace import of date.js module
import * as dateModule from "./date.js";
// usage example: const actualMonth = dateModule.actualMonth();

import {
  createAnyElement
} from "./html.js";

/**
 * pdf import as Global module format
 */

const {
  jsPDF
} = window.jspdf;

// basedatas object declaration
const basedatas = {
  name: "",
  city: "",
  address: "",
  tavolsag: "",
  vehicle: "",
  plate: "",
};

// select some HTML element
// const monthSelect = document.querySelector(".monthselect"); // hóanpválasztáshoz
// const monthSelectionButton = document.querySelector('.monthselection');
// const daysPicker = document.querySelector(".dayspicker"); // Ez nem is kell
const printButton = document.querySelector(".printbutton");

/* Hónapválasztó HTMl elemek beszúrása, későbbi fejlesztéshez!!!
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
); */

// Arrow function to add the selected month's dates w/ checkboxes to HTML
const addFullMonth = (month) => {
  let tableHeadMonth = document.querySelector(".dayOfMonthColumn");
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
      for: `${dpdate}`,
    });
    label.insertAdjacentText(
      "beforeend",
      `${dpdate.toLocaleDateString("hu-HU", dateModule.dateLongView)}`
    );
    td.appendChild(label);

    // cella hozzáadása a sorhoz
    tr.appendChild(td);

    // adott tábláazt sorba jelöőnégyzet készítése, s tulajdonságainak beállítása
    td = createAnyElement("td", {
      class: "text-center",
    });
    let checkbox = createAnyElement("input", {
      type: "checkbox",
      class: "checkbox",
      id: `${dpdate}`,
      value: `${dpdate}`,
    });
    td.appendChild(checkbox);

    tr.appendChild(td);
    tableBody.appendChild(tr);
  }
};

// Adding viewMonth by defining which month is selected
let viewMonth;
dateModule.today.getDate() >
  new Date(
    dateModule.today.getFullYear(),
    dateModule.today.getMonth(),
    15
  ).getDate() ?
  (viewMonth = dateModule.actualMonth) :
  (viewMonth = dateModule.beforeMonth);

// console.log(viewMonth);
addFullMonth(viewMonth);

// const doc = new jsPDF();
// doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf");

// do some math - multiply the dateArray length with the pricePerKm variable's value -> get the value of the fullPrice variable - 3rd function

// create a printView

printButton.addEventListener("click", function () {
  //   Itt kell meghívni a többi függvényt!

  let datesArray = [];
  let printDate;
  let pdfName;
  fillBaseDatas();
  fillDates(datesArray);
  console.log(basedatas);
  console.log(datesArray);

  new Date(datesArray[datesArray.length - 1]) > dateModule.today ?
    (printDate = new Date(datesArray[datesArray.length - 1])) :
    (printDate = dateModule.today);

  console.log(printDate);

  pdfName = `Útiköltség_${viewMonth.toLocaleDateString("hu-HU", dateModule.dateYearAndNumericMonthView)}_${basedatas.name}`;
  console.log(pdfName);

  // const pdfDoc = new jsPDF();
  // pdfDoc.text(`${printDate}`, 10, 10);
  // pdfDoc.save(`${pdfName}.pdf`);
});

const fillBaseDatas = () => {
  for (let key in basedatas) {
    if (Object.hasOwn(basedatas, key)) {
      const fieldValue = document.querySelector(`.${key}`).value;
      basedatas[key] = fieldValue;
    }
  }
  // return;
};

const fillDates = (arr) => {
  // Nézd meg, hogy milyen más módon tudod kigyűjteni kiválasztott dátumokat!!!
  // for (let i = 1; i <= dateModule.monthLength(month); i = i + 1) {
  //   const dateValue = document.querySelector();
  // }
  // console.log("Hello!");

  const dates = document.querySelectorAll("input.checkbox");

  for (let i = 0; i < dates.length; i = i + 1) {
    if (dates[i].checked) {
      arr.push(dates[i].value);
    }
  }
  return;
};