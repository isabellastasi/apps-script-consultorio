function getPatiences() {

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  const rows = sheet.getDataRange().getValues();
  const nomeMes = 'Janeiro'

  var dados = {
    mes: nomeMes,
    pacientes: []
  }

  rows.forEach(function (row, index) {
    if (index === 0) return;


    var paciente = {
      nome: row[0],
      numeroSessoes: row[11],
      valorPorSessao: row[12],
      valorTotal: row[13],
      pagamentoEfetuado: row[14],
      reciboEmitido: row[15],
      row: index
    }

    var diasConsultas = [];
    for (i = 1; i < 11; i++) {
      if (row[i]) {
        diasConsultas.push(row[i])

      }
    }

    paciente.diasConsultas = diasConsultas;
    const sheetPacientes = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pacientes');
    const rowsPacientes = sheetPacientes.getDataRange().getValues();

    rowsPacientes.forEach(function (rowP) {
      const pacientes = rowP
        .filter(p => p === paciente.nome)
      if (pacientes.length > 0) {
        paciente.cpf = rowP[1];
        paciente.email = rowP[2];
      }
    })

    dados.pacientes.push(paciente)

  })

  console.log(dados)
  return dados
}
