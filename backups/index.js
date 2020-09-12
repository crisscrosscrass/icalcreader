const fs = require('fs');
const ical2json = require("ical2json");
const { unescape } = require('querystring');


const fileContent = fs.readFileSync("./calendar.ics", "utf-8");

// console.log(fileContent);

function getDate(date) {
    // expect to get a String like 20201021
    return `${date.slice(4, 6)}/${date.slice(6, 8)}/${date.slice(0, 4)}`;
}

function isInRange(startD, endD, startDate, endDate) {
    return (startD >= startDate && startD <= endDate) ||
        (startDate >= startD && startDate <= endD);
}

function pushToCollection(collection, name, content) {
    if (collection[name] != undefined) {
        collection[name].push(content);
    } else {
        collection[name] = [];
        collection[name].push(content);
    }
    return collection;
}

today = "09/11/2020";



let arrayCollection = {};
let counter = 0;

// From ical to JSON
var output = ical2json.convert(fileContent);
var events = output.VCALENDAR[0].VEVENT;
console.log(output.VCALENDAR[0].VEVENT.length);
for (let i = 0; i < events.length; i++) {
    counter++;
    // console.log(events[i]);
    let startDate = getDate(events[i]['DTSTART;VALUE=DATE']);
    let endDate = getDate(events[i]['DTEND;VALUE=DATE']);
    // console.log(today, startDate, endDate, isInRange(today, startDate, endDate), events[i].SUMMARY);
    if (isInRange(today, today, startDate, endDate)) {
        // console.log('START:' + events[i]['DTSTART;VALUE=DATE'],
        //         'END:' + events[i]['DTEND;VALUE=DATE'],
        //         events[i].SUMMARY);
        // console.log(events[i].SUMMARY);
        let state = events[i].SUMMARY.replace(/(?<=\]).*/, "");
        let content = events[i].SUMMARY.replace(/.*(\]\s*)(?!.*\])/, "")
        content.includes("(") ? content = content.replace(/\s*\(.*/, "") : "";
        arrayCollection = pushToCollection(arrayCollection, state, content);
    }
}

console.log(`Read ${counter} calendar events`);
// remove duplicates
for (const [key, value] of Object.entries(arrayCollection)) {
    let uniqueSet = new Set(value);
    arrayCollection[key] = [...uniqueSet];
}

for (const [key, value] of Object.entries(arrayCollection)) {
    console.log(`KEY : ${key} \n VALUE: ${value} \n LENGTH: ${value.length} \n`);
}