"use strict";

// import from config
import { workCity, pricePerKm } from "./config.js";

//Namespace import of date.js module
import * as dateModule from "./date.js";
// usage example: const actualMonth = dateModule.actualMonth();

import { createAnyElement } from "./html.js";

/**
 * pdf import as Global module format
 */

const { jsPDF } = window.jspdf;

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
).getDate()
  ? (viewMonth = dateModule.actualMonth)
  : (viewMonth = dateModule.beforeMonth);

console.log(viewMonth);
addFullMonth(viewMonth);

// const doc = new jsPDF();
// doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf");

// getDataFromInputFieldsWhetClickToPrintButton - main Print funciton

// fill the properties values of basedatas Object if those are empty - 1st function
// getStringsToPrint("input.nyomtatvany", stringsToPrint); // a nyomtatvány többi input field-jét RENDELD HOZZÁ a "nyomtatvany" osztályhoz!
/* function getStringsToPrint(from, data) {
  let inputs = document.querySelectorAll(from);
  for (let i = 0; i < inputs.length; i++) {
      data[inputs[i].name] = inputs[i].value;
  }
  return data;
} */

// create a dateArray, ang push the selected dates of orm into it - 2nd function
// getDataToPrint("input.checkbox", dataToPrint);
/* function getDataToPrint(from, data) {
  let inputs = document.querySelectorAll(from);
  for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
          data.push(inputs[i].name);
      }
  }
  return data;
} */

// do some math - multiply the dateArray length with the pricePerKm variable's value -> get the value of the fullPrice variable - 3rd function

// select the printDay, if today < value of the last item of the dateArray, then the later, else today

// create a printView

printButton.addEventListener("click", function () {
  //   Itt kell meghívni a többi függvényt!

  let datesArray = [];
  let printDate;
  fillBaseDatas();
  fillDates(datesArray);
  console.log(basedatas);
  console.log(datesArray);

  new Date(datesArray[datesArray.length - 1]) > dateModule.today
    ? (printDate = new Date(datesArray[datesArray.length - 1]))
    : (printDate = dateModule.today);

  console.log(printDate);
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
