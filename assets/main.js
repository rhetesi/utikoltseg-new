'use strict';

// import from config, dateoperations
import {
    workCity,
    pricePerKm
} from "./config.js";

import {
    today,
    actualMonth,
    beforeMonth,
    afterMonth,
    dateLongView,
    dateMonthView,
    dateDateView,
    monthLength,
    dateview,
    dateOfPrint
} from "./date.js";

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