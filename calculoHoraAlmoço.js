  function calculoAlmoco(horaAlmoco) {
    // Vamos assumir que horaAlmoco está no formato "HH:MM"
    const [horas, minutos] = horaAlmoco.split(":").map(Number);

    // Convertendo o horário para minutos
    const totalMinutos = horas * 60 + minutos;

    if (totalMinutos < 60 * 12) {
        // Antes do meio-dia
        return "Ainda não é hora do almoço!";
    } else {
        // Meio-dia ou depois
        return "Hora de almoçar!";
    }
}

// Exemplo de uso:
const horaAlmocoUsuario = "12:30"; // Substitua pelo horário desejado
console.log(calculoAlmoco(horaAlmocoUsuario));
