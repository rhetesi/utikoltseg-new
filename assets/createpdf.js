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


const print = ({
  params
}) => {
  const pdf = new jsPDF();
};

const pdfDoc = new jsPDF();
pdfDoc.text(`Munkába járás elszámolása`, 105, 10, "center");