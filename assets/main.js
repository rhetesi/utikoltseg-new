'use strict';

// import from config
import {
    workCity,
    pricePerKm
} from "./config.js";

//Namespace import of date.js module
import * as dateModule from "./date.js";
// usage example: const actualMonth = utiktgDateModule.actualMonth();

import {
    createAnyElement
} from "./html.js";

// import jsPDF from "jspdf";
// import autoTable from 'jspdf-autotable';

/**
 * pdf import as Global module format
 */

const {
    jsPDF
} = window.jspdf;

// import jsPDF from "./jspdf.es.min.js";
// import autoTable from "./jspdf.plugin.autotable.js";
// import 'jspdf-autotable';

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
<label for='beforeMonth'>${dateModule.beforeMonth.toLocaleDateString('hu-HU', dateModule.dateMonthView)}</label>
<input type='radio' class='mSelect' id='actualMonth' name='month' value='actualMonth'>
<label for='actualMonth'>${dateModule.actualMonth.toLocaleDateString('hu-HU', dateModule.dateMonthView)}</label>
</div>
`;

// console.log(monthSelect);
// monthSelect.insertAdjacentText('beforeend', 'hello');
monthSelect.insertAdjacentHTML('beforeend', htmlElement);

const fm = document.querySelector('.firstMonth');
const sm = document.querySelector('.secondMonth');

fm.insertAdjacentText('beforeend', `${dateModule.beforeMonth.toLocaleDateString('hu-HU', dateModule.dateMonthView)}`);
sm.insertAdjacentText('beforeend', `${dateModule.actualMonth.toLocaleDateString('hu-HU', dateModule.dateMonthView)}`);

// daysPicker.insertAdjacentText('beforeend', 'Hello Roland');

/* daysPicker
1.) Create a table with
1.1.) 2 columns header (date & checked)
2.) generate as many rows as many days are in the selected month
2.1.) in a row the first cell díisplay the month's dates from 1st to the last date
2.2.) the rows second cell is a checkbox
3.) apeend the generated elemnts to its parent (td -> tr; tr&th -> tbody&thead; tbody&thead -> table; table -> daysPickers)
*/
const addFullMonth = (month) => {
    // let viewMonth = month;

    // tr.appendChild(createAnyElement('th'));
    // daysPicker
    //     .appendChild(createAnyElement('table'))
    //     .appendChild(createAnyElement('thead'))
    //     .appendChild(createAnyElement('tr'))
    //     .appendChild(createAnyElement('th'));

    for (let i = 1; i <= dateModule.monthLength(month); i = i + 1) {
        // daysPicker.insertAdjacentText('beforeend', `${new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i).toLocaleDateString('hu-HU', dateModule.dateLongView)}, `);
        daysPicker.insertAdjacentText('beforeend', `${new Date(month.getFullYear(), month.getMonth(), i).toLocaleDateString('hu-HU', dateModule.dateLongView)}, `);
    }
}

addFullMonth(dateModule.actualMonth);
// const doc = new jsPDF();
// doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf");