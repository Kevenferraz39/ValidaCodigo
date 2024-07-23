function transferirDados() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();//puxa a planilha que está ativa
    var origem = ss.getSheetByName("Respostas ao formulário 1");//puxa a tabela "Respostas ao formulário 1" da tabela ativa
    
    var ultimaLinhaOrigem = origem.getLastRow();// Pega a ultima linha 
    var ultimaColunaOrigem = origem.getLastColumn();// Pega a ultima coluna
    
    // Obtém os dados da última linha da aba de origem
    var dadosUltimaLinha = origem.getRange(ultimaLinhaOrigem, 1, 1, ultimaColunaOrigem).getValues()[0];
    
    // Determina a aba de destino com base no valor da coluna E
    var destino;
    switch (dadosUltimaLinha[4]) {
      case "Blocado":
        destino = ss.getSheetByName("Protocolo-Blocado");
        break;
      case "Produção":
        destino = ss.getSheetByName("Protocolo-Produção");
        break;
      case "Sampa":
        destino = ss.getSheetByName("Protocolo-Sampa");
        break;
      case "Reciving":
        destino = ss.getSheetByName("Protocolo-Reciving");
        break;
      case "Stage-in":
        destino = ss.getSheetByName("Protocolo-stage in");
        break;
      case "Expedicao":
        destino = ss.getSheetByName("Protocolo-Expedicao");
        break;
        case "INP":
        destino = ss.getSheetByName("Protocolo-INP");
        break;
      default:
        Logger.log("Erro na exceção");
        break;
    }
  
    // Filtra os dados não vazios
    var dadosNaoVazios = [];
    for (var i = 0; i < dadosUltimaLinha.length; i++) {
      if (dadosUltimaLinha[i]) {
        dadosNaoVazios.push(dadosUltimaLinha[i]);
      }
    }
    
    // Encontra a próxima linha vazia na aba de destino
    var ultimaLinhaDestino = destino.getLastRow();
    var proximaLinhaDestino = ultimaLinhaDestino + 1;
    
    // Insere os dados não vazios na aba de destino
    destino.getRange(proximaLinhaDestino, 1, 1, dadosNaoVazios.length).setValues([dadosNaoVazios]);
  }
  