"use strict";

const { jsPDF } = window.jspdf;

const pdfDoc = new jsPDF();
pdfDoc.text(`Munkába járás elszámolása`, 105, 10, "center");
