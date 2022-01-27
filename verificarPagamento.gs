function verificarPagamento() {

const dados = getPatiences();
var comprovantes = [];
const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
const pastaPagamentos = DriveApp.getFolderById('1jEU6NT1qhnPzepY7THZeNivV0MzxyKGZ');
var pastaMes = pastaPagamentos.getFoldersByName(dados.mes)

if(!pastaMes.hasNext()){

  pastaMes = pastaPagamentos.createFolder('Janeiro');
};

while(pastaMes.hasNext()){
  var pasta = pastaMes.next();
  pasta = pasta.getId();
}

const pastaM = DriveApp.getFolderById(pasta);

const comprovantesMes = pastaM.getFiles()
while(comprovantesMes.hasNext()){
var comprovante = comprovantesMes.next();
comprovantes.push(comprovante.getName())

}

dados.pacientes.forEach(function(paciente){

if(paciente.pagamentoEfetuado === 'Não'){
  console.log(paciente.nome)

if(comprovantes.includes(`${paciente.nome} - ${dados.mes}`)){

sheet.getRange(paciente.row+1,15).setValue('Sim');
}
}

})

}