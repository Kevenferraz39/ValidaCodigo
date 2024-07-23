const agenda = () => {
    try {
      var planilha = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var valores = planilha.getDataRange().getValues();
      Logger.log(valores);
  
      var calendarId = "ext_keferraz@mercadolivre.com";  // ID do calendário
      var agenda = CalendarApp.getCalendarById(calendarId);
  
      if (!agenda) {
        throw new Error('Não foi possível encontrar o calendário com o ID: ' + calendarId);
      }
  
      for (var i = 1; i < valores.length; i++) {
        var linha = valores[i];
        var sincronizado = linha[9];
  
        if (sincronizado.toLowerCase() !== "sim") {
          var dia = linha[0];
          var inicio = linha[1];
          var fim = linha[2];
          var titulo = linha[3];
          var descricao = linha[4];
          var convidados = linha[7] ? linha[7].split(',').map(email => email.trim()) : [];
          var local = linha[8];
  
          // Verificar se todos os valores necessários estão presentes
          if (!dia || !inicio || !fim || !titulo) {
            Logger.log('Valores faltantes na linha ' + (i + 1));
            continue;
          }
  
          // Formatando a data de início e fim
          try {
            var dataInicio = parseDateTime(dia, inicio);
            var dataFim = parseDateTime(dia, fim);
  
            if (!dataInicio || !dataFim) {
              Logger.log('Data de início ou fim inválida na linha ' + (i + 1));
              continue;
            }
  
            Logger.log('Criando evento: ' + titulo + ' de ' + dataInicio + ' até ' + dataFim);
  
            var evento = agenda.createEvent(titulo, dataInicio, dataFim, {
              description: descricao,
              location: local
            });
            
            // Adicionar convidados
            if (convidados.length > 0) {
              Logger.log('Adicionando convidados: ' + convidados.join(', '));
              convidados.forEach(function(convidado) {
                evento.addGuest(convidado);
              });
            }
  
            // Atualizar coluna sincronizada
            planilha.getRange(i + 1, 10).setValue("Sim");
            Logger.log('Evento criado com sucesso e coluna atualizada para linha ' + (i + 1));
          } catch (e) {
            Logger.log('Erro ao criar evento na linha ' + (i + 1) + ': ' + e.message);
          }
        }
      }
    } catch (e) {
      Logger.log('Erro ao executar a função agenda: ' + e.message);
      SpreadsheetApp.getUi().alert('Erro: ' + e.message + '. Como resolver: Verifique se o ID do calendário está correto e se você tem permissão para acessá-lo.');
    }
  }
  
  const parseDateTime = (dia, hora) => {
    try {
      // Esperando a data no formato dd/MM/yyyy
      var partesData = dia.split('/');
      var dia = parseInt(partesData[0], 10);
      var mes = parseInt(partesData[1], 10) - 1; // Meses são indexados de 0 a 11
      var ano = parseInt(partesData[2], 10);
  
      var data = new Date(ano, mes, dia);
  
      var horaSplit = hora.split(":");
      data.setHours(parseInt(horaSplit[0], 10), parseInt(horaSplit[1], 10));
      
      if (isNaN(data.getTime())) {
        throw new Error('Data inválida');
      }
  
      return data;
    } catch (e) {
      Logger.log('Erro ao analisar data e hora: ' + dia + ' ' + hora + ', Erro: ' + e.message);
      return null;
    }
  }
  
  /*
  Pontos Importantes:
  Separação dos Convidados: A linha var convidados = linha[7] ? linha[7].split(',').map(email => email.trim()) : []; foi ajustada para dividir a string de e-mails por vírgulas e remover os espaços em branco ao redor de cada e-mail.
  
  Adição de Convidados: O loop convidados.forEach(function(convidado) { evento.addGuest(convidado); }); percorre a lista de e-mails e adiciona cada um como convidado ao evento.
   */
  