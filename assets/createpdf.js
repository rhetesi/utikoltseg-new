"use strict";

// jsPDF import as Global module format
const {
  jsPDF
} = window.jspdf;

// Add jspdf-autotable as plugin
import "./autotable/jspdf.plugin.autotable.js";

// Import date module
import * as date from "./date.js";

// Adding the used font
import * as calibri from "./fonts/calibri-normal.js";
import * as calibribold from "./fonts/calibri-bold.js";



export const printPdf = (params) => {
  // Create a new pdf document (default A/4 portrait oriented paper size)
  const pdfDoc = new jsPDF();

  // Set the font style of the title to Calibri bold 16pt & add title to accounting for going to work
  pdfDoc.setFontSize(16);
  pdfDoc.setFont("calibri", "bold");
  pdfDoc.text(`Munkába járás elszámolása`, 105, 15, "center");

  // Set the normal font style to Calibri normal 11pt
  pdfDoc.setFontSize(11);
  pdfDoc.setFont("calibri", "normal");

  // Add the year and month of the printing
  pdfDoc.text(
    // `${viewMonth.toLocaleDateString("hu-HU", dateModule.dateYearAndMonthViev)}`,
    `${params.viewMonth.toLocaleDateString("hu-HU", date.dateYearAndMonthViev)}`,
    105,
    20,
    "center"
  );

  // Add a legal text, by which regulations allow to pay 30,00 Ft/Km
  pdfDoc.text(
    `Az elszámolás alapja a 39/2010. (II. 26.) és a 16/2023. (I. 27.) számú Kormányrendeletek, mely alapján gépjárműre fizethető 30,- Ft/km költségtérítés.`,
    15,
    30, {
      maxWidth: 190,
      align: "left",
    }
  );

  // Add person and car related informations from basedatas
  // name & city, address
  pdfDoc.text(`Név: ${params.basedatas.name}`, 15, 40);
  pdfDoc.text(`lakcím: ${params.basedatas.city}, ${params.basedatas.address}`, 105, 40);
  // car & car plate
  pdfDoc.text(`személygépkocsi típusa: ${params.basedatas.vehicle}`, 15, 44);
  pdfDoc.text(`forgalmi rendszám: ${params.basedatas.plate}`, 105, 44);

  // Create table
  pdfDoc.autoTable({
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
    body: params.ptable,
    foot: [
      [``, `összesen:`, ``, `${params.sumTotal.toLocaleString('hu-HU', {
            style: 'currency',
            currency: 'HUF'
        })}`]
    ],
  });

  // Add dating (location and date) of print
  pdfDoc.text(
    `Hévíz, ${params.printDate.toLocaleDateString("hu-HU", date.dateLongView)}`,
    15,
    250 // mm-nyire a papír tetejétől (az álló A/4-es papír 297 mm magas)
  );

  // Add signature lines
  pdfDoc.text(`.........................................`, 60, 270, "center");
  pdfDoc.text(`.........................................`, 150, 270, "center");
  pdfDoc.text(`munkahelyi vezető`, 60, 275, "center");
  pdfDoc.text(`munkavállaló aláírása`, 150, 275, "center");

  // Save the generated pdf doc
  pdfDoc.save(`${params.pdfName}.pdf`);

};