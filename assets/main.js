"use strict";

// jsPDF import as Global module format
const {
  jsPDF
} = window.jspdf;

// Add jspdf-autotable as plugin
import "./autotable/jspdf.plugin.autotable.js";

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

import * as calibri from "./fonts/calibri-normal.js";
import * as calibribold from "./fonts/calibri-bold.js";

// import * as pdf from "./createpdf.js";
import {
  printPdf
} from "./createpdf.js";

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
const printButton = document.querySelector(".printbutton");

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

    // az adott táblázat sor első cellájának elkészítése
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

    // adott táblázat sorba jelölőnégyzet készítése, s tulajdonságainak beállítása
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

addFullMonth(viewMonth);

// create a printView

printButton.addEventListener("click", function () {
  //  this function call the other functions: fillBaseDatas() & fillDates(), latter w/ datesArrey

  let datesArray = [];
  let printDate;
  let pdfName;

  let homeWorkDistance = document.querySelector("input.homeWorkDistance").value;

  let tableRowSum = homeWorkDistance * pricePerKm * 2;

  fillBaseDatas();
  fillDates(datesArray);

  let sumTotal = datesArray.length * homeWorkDistance * pricePerKm * 2;

  new Date(datesArray[datesArray.length - 1]) > dateModule.today ?
    (printDate = new Date(datesArray[datesArray.length - 1])) :
    (printDate = dateModule.today);

  pdfName = `Útiköltség_${viewMonth.toLocaleDateString(
    "hu-HU",
    dateModule.dateYearAndNumericMonthView
  )}_${basedatas.name}`;

  // const pdfDoc = new jsPDF();
  // pdfDoc.setFontSize(16);
  // pdfDoc.setFont("calibri", "bold");
  // pdfDoc.text(`Munkába járás elszámolása`, 105, 15, "center"); // accounting for going to work
  // pdfDoc.setFontSize(11);
  // pdfDoc.setFont("calibri", "normal");

  /* // year and month of the print of accounting 
  pdfDoc.text(
    `${viewMonth.toLocaleDateString("hu-HU", dateModule.dateYearAndMonthViev)}`,
    105,
    20,
    "center"
  ); */

  /*  pdfDoc.text(
     `Az elszámolás alapja a 39/2010. (II. 26.) és a 16/2023. (I. 27.) számú Kormányrendeletek, mely alapján gépjárműre fizethető 30,- Ft/km költségtérítés.`,
     15,
     30, {
       maxWidth: 190,
       align: "left",
     }
   ); */

  /* // name & city, address
  pdfDoc.text(`Név: ${basedatas.name}`, 15, 40);
  pdfDoc.text(`lakcím: ${basedatas.city}, ${basedatas.address}`, 105, 40);
  // car & car plate
  pdfDoc.text(`személygépkocsi típusa: ${basedatas.vehicle}`, 15, 44);
  pdfDoc.text(`forgalmi rendszám: ${basedatas.plate}`, 105, 44); */

  // table with daily home-work distance datas to printing
  const ptable = datesArray.map((date) => [
    new Date(date).toLocaleDateString("hu-HU", dateModule.dateLongView),
    `${basedatas.city} - ${workCity} - ${basedatas.city}`,
    `${basedatas.homeWorkDistance * 2}`,
    `${tableRowSum.toLocaleString('hu-HU', {
            style: 'currency',
            currency: 'HUF'
        })}`,
  ]);

  /*  pdfDoc.autoTable({
     margin: {
       top: 50
     },
     styles: {
       font: "calibri",
       lineWidth: .5,
       lineColor: [75, 75, 75],
       halign: 'center', // itt kell általánosan igazítani a táblázat celláinak tartalmát
     },
     headStyles: {
       fillColor: [75, 75, 75],
       halign: 'center',
     },
     footStyles: {
       fillColor: [75, 75, 75],
       halign: 'right',
     },
     theme: "grid",
     tableLineWidth: .5,
     tableLineColor: [75, 75, 75],
     // Kell az oszlopok definiálása, ha azok adatait igazítani szeretnéd
     columns: [{
         dataKey: 'dátum',
         header: 'dátum'
       },
       {
         dataKey: 'indulás - érkezés (helységnév)',
         header: 'indulás - érkezés (helységnév)'
       },
       {
         dataKey: 'Km/fő',
         header: 'Km/fő'
       },
       {
         dataKey: 'összeg',
         header: 'összeg'
       },
     ],
     columnStyles: {
       'Km/fő': {
         halign: 'right',
       },
       összeg: {
         halign: 'right',
       },
     },
     head: [
       ["dátum", "indulás - érkezés (helységnév)", "Km/fő", "összeg"]
     ],
     body: ptable,
     foot: [
       [``, `összesen:`, ``, `${sumTotal.toLocaleString('hu-HU', {
             style: 'currency',
             currency: 'HUF'
         })}`]
     ],
   }); */

  /* // keltezés
  pdfDoc.text(
    `Hévíz, ${printDate.toLocaleDateString("hu-HU", dateModule.dateLongView)}`,
    15,
    250 // mm-nyire a papír tetejétől (az álló A/4-es papír 297 mm magas)
  ); */

  /* // aláírások
  pdfDoc.text(`.........................................`, 60, 270, "center");
  pdfDoc.text(`.........................................`, 150, 270, "center");
  pdfDoc.text(`munkahelyi vezető`, 60, 275, "center");
  pdfDoc.text(`munkavállaló aláírása`, 150, 275, "center"); */

  // pdfDoc.save(`${pdfName}.pdf`);

  const printObject = {};

  // tableRowSum: this.tableRowSum,
  printObject.tableRowSum = tableRowSum;
  // sumTotal: this.sumTotal,
  printObject.sumTotal = sumTotal;
  // pdfName: this.pdfName,
  printObject.pdfName = pdfName;
  // viewMonth: this.vm,
  printObject.viewMonth = viewMonth;
  // basedatas: this.basedatas,
  printObject.basedatas = basedatas;
  // ptable: this.ptable,
  printObject.ptable = ptable;
  // printDate,
  printObject.printDate = printDate;

  // console.log(printObject);

  printPdf(printObject);

});

const fillBaseDatas = () => {
  for (let key in basedatas) {
    if (Object.hasOwn(basedatas, key)) {
      const fieldValue = document.querySelector(`.${key}`).value;
      basedatas[key] = fieldValue;
    }
  }
};

const fillDates = (arr) => {
  const dates = document.querySelectorAll("input.checkbox");

  for (let i = 0; i < dates.length; i = i + 1) {
    if (dates[i].checked) {
      arr.push(dates[i].value);
    }
  }
  return;
};