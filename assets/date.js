'use strict';

export let today = new Date();

// actual-, before- and afterMonth
export const actualMonth = today;
export const beforeMonth = new Date(new Date(today.getFullYear(), today.getMonth(), 1) - 1);
export const afterMonth = new Date(today.getFullYear(), new Date(today.getMonth() + 1), 1);

// dateView options
export const dateLongView = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
export const dateMonthView = {
    month: 'long'
};
export const dateDateView = {
    day: 'numeric'
};

// Hónap hosszának kiszámítása
export const monthLength = (month) => {
    return length = parseInt(new Date(new Date(month.getFullYear(), month.getMonth() + 1, 1) - 1).getDate())
};

// dateview function, the function get any params (year, month, date) of the date and the viewoption -> then returns the the dateview formatted by the viewoption
export function dateview(params, viewoption) {
    let fulldate = {};

    params.year ? fulldate.year = params.year : fulldate.year = today.getFullYear();
    params.month ? fulldate.month = params.month : fulldate.month = today.getMonth();
    params.date ? fulldate.date = params.date : fulldate.date = today.getDate();

    let dateview = new Date(fulldate.year, fulldate.month, fulldate.date).toLocaleDateString('hu-HU', viewoption);
    return dateview
}