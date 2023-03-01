"use strict";

import * as date from "./date.js";

const { jsPDF } = window.jspdf;

const print = ({ params }) => {
  const pdf = new jsPDF();
};

const pdfDoc = new jsPDF();
pdfDoc.text(`Munkába járás elszámolása`, 105, 10, "center");
