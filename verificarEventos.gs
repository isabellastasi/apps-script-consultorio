function getAllEvents() {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

  const rows = sheet.getDataRange().getValues();


  var nomeMes = sheet.getName();


  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  const mes = meses.indexOf(nomeMes)
  const inicioMes = new Date(2022, mes, 1)
  const fimMes = new Date(2022, mes + 1, 0)


  rows.forEach(function (row, index) {
    if (index === 0) return;

    var patient = row[0].split(" ")[0];

    var events = CalendarApp.getCalendarById("gk7q7fo10d4mfo6a968vc2lfcg@group.calendar.google.com").getEvents(inicioMes, fimMes,
      { search: patient });


    events.forEach(function (event) {
      let x = 1;
      var dataConsulta = event.getStartTime();

      //Confere se a celula está preenchida, se estiver, incrementa até encontrar uma vazia
      while (!sheet.getRange(index + 1, x).isBlank()) {
        x++;
      }
      sheet.getRange(index + 1, x).setValue(dataConsulta.getDate().toString());
    })

  })

}
