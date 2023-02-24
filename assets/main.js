"use strict";

// import from config
import { workCity, pricePerKm } from "./config.js";

//Namespace import of date.js module
import * as dateModule from "./date.js";
// usage example: const actualMonth = dateModule.actualMonth();

import { createAnyElement } from "./html.js";

// import "jspdf-autotable";

/**
 * pdf import as Global module format
 */

const { jsPDF } = window.jspdf;

// basedatas object declaration
const basedatas = {
  name: "",
  city: "",
  address: "",
  homeWorkDistance: "",
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

    // adott táblázat sorba jelöőnégyzet készítése, s tulajdonságainak beállítása
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

// console.log(viewMonth);
addFullMonth(viewMonth);

// do some math - multiply the dateArray length with the pricePerKm variable's value -> get the value of the fullPrice variable - 3rd function

// create a printView

printButton.addEventListener("click", function () {
  //   Itt kell meghívni a többi függvényt!

  let datesArray = [];
  let printDate;
  let pdfName;

  let homeWorkDistance = document.querySelector("input.homeWorkDistance").value;

  let tableRowSum = homeWorkDistance * pricePerKm;

  fillBaseDatas();
  fillDates(datesArray);

  // console.log(basedatas);
  // console.log(datesArray);

  let sumTotal = datesArray.length * homeWorkDistance * pricePerKm;
  // tableRowSum = homeWorkDistance * pricePerKm;
  // console.log(tableRowSum);

  // sumTotal = datesArray.length * homeWorkDistance * pricePerKm;
  // console.log(sumTotal);

  new Date(datesArray[datesArray.length - 1]) > dateModule.today
    ? (printDate = new Date(datesArray[datesArray.length - 1]))
    : (printDate = dateModule.today);

  // console.log(printDate);

  pdfName = `Útiköltség_${viewMonth.toLocaleDateString(
    "hu-HU",
    dateModule.dateYearAndNumericMonthView
  )}_${basedatas.name}`;
  // console.log(pdfName);

  const pdfDoc = new jsPDF();
  pdfDoc.setFontSize(16);
  pdfDoc.setFont("helvetica", "bold");
  pdfDoc.text(`Munkába járás elszámolása`, 105, 10, "center"); // text("szöveg", bal oldaltól számított távolság, lap tetejétől számított távolság, forgatás(opc), forgatás(opc), igazítás) -> itt a laptól számított 105 mm-hez igazítja középre a szöveget
  pdfDoc.setFontSize(12);
  pdfDoc.setFont("helvetica", "normal");
  // készítés éve és hónapja
  pdfDoc.text(
    `${viewMonth.toLocaleDateString("hu-HU", dateModule.dateYearAndMonthViev)}`,
    105,
    16,
    "center"
  );
  pdfDoc.text(
    `Az elszámolás alapja a 39/2010. (II. 26.) és 16/2023. (I. 27.) számú Kormányrendeletek, mely alapján gépjármüre fizethetö 30,- Ft/km költségtérítés.`,
    10,
    25,
    {
      maxWidth: 190,
      align: "left",
    }
  );
  // név és lakcím
  pdfDoc.text(`Név: ${basedatas.name}`, 10, 40);
  pdfDoc.text(`lakcím: ${basedatas.city}, ${basedatas.address}`, 105, 40);
  // Személygépkocsi típusa és forgami rendszáma
  pdfDoc.text(`személygépkocsi típusa: ${basedatas.vehicle}`, 10, 50);
  pdfDoc.text(`forgalmi rendszám: ${basedatas.plate}`, 105, 50);
  //Táblázat
  // Táblázat fejléc: dátum, indulás-érkezés (helységnév), km/fő, összeg
  // Táblázatsorok: összeg = tableRowSum
  // Táblázat lábléc: -, összesen, összes km, összes összeg (sumTotal)

  /* 
  
  for (var i = 1; i <= 12; i++) {
  doc.text(20, 30 + i * 10, i + " x " + multiplier + " = ___");
}
  
  */
  // let headers = [
  //   {
  //     id: "id",
  //     name: "id",
  //     prompt: "id",
  //     align: "center",
  //     width: 65,
  //     padding: 0,
  //   },
  //   {
  //     id: "name",
  //     name: "name",
  //     prompt: "name",
  //     align: "center",
  //     width: 65,
  //     padding: 0,
  //   },
  // ];
  // pdfDoc.table(10, 75, headers, { autoSize: true });
  // pdfDoc.autoTable({
  //   html: "#my-table",
  // });
  // keltezés
  pdfDoc.text(
    `Hévíz, ${printDate.toLocaleDateString("hu-HU", dateModule.dateLongView)}`,
    10,
    100
  );
  // aláírások: munkahelyi vezető, munkavállaló
  pdfDoc.save(`${pdfName}.pdf`); // ideiglenesen vedd ki, ha a jspdf-autotable-t próbálgatod

  // const autopdf = new jsPDF();
  // autopdf.autotable({ html: "#my-table" });
  // autopdf.save("table.pdf");
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
