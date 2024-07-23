function enviarEmailParaListaDeEmails() {
  var assunto = "Solicitação de etiquetas aberta!";//Determina o titulo do email
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Respostas ao formulário 1");//obtem o conteúdo do email
  var ultimaLinha = sheet.getLastRow(); //obtem a ultima linha
  var ultimaColuna = sheet.getLastColumn(); // obtem a ultima coluna
  
  // Verifica se há dados na planilha
  if (ultimaLinha < 2) {
    Logger.log("Nenhum dado encontrado na planilha.");
    return;
  }

  // Verifica o valor da coluna K na última linha
  var statusColeta = sheet.getRange("K" + ultimaLinha).getValue();

  // Pega os cabeçalhos (linha 1) de todas as colunas
  var cabecalhos = sheet.getRange(1, 1, 1, ultimaColuna).getValues()[0];
  // Pega os dados da última linha de todas as colunas
  var ultimaLinhaDados = sheet.getRange(ultimaLinha, 1, 1, ultimaColuna).getValues()[0];

  var mensagem = "Ola, uma solicitação de etiquetas foi aberta. Abaixo temos os dados da solicitação:<br>";
  mensagem += "<table border='1' style='border-collapse: collapse;'>";
  mensagem += "<tr>";

  // Cabeçalhos
  mensagem += "<td style='border-right: 1px solid black; padding-right: 10px;'>";
  mensagem += "<b>Cabeçalho:</b><br><br>";
  mensagem += "<table>";
  for (var i = 0; i < cabecalhos.length; i++) {
    if (ultimaLinhaDados[i]) { // Verifica se a célula não está vazia
      mensagem += "<tr><td>" + cabecalhos[i] + "</td></tr>";
    }
  }
  mensagem += "</table>";
  mensagem += "</td>";

  // Dados da última linha
  mensagem += "<td style='padding-left: 10px;'>";
  mensagem += "<b>Última Linha:</b><br><br>";
  mensagem += "<table>";
  for (var j = 0; j < ultimaLinhaDados.length; j++) {
    if (ultimaLinhaDados[j]) { // Verifica se a célula não está vazia
      mensagem += "<tr><td>" + ultimaLinhaDados[j] + "</td></tr>";
    }
  }
  mensagem += "</table>";
  mensagem += "</td>";

  mensagem += "</tr>";
  mensagem += "</table>";

  var emails = ["gabriel.ton@mercadolivre.com"];//pessoas no email
  var ccEmail = ["ext_keferraz@mercadolivre.com"];//pessoas em copias para adicionar mais pessoas coloque uma ',' apos as aspas e entre aspas coloque outro email assim: "ext_keferraz@mercadolivre.com","exemplo@mercadolivre.com"
  var emailColunaU = sheet.getRange("U" + ultimaLinha).getValue();

  // Envia o email para cada endereço na lista e adiciona o email em CC
  for (var k = 0; k < emails.length; k++) {
    GmailApp.sendEmail(emails[k], assunto, "", {
      htmlBody: mensagem,
      cc: ccEmail.join(",")
    });
  }

  // Envia o email para o endereço na coluna U e adiciona o email em CC
  if (emailColunaU) {
    GmailApp.sendEmail(emailColunaU, assunto, "", {
      htmlBody: mensagem,
      cc: ccEmail.join(",")
    });
  }
}