function gerarRecibo() {

  const dados = getPatiences();
  const googleDocTemplate = DriveApp.getFileById('1xLVP8bT0QUREoaf08Zry1J5ws-z2S03ThNCtyKymvto');
  const pastaRecibos = DriveApp.getFolderById('12xVuXnHGTt3TaDY9Dl6bl6ncxeXDisXJ');
  const pastaMes = pastaRecibos.getFoldersByName(dados.mes);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var pastaDestino = '';

  if (!pastaMes.hasNext()) {
    pastaDestino = pastaRecibos.createFolder(dados.mes);
  } else {
    while (pastaMes.hasNext())
      pastaDestino = pastaMes.next();
  }


  dados.pacientes.forEach(function (paciente) {

    if (paciente.reciboEmitido === 'Sim' || paciente.pagamentoEfetuado === 'Não') return

    const copy = googleDocTemplate.makeCopy(`Recibo_ ${paciente.nome}`, pastaDestino);
    const doc = DocumentApp.openById(copy.getId());
    const body = doc.getBody();
    const dataHoje = new Date();
    const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
    const dataAgora = `${dataHoje.getDate()} ` + ` de ` + `${meses[dataHoje.getMonth()]}` + ` de 2021`


    body.replaceText('{{Nome Completo}}', paciente.nome);
    body.replaceText('{{CPF}}', paciente.cpf);
    body.replaceText('{{Total}}', paciente.valorTotal);
    body.replaceText('{{Total escrito}}', codigoExtenso(paciente.valorTotal));
    body.replaceText('{{numeroSessoes}}', paciente.numeroSessoes);
    body.replaceText('{{diasSessoes}}', paciente.diasConsultas.toString().replaceAll(',', ', '));
    body.replaceText('{{mes}}', dados.mes.toLowerCase());
    body.replaceText('{{valorSessao}}', paciente.valorPorSessao);
    body.replaceText('{{sessaoEscrito}}', codigoExtenso(paciente.valorPorSessao));
    body.replaceText('{{hoje}}', dataAgora);

    doc.saveAndClose();

    sheet.getRange(paciente.row + 1, 16).setValue('Sim');

    const corpoEmail = `
  Olá. ${paciente.nome}!

  Segue o recibo das sessões de psicoterapia do mês de ${dados.mes}

  Qualquer dúvida estamos a disposição.

  Atenciosamente,

  Maria da Silva
  Psicóloga
  `
    MailApp.sendEmail('isastasi@gmail.com', 'Recibo Psicoterapia', corpoEmail, {
      attachments: [doc.getAs(MimeType.PDF)]
    });

  })
}

