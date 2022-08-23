'use strict';

const today = new Date();
let actualMonth = today.getMonth();
let beforeMonth = actualMonth - 1;
let afterMonth = actualMonth + 1;

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
