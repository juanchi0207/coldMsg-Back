import OpenAI from 'openai';
import { IMessageGenerator } from '../interfaces/IMessageGenerator';


// Instancia el cliente
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class OpenAIMessageGenerator implements IMessageGenerator {
  async generateMessages(prompt: string): Promise<string[]> {
    const res = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      n: 1,
      temperature: 0.7
    });

    return res.choices.map(c =>
      // Si content es null o undefined, cae al string vacío, luego trim()//
      (c.message?.content ?? '').trim()
    );
  }
}

export class OpenAIProfileSummarizer {
  async summarizePerfil(perfilSummary: Record<string, any>): Promise<string> {
    const res = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.7,
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente experto en comunicación y personalización de mensajes.'
        },
        {
          role: 'user',
          content: `Tienes un objeto JSON llamado perfilSummary con el análisis del comportamiento, estilo de escritura, nivel de formalidad, tono, temas clave y patrones de engagement de una persona. 
A partir de esa información, generá un párrafo breve (3-5 líneas) que resuma cómo debería hablarsele a esta persona para conectar con ella de forma natural y efectiva. 
Este resumen se va a usar como parte de un prompt para generar mensajes personalizados.

perfilSummary = ${JSON.stringify(perfilSummary, null, 2)}

Respondé solo con el resumen.`
        }
      ]
    });

    return (res.choices[0].message?.content ?? '').trim();
  }
}

export class OpenAIgetCaracteristics {
  async getCharacteristics(profileJSON: Record<string, any>, postsJSON: Record<string, any>): Promise<Record<string, any>> {
    const res = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.7,
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content: 'Eres un analista de perfiles que, a partir de datos crudos de LinkedIn (perfil y publicaciones), genera un resumen estructurado en JSON llamado perfilSummary.'
        },
        {
          role: 'user',
          content: `Aquí tienes los datos crudos:
    
    profile = ${JSON.stringify(profileJSON, null, 2)}
    
    posts = ${JSON.stringify(postsJSON, null, 2)}
    
    Tarea: Analiza ambos objetos y devuelve un único objeto JSON con la forma:
    
    {
      "firstName": "…",
      "lastName": "…",
      "comportamiento": "…",
      "estilo_escritura": "…",
      "nivel_formalidad": "…",
      "tono": "…",
      "temas_principales": ["…", …],
      "patrones_engagement": "…",
      "longitud_promedio": "…",
      "uso_de_menciones": Boolean,
      "enfoque_metricas": Boolean,
      "insercion_de_links": Boolean
    }
    
    - firstName y lastName: extraídos de profile.firstName y profile.lastName.
    - comportamiento: cómo interactúa con su audiencia.
    - estilo_escritura: características de su redacción.
    - nivel_formalidad: formal, informal o intermedio.
    - tono: actitud general (agradecido, visionario, técnico…).
    - temas_principales: lista de los 4–6 temas más recurrentes.
    - patrones_engagement: qué tipo de posts generan más reacciones.
    - longitud_promedio: típica extensión de sus publicaciones (oraciones o párrafos).
    - uso_de_menciones: si suele etiquetar personas/empresas.
    - enfoque_metricas: si resalta cifras y resultados.
    - insercion_de_links: si incluye enlaces externos.
    
    Devuelve solo ese JSON, sin texto adicional.`
        }
      ]
    });
    
    return JSON.parse((res.choices[0].message?.content ?? '').trim());
  }
}
