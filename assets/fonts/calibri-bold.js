﻿// import { jsPDF } from "jspdf"
const {
    jsPDF
} = window.jspdf;
var callAddFont = function () {
    this.addFileToVFS('calibri-bold.ttf', font);
    this.addFont('calibri-bold.ttf', 'calibri', 'bold');
};
jsPDF.API.events.push(['addFonts', callAddFont])