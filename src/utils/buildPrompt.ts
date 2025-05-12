export function buildPrompt(
  idioma: string,
  senderInfo: string,
  recipientSummary: string,
  problem: string,
  solution: string
): string {

  return `

Generá las respuestas en idioma ${idioma}.

Información del receptor:
${recipientSummary}

Instrucción adicional: 
Los mensajes deben estar escritos en un tono que refleje cómo se comunica el emisor. Este es un resumen de su estilo de escritura y personalidad:
"${senderInfo}"

Problema que el emisor detecta: ${problem}
Solución que ofrece: ${solution}

Generá 3 mensajes tipo icebreaker distintos (de 2-3 líneas), breves, humanos y conversacionales para iniciar una charla profesional por LinkedIn.

Formato esperado:
1. [mensaje]
2. [mensaje]
3. [mensaje]

No uses lenguaje de venta directa. Que suene natural y realista.
`;
}