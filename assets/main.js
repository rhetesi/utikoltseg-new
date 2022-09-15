'use strict';

// import from config, dateoperations
import {
    workCity,
    pricePerKm
} from "./config.js";

// import {
//     today,
//     actualMonth,
//     beforeMonth,
//     afterMonth,
//     dateLongView,
//     dateMonthView,
//     dateDateView,
//     monthLength,
//     dateview,
//     dateOfPrint
// } from "./date.js";

//Namespace import of date.js module
import * as utiktgDateModule from "./date";
// usage example: const actualMonth = utiktgDateModule.actualMonth();

import { createAnyElement } from "./html";

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

// basedatas object declaration
const basedatas = {
    name: '',
    city: '',
    address: '',
    distance: '',
    vehicle: '',
    plate: ''
};

// select some HTML element
const monthSelect = document.querySelector('.monthselect');
// const monthSelectionButton = document.querySelector('.monthselection');
const daysPicker = document.querySelector('.dayspicker');
const printButton = document.querySelector('.print');

