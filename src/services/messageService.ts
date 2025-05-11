
import { IMessageGenerator } from '../interfaces/IMessageGenerator';
import { IProfileFetcher } from '../interfaces/IProfileFetcher';
import { recipientDataMock, recipientPostsMock, senderDataMock, senderPostsMock } from '../mocks/jsonMocks';
import { mockSenderPerfilSummary, mockRecipientPerfilSummary } from '../mocks/profileDataMocks';
import { ProfileCharacteristicsService } from './characteristicsService';
import { ProfileSummarizerService } from './profileSummarizer';

const categoryInstructions: Record<string, string> = {
  post_question: "Instrucción: El receptor publicó un post interesante. Escribí un mensaje comenzando por lo que te generó ese post y realizá una pregunta concreta.",
  post_comment: "Instrucción: Comentaste un post del receptor. Escribí un mensaje diciendo que lo comentaste.",
  first_like: "Instrucción: Fuiste el primer like en un post del receptor. Mencioná eso como punto de partida.",
  course: "Instrucción: El receptor hizo un curso que te interesa. Preguntá si lo recomienda.",
  new_role: "Instrucción: El receptor empezó un nuevo rol o trabajo. Felicitalo/a y conectá con tu propuesta.",
  event: "Instrucción: El receptor participó en una charla o evento. Mencioná eso y buscá conectar.",
  common_contact: "Instrucción: Tienen un contacto en común. Usalo como excusa para iniciar la conversación.",
  share_resource: "Instrucción: Sabés que al receptor le interesa un tema y querés compartirle un artículo o recurso.",
  achievement: "Instrucción: El receptor publicó un logro o reconocimiento. Felicitalo/a y agregá una propuesta liviana.",
  custom: "Instrucción: No hay un disparador específico. Solo querés generar una conversación inicial personalizada."
};

function buildPrompt(
  //category: string,
  idioma: string,
  senderInfo: string,
  recipientSummary: string,
  problem: string,
  solution: string
): string {
  //const instruction = categoryInstructions[category] || categoryInstructions["custom"];

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


export class MessageService {
  constructor(
    private readonly generator: IMessageGenerator,
    private readonly fetcher: IProfileFetcher,
    private readonly summarizationService: ProfileSummarizerService,
    private readonly characteristicsService: ProfileCharacteristicsService
  ) {}

  async generate(
    idioma: string,
    senderUrl: string,
    recipientUrl: string,
    problem: string,
    solution: string,
    
    //category: string
  ): Promise<string[]> {


    const senderData = senderDataMock//await this.fetcher.fetchProfile(senderUrl);
    const senderPosts = senderPostsMock//await this.fetcher.fetchPosts(senderUrl);
    console.log('Sender Data:', senderData);
    console.log('Sender Posts:', senderPosts);
    
    const recipientData = recipientDataMock//await this.fetcher.fetchProfile(recipientUrl); 
    const recipientPosts = recipientPostsMock//await this.fetcher.fetchPosts(recipientUrl);

    console.log('Recipient Data:', recipientData);
    console.log('Recipient Posts:', recipientPosts);

    const senderPerfilSummary = await this.characteristicsService.getSenderCharacteristics(senderData, senderPosts);
    const recipientPerfilSummary = await this.characteristicsService.getRecipientCharacteristics(recipientData, recipientPosts);
    
    console.log('Sender Perfil Summary:', senderPerfilSummary);
    console.log('Recipient Perfil Summary:', recipientPerfilSummary);
    
    const senderSummary = await this.summarizationService.getSenderSummary(senderPerfilSummary);
    const recipientSummary = await this.summarizationService.getRecipientSummary(recipientPerfilSummary);
  
    console.log('Resumen del emisor:', senderSummary);
    console.log('Resumen del receptor:', recipientSummary);

    const prompt = buildPrompt(
      //category,
      idioma,
      senderSummary,
      recipientSummary, // usamos el resumen estilizado en lugar del JSON crudo
      problem,
      solution
    );
    console.log('Prompt:', prompt);
    const [raw] = await this.generator.generateMessages(prompt);
  
    return raw
      .split(/\d\.\s+/)
      .map(m => m.trim())
      .filter(Boolean);
  }
  
}
