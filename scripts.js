'use strict';

const today = new Date();
const actualMonth = today.getMonth();
const beforeMonth = actualMonth - 1;
const afterMonth = actualMonth + 1;
const dateOptionLongHU = {year: 'numeric', month: 'long', day: 'numeric'};
const dateOptionMonthHU = { month: 'long' };
const beforeMonthShortForm = new Date(today.getFullYear(), beforeMonth, today.getDay()).toLocaleDateString('hu-HU', dateOptionMonthHU);
const actualMonthShortForm = new Date(today.getFullYear(), actualMonth, today.getDay()).toLocaleDateString('hu-HU', dateOptionMonthHU);
const afterMonthShortForm = new Date(today.getFullYear(), afterMonth, today.getDay()).toLocaleDateString('hu-HU', dateOptionMonthHU);

const basedatas = {
    name: '',
    city: '',
    address: '',
    distance: '',
    vehicle: '',
    plate: ''
};

const monthSelect = document.querySelector('.monthselect');
const monthSelectionButton = document.querySelector('.monthselection');
const daysPicker = document.querySelector('.dayspicker');
const printButton = document.querySelector('.print');

// monthSelect.insertAdjacentHTML('beforeend', new Date(today.getFullYear(), beforeMonth, today.getDay()).toLocaleDateString('hu-HU', dateOptionMonthHU));
// monthSelect.insertAdjacentHTML('beforeend', new Date(today.getFullYear(), actualMonth, today.getDay()).toLocaleDateString('hu-HU', dateOptionMonthHU));
// monthSelect.insertAdjacentHTML('beforeend', new Date(today.getFullYear(), afterMonth, today.getDay()).toLocaleDateString('hu-HU', dateOptionMonthHU));

today.getDate() >= 20 ?
    monthSelect.insertAdjacentHTML('beforeend', `${actualMonthShortForm}`) :
    monthSelect.insertAdjacentHTML('beforeend', `${beforeMonthShortForm} , ${actualMonthShortForm}`);

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