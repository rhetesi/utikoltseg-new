'use strict';

// import from config, dateoperations
import {
    workCity,
    pricePerKm
} from "./config.js";

//Namespace import of date.js module
import * as utiktgDateModule from "./date.js";
// usage example: const actualMonth = utiktgDateModule.actualMonth();

import {
    createAnyElement
} from "./html.js";

// import jsPDF from "jspdf";
// import autoTable from 'jspdf-autotable';

// import jsPDF from "./jspdf.es.min.js";
// import autoTable from "./jspdf.plugin.autotable.js";

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

console.log(monthSelect);
monthSelect.insertAdjacentText('beforeend', 'hello');