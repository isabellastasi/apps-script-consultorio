function recorrencia(){
const spreadsheet = SpreadsheetApp.openById("1XprdKEXoGmeFmQo0xgygXOs1ruTmgqxjYLGVYy_oP0k").getSheetByName("Pacientes");
const eventCal = CalendarApp.getCalendarById("gk7q7fo10d4mfo6a968vc2lfcg@group.calendar.google.com");
const calendarioFeriados = CalendarApp.getCalendarById("pt.brazilian#holiday@group.v.calendar.google.com")

var signups = spreadsheet.getDataRange().getValues();

for(x=2; x<signups.length; x++){


var shift = signups[x];

console.log(shift[5])

if(shift[5]!=="Sim"){ 

var pacient = shift[0];
var startTime = shift[3];
var wDay = shift[4];
var d = '';


if(pacient && startTime && wDay){
switch (wDay){
  
case 'Segunda-feira':
  d = CalendarApp.Weekday.MONDAY
  break

case 'Terça-feira':
  d = CalendarApp.Weekday.TUESDAY
  break

case 'Quarta-feira':
  d = CalendarApp.Weekday.WEDNESDAY
  break

case 'Quinta-feira':
  d = CalendarApp.Weekday.THURSDAY
  break

case 'Sexta-feira':
  d = CalendarApp.Weekday.FRIDAY
  break

default:

}

var endTime = new Date(startTime.getTime() + 60*60*1000);

eventCal.createEventSeries(pacient,
    new Date(startTime),
    new Date(endTime),
    CalendarApp.newRecurrence().addWeeklyRule()
        .onlyOnWeekdays([d])
        .until(new Date('December 1, 2022')));

Logger.log('Evento criado para: ' + pacient + startTime + endTime);

spreadsheet.getRange(x+1,6 ).setValue("Sim");

}}
}

//Verifica os feriados e exclui os eventos nesse dia
const feriados = calendarioFeriados.getEvents(new Date('01/01/2022'), new Date('12/31/2022'))
feriados.forEach(function(feriado){
const data = feriado.getAllDayStartDate();
console.log(feriado.getTitle())
eventCal.getEventsForDay(data).forEach(evento => evento.deleteEvent())
})

}
