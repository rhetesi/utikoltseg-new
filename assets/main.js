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


// Lottóhúzás
const lottoArr = [];
const lottoNums = [];
for (let i = 1; i <= 90; i++) {
    lottoArr.push(i)
};

const number = (arr) => {
    return Math.ceil(Math.random() * arr.length);
};

const draws = (arr) => {
    for (let i = 1; i <= 5; i++) {
        const n = number(arr);
        lottoNums.push(n);
        // console.log(lottoArr.indexOf(n));
        lottoArr.splice(arr.indexOf(n), 1);
        console.log(lottoArr);
    };
    return lottoNums;
};

console.log(draws(lottoArr));

// Majdnem jó, de akár többször is ugyanazt a számot húzza.