﻿// import { jsPDF } from "jspdf"
const {
    jsPDF
} = window.jspdf;
var callAddFont = function () {
    this.addFileToVFS('calibri-normal.ttf', font);
    this.addFont('calibri-normal.ttf', 'calibri', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])