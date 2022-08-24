'use strict';

import {
    workCity,
    pricePerKm
} from "./config.js";

// console.log(workCity, pricePerKm);

const today = new Date();
const actualMonth = today;
// const beforeMonth = actualMonth - 1;
// const afterMonth = actualMonth + 1;
// beforeMonth = new Date(today.getFullYear(), today.getMonth(), 1) - 1
// afterMonth = new Datwe(today.getFullYear(), today.getMonth() + 1, 1)
const beforeMonth = new Date(new Date(today.getFullYear(), today.getMonth(), 1) - 1);
const afterMonth = new Date(today.getFullYear(), new Date(today.getMonth() + 1), 1);
// console.log(beforeMonth);
// console.log(afterMonth);
const dateOptionLong = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
const dateOptionMonth = {
    month: 'long'
};
const dateOptionDate = {
    day: 'numeric'
};
// const beforeMonthShortForm = new Date(today.getFullYear(), new Date(beforeMonth.getMonth()), today.getDay()).toLocaleDateString('hu-HU', dateOptionMonth);
// const actualMonthShortForm = new Date(today.getFullYear(), new Date(actualMonth.getMonth()), today.getDay()).toLocaleDateString('hu-HU', dateOptionMonth);
// const afterMonthShortForm = new Date(today.getFullYear(), new Date(afterMonth.getMonth()), today.getDay()).toLocaleDateString('hu-HU', dateOptionMonth);

const basedatas = {
    name: '',
    city: '',
    address: '',
    distance: '',
    vehicle: '',
    plate: ''
};

// Hónap hosszának kiszámítása
const monthLength = (month) => {
    return length = parseInt(new Date(new Date(month.getFullYear(), month.getMonth() + 1, 1) - 1).getDate())
};
// console.log(isNaN(monthLength(actualMonth)));

// Hónap megjelenítésének konvertálása
const monthView = (month, option) => {
    let view = new Date(month.getFullYear(), month.getMonth(), month.getDate()).toLocaleDateString('hu-HU', option);
    return view;
};
// console.log(monthView(beforeMonth, dateOptionLong));
// console.log(monthView(beforeMonth, dateOptionMonth));

const monthSelect = document.querySelector('.monthselect');
const monthSelectionButton = document.querySelector('.monthselection');
const daysPicker = document.querySelector('.dayspicker');
const printButton = document.querySelector('.print');

// monthSelect.insertAdjacentHTML('beforeend', new Date(today.getFullYear(), beforeMonth, today.getDay()).toLocaleDateString('hu-HU', dateOptionMonthHU));
// monthSelect.insertAdjacentHTML('beforeend', new Date(today.getFullYear(), actualMonth, today.getDay()).toLocaleDateString('hu-HU', dateOptionMonthHU));
// monthSelect.insertAdjacentHTML('beforeend', new Date(today.getFullYear(), afterMonth, today.getDay()).toLocaleDateString('hu-HU', dateOptionMonthHU));

today.getDate() >= 20 ?
    monthSelect.insertAdjacentHTML('beforeend', `${monthView(actualMonth, dateOptionMonth)}`) :
    // monthSelect.insertAdjacentHTML('beforeend', `${actualMonthShortForm}`) :
    monthSelect.insertAdjacentHTML('beforeend', `${monthView(beforeMonth, dateOptionMonth)}, ${monthView(actualMonth, dateOptionMonth)}`);

/**
 * Ha nap kisebb/egyenlő 10, akkor előző hónap legyen kiválasztva és felajánlja az aktuális hónapot,
 * ha 11 és 20 között, akkor aktuális hónap kiválasztva és felajánlja az előző hónapot,
 * ha 21 vagy nagyobb, akkor csak az aktuális hónap jelenjen meg!!!
 * 
 * month <= 10 ?
 *  before/radio(selected), actual/radio :
 *  month >= 11 && month <= 20 ?
 *      before/radio, actual/radio(selected) :
 *      actual/radio(selected)
 * 
 */

const monthView2 = (month, date = 1, option) => {

    let view = new Date(month.getFullYear(), month.getMonth(), date).toLocaleDateString('hu-HU', option);
    return view;
};

function daysList(month) {
    let length = monthLength(month);
    for (let i = 1; i <= length; i++) {
        console.log(monthView2(month, i, dateOptionDate));
    }
};

daysList(beforeMonth);

console.log(monthView2(actualMonth, dateOptionLong));