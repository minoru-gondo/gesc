export function enumStateMatricula(arg) {
    const type = {
      "A":"Ativa",
      "B":"Bloqueada",
      "C":"Cancelada",
      "D":"Desistente",
      "F":"Finalizada",
      "T":"Trancada",
      "Ativa":"A",
      "Bloqueada":"B",
      "Cancelada":"C",
      "Desistente":"D",
      "Finalizada":"F",
      "Trancada":"T"
    }
    return type[arg]
  }