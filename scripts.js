'use strict';

const today = new Date();
let actualMonth = today.getMonth();
let beforeMonth = actualMonth - 1;
let afterMonth = actualMonth + 1;
const dateOptionLongHU = {year: 'numeric', month: 'long', day: 'numeric'};
const dateOptionMonthHU = {month: 'long'};

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

monthSelect.insertAdjacentHTML('beforeend', new Date(today.getFullYear(), beforeMonth, today.getDay()).toLocaleDateString('hu-HU', dateOptionMonthHU));
monthSelect.insertAdjacentHTML('beforeend', new Date(today.getFullYear(), actualMonth, today.getDay()).toLocaleDateString('hu-HU', dateOptionMonthHU));
monthSelect.insertAdjacentHTML('beforeend', new Date(today.getFullYear(), afterMonth, today.getDay()).toLocaleDateString('hu-HU', dateOptionMonthHU));