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

let htmlElement;

htmlElement = `
<div>
<input type='radio' class='mSelect' id='beforeMonth' name='month' value='beforeMonth'>
<label for='beforeMonth'>${utiktgDateModule.beforeMonth.toLocaleDateString('hu-HU', utiktgDateModule.dateMonthView)}</label>
<input type='radio' class='mSelect' id='actualMonth' name='month' value='actualMonth'>
<label for='actualMonth'>${utiktgDateModule.actualMonth.toLocaleDateString('hu-HU', utiktgDateModule.dateMonthView)}</label>
</div>
`;

// console.log(monthSelect);
// monthSelect.insertAdjacentText('beforeend', 'hello');
monthSelect.insertAdjacentHTML('beforeend', htmlElement);

const fm = document.querySelector('.firstMonth');
const sm = document.querySelector('.secondMonth');

fm.insertAdjacentText('beforeend', `${utiktgDateModule.beforeMonth.toLocaleDateString('hu-HU', utiktgDateModule.dateMonthView)}`);
sm.insertAdjacentText('beforeend', `${utiktgDateModule.actualMonth.toLocaleDateString('hu-HU', utiktgDateModule.dateMonthView)}`);