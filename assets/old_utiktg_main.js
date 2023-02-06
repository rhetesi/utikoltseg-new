//Alapadatok definiálása (munkahely, Ft/km) költségtérítés megadása
let workCity = "Hévíz";
let forintKm = 9;

// Hónapok neveinek és alap hosszuknak tömbökbe töltése
let monthName = ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"];
let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Alap dátumok beállítása: rendszerdátum és rendszeridő lekérdezése, lekérdezett hónap értékének áttöltése a date változóba, aktuláis hónap hosszának betöltése
// az actulMonthLength változóba, a monthLength tömbből a month változó értéke szerint kikeresett érték alapján
let date = new Date();
console.log(date);
let today = date;
let todayDay = today.getDate();
let todayMonth = today.getMonth();
let todayYear = today.getFullYear();
let todayDate = today.setFullYear(todayYear, todayMonth, todayDay);
let actualYear = date.getFullYear();
let doneDate = todayDate;
// console.log(doneDate); Itt még Number
/*console.log(actualYear);
tday = new Date(todayDate);
console.log(tday);*/
let leapYear = actualYear;

//leapYear, azaz szökőév vizsgálata -- s elég egy sima if-else nem kell függvény (function) hozzá. Így szebb és rövidebb a kód!
if (leapYear = ((leapYear % 4 == 00 && leapYear % 100 != 0) || leapYear % 400 == 0)) {
    monthLength = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
} else monthLength = monthLength;

console.log(actualYear);

let month = date.getMonth();
month = month - 1; // EZT KELL kivenni és megcsinálni a hónap választást!!!!!
let actualMonth = month;
let actualMonthLength = monthLength[month];
let beforeMonth = actualMonth - 1;

//Január-ról decemberre visszalépés kezelése: változik a hónap, és az évszám is csökken!
if (beforeMonth < 0) {
    beforeMonth = 11;
    actualYear = actualYear - 1;
} else beforeMonth = beforeMonth;
actualYear = actualYear

// Előző és aktuális hónap értéke tömbbe töltése
/*let monthValue = [
    "Kérem válasszon hónapot!",
    beforeMonth,
    actualMonth
]

lista automatikus lekérése: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_select_options_selindex
*/

// nyomtatandók (már itt lehetne objektum és tömb) deklarálása, ezekbe szedjük majd össze az adatokat
var stringsToPrint;
var dataToPrint;
var dataToCalc;
// var akarmi; //kiválasztott napok tömb hossza, de mivel szebben megírtad, már nem is kell
var lastSelectedDay;

// createAnyElement függvény, bármely HTML elem létrehozásához
function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

// Hónap napjainak megfelelő táblázat létrehozása, első oszlopban a napok innerHTML-be töltve, második oszlopban checkbox az adott nap kiválasztásához
// A hónap táblázat sorait hozzá kell rendelni a class="table table-striped" osztályokhoz
let table = document.querySelector("#gepjarmu");
let tBody = table.querySelector("tbody");
for (let i = 0; i < actualMonthLength; i++) {
    let tr = createAnyElement("tr");
    let td = createAnyElement("td");
    let day = i + 1;
    td.innerHTML = actualYear + ". " + monthName[month] + " " + day + ".";
    tr.appendChild(td);
    td = createAnyElement("td" /*, {class: "text-center"}*/ );
    let checkBox = createAnyElement("input", {
        type: "checkbox",
        class: "checkbox",
        id: day,
        //name: actualYear + ". " + month + ". " + day + ".", // Ez a hagyományos szüveg összevonás
        name: `${actualYear}. ${month + 1}. ${day}.`, // Ez pedig sokszor a jobb módszer, mert itt a változók nem string-ként kezeltek.
        value: date.setFullYear(actualYear, month, day)
    });
    td.appendChild(checkBox);
    tr.appendChild(td);
    tBody.appendChild(tr);
}
let tr = createAnyElement("tr");
let td = createAnyElement("td");
tr.appendChild(td);
td = createAnyElement("td");
// A gomb legyen a két oszlopba összevonva, colspan
let submit = createAnyElement("button", {
    type: "button", //"submit", 
    id: "print",
    name: "Print",
    class: "btn btn-outline-primary"
});
submit.innerHTML = "Nyomtatás";
td.appendChild(submit);
tr.appendChild(td);
tBody.appendChild(tr);

// "Nyomtatás" gomb megnyomására az adatok összeszedése
document.querySelector("#print").addEventListener("click", function () {
    stringsToPrint = {}; // az objektum kiürítése az adatgyűjtés előtt
    getStringsToPrint("input.nyomtatvany", stringsToPrint); // a nyomtatvány többi input field-jét RENDELD HOZZÁ a "nyomtatvany" osztályhoz!
    console.log(stringsToPrint);
});


document.querySelector("#print").addEventListener("click", function () {
    dataToPrint = []; // a tömb kiürítése az adatgyűjtés előtt
    getDataToPrint("input.checkbox", dataToPrint);
    console.log(dataToPrint);
});


document.querySelector("#print").addEventListener("click", function () {
    dataToCalc = [];
    getDataToCalc("input.checkbox", dataToCalc);
    console.log(dataToCalc);
});


document.querySelector("#print").addEventListener("click", function () {
    console.log(dataToPrint);
    console.log(stringsToPrint);
    /*akarmi = dataToCalc.length;
    console.log(akarmi);
    lastSelectedDay = dataToCalc[akarmi - 1];*/
    lastSelectedDay = dataToCalc[dataToCalc.length - 1];
    console.log(lastSelectedDay);
    console.log, date;
    console.log(todayDate);
    //let printWindow;
    //printForm();
    //printForm("print.html");


    /*
    if (lastSelectedDay > todayDate) {
      doneDate = lastSelectedDay
     } else doneDate = todayDate;
     */

    //Az a kérdés másik hónapban hogy fog működni? Bár az kevésbé zavaró, ha az utolsó munkanap készülne a nyomtatvány!!!
    /*if (lastSelectedDay != todayDate)  {
      doneDate = lastSelectedDay
     } else doneDate = todayDate;
     
     */

    if (new Date(lastSelectedDay).getMonth() < new Date(todayDate).getMonth()) {
        doneDate = todayDate
    } else if (lastSelectedDay != todayDate) {
        doneDate = lastSelectedDay
    } else doneDate = todayDate;

    console.log(doneDate);

    /*let pDate = parseInt(doneDate);
    let dateToPrint = new Date(pDate);
    ez még a régi változat volt, néha több lépcsőben készül el valami, aztán később összevonható egy összetett függvénybe*/

    /*let dateToPrint = new Date(parseInt(doneDate));
    
    let dateOfPrint = "Hévíz, " + dateToPrint.getFullYear() + ". " + monthName[dateToPrint.getMonth()] + " " + dateToPrint.getDate() + ".";
    console.log(dateOfPrint);*/

    // Érdemes lenne ezt a dátum parse-olás függvénybe kiszervezni és általánossá tenni.
    //doneDate = new Date(parseInt(doneDate));
    doneDate = parseDate(doneDate);

    var dateOfPrint = "Hévíz, " + doneDate.getFullYear() + ". " + monthName[doneDate.getMonth()] + " " + doneDate.getDate() + ".";
    console.log(dateOfPrint);

    //  dátum (msec) átalakítása: https://www.w3schools.com/js/js_date_formats.asp , https://www.w3schools.com/js/tryit.asp?filename=tryjs_date_convert
    /*var printArray;
    printArray.push(dataToPrint);
    printArray.push(stringsToPrint);
    printArray.push(dateOfPrint);
    console.log(printArray);*/
    printForm("print.html", dataToPrint, stringsToPrint, dateOfPrint);

});

//Feltétel vizsgálat alapján 3 ciklus gyűjti az adatokat, kettő, ha az input mező checkbox osztály, harmadik, ha nem az
function getStringsToPrint(from, data) {
    let inputs = document.querySelectorAll(from);
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    return data;
}

function getDataToPrint(from, data) {
    let inputs = document.querySelectorAll(from);
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            data.push(inputs[i].name);
        }
    }
    return data;
}

function getDataToCalc(from, data) {
    let inputs = document.querySelectorAll(from);
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            data.push(parseInt(inputs[i].value)); // parseInt-tel msec-ben, parseDate függvényeddel dátummá alakítva kapod
            //data.push(parseDate(inputs[i].value)
        }
    }
    return data;
}

function parseDate(data) {
    data = new Date(parseInt(data));
    return data;
}


function printForm(url, dataToPrint, stringsToPrint, dateOfPrint) { //Az adatokat is át kell adnod egy objektumban, nem csak az URL-t
    var printWindow = window.open(url /*, "Title"*/ );

    printWindow.onload = function () {
        //let content = "<button class='btn btn-primary' onclick='window.print();'>Confirm</button>";
        //let content = "<p>hónap (pl.: 2020. október hónap ; Minden p 11px)</p>";
        //myWindow.document.getElementById('printWindowBody').innerHTML = content;
        //printWindow.document.getElementById('yearAndMonth').innerHTML = content;
        printWindow.document.getElementById('yearAndMonth').innerHTML = actualYear + ". " + monthName[actualMonth] + " hónap";
        /*
        Ezeket az "id"-jű div-eket kell JS-szel kitölteni:
              printTable --- Ez lesz a legbonyolultabb!!!
        
        */
        //console.log(dataToPrint);
        console.log(dateOfPrint);
        printWindow.document.getElementById('nameAndAddress').innerHTML = "Név: " + stringsToPrint.employeename + " ; Lakcím: " + stringsToPrint.postcode + " " + stringsToPrint.city + ", " + stringsToPrint.address;
        printWindow.document.getElementById('carTypeAndPlate').innerHTML = "Személygépjármű típusa: " + stringsToPrint.cartype + " ; rendszáma: " + stringsToPrint.carplate;

        // https://getbootstrap.com/docs/4.5/content/tables/


        let printTableBody = printWindow.document.getElementById('printTableBody');

        let distance = parseFloat(stringsToPrint.distance);

        for (let i = 0; i < 31; i++) {

            //let tr = createAnyElement("tr");
            //let td = createAnyElement("td");

            if (i < dataToPrint.length) {
                let tr = createAnyElement("tr");
                let td = createAnyElement("td", {
                    class: "text-right"
                });
                td.innerHTML = dataToPrint[i];
                tr.appendChild(td);
                td = createAnyElement("td", {
                    class: "text-center"
                });
                td.innerHTML = stringsToPrint.city + " - Hévíz - " + stringsToPrint.city;
                tr.appendChild(td);
                td = createAnyElement("td", {
                    class: "text-right"
                });
                fromAndToDistance = distance * 2;
                td.innerHTML = fromAndToDistance.toFixed(2);
                tr.appendChild(td);
                td = createAnyElement("td", {
                    class: "text-right"
                });
                let kmPrice = distance * forintKm * 2;
                td.innerHTML = kmPrice.toFixed(2) + " Ft"; //Itt majd a sumPrice-hoz hasonlóan pontosítanii kell az összeget
                tr.appendChild(td);
                printTableBody.appendChild(tr);
            } else {
                let tr = createAnyElement("tr");
                let td = createAnyElement("td");
                /*td.innerHTML = 0; // Ezt a nullát kellene kicserélni, valami nem látszóó karakterre!!!
                Helyette a "tr" internal style-jában a 'height: 32px;' megadásával fix a sorok magassága. :)
                */
                tr.appendChild(td);
                td = createAnyElement("td");
                tr.appendChild(td);
                td = createAnyElement("td");
                tr.appendChild(td);
                td = createAnyElement("td");
                tr.appendChild(td);
                printTableBody.appendChild(tr);
            }
        }

        let sumPrice = forintKm * distance * dataToPrint.length * 2;
        printWindow.document.getElementById('sumPrice').innerHTML = sumPrice.toFixed(2) + " Ft";

        printWindow.document.getElementById('date').innerHTML = dateOfPrint;
        printWindow.print(); //--- ezt a kommenteta legvégén élő JS kóddá kell alakítani
        // printWindow.close(); //--- s ezt is, s itt azt is meg kell oldani, hogy csak a nyomtatást követően záródjon be
    }
    /*
    Ha szépen akarod megcsinálni, akkor kellenek a div-ek hozzá, class és egyedi id megadásával.
    Igazából csináld meg a nyomtatványt a print.html-ben a megfelelő CSS alkalmazásával.
    Majd printWindow.documet.getElementById().innerHTML = content; -ez írj egy ciklust, ami a megfeleő HTML elemeket feltölti
    az összegyűjtött adatokkal.
    FIGYELJ az "id"-kre!!!
    */
    //myWindow.window.close();

    // https://stackoverflow.com/questions/2109205/open-window-in-javascript-with-html-inserted
    // https://stackoverflow.com/questions/10472927/add-content-to-a-new-open-window

}