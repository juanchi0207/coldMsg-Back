# ColdMessages

**ColdMessages** es una herramienta que genera *icebreakers* personalizados para LinkedIn utilizando información real del perfil y publicaciones del receptor. Mediante la API de LinkedIn (a través de RapidAPI) se obtienen datos y, con el poder de GPT (OpenAI), se redactan mensajes en un tono humano, profesional y realista.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Cómo Correr en Desarrollo](#cómo-correr-en-desarrollo)
- [Generar Build y Correr en Producción](#generar-build-y-correr-en-producción)
- [Cómo Funciona](#cómo-funciona)
- [Ejemplo de Uso](#ejemplo-de-uso)
- [Contribución](#contribución)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Descripción

ColdMessages transforma la forma de conectar en LinkedIn. El sistema toma la URL del emisor y receptor, identifica un problema y una solución, para luego obtener el perfil y publicaciones del receptor mediante RapidAPI. Con estos datos, extrae características de estilo y engagement, genera un resumen de estilo usando OpenAI y construye el *prompt* adecuado. Finalmente, ColdMessages llama a la API de OpenAI para generar tres mensajes icebreakers listos para enviar, adaptados al tono profesional y humano deseado.

## Tecnologías Utilizadas

- **Node.js + Express**: Servidor y enrutamiento.
- **TypeScript**: Tipado y calidad en el código.
- **OpenAI API (GPT-4)**: Generación de texto natural.
- **RapidAPI – LinkedIn Data API**: Obtención de datos reales del perfil de LinkedIn.
- **dotenv**: Manejo de variables de entorno.
- **CORS**: Comunicación segura entre dominios.
- **Axios**: Solicitudes HTTP.

## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

```bash
coldMsg-Back/
├── src/
│   ├── adapters/           # Conexiones a servicios externos (OpenAI, RapidAPI)
│   ├── interfaces/         # Interfaces TypeScript (abstracciones)
│   ├── routes/             # Rutas Express (ej: /generate)
│   ├── services/           # Lógica principal del dominio (mensajes, resumen, fetchers)
│   ├── utils/              # Funciones utilitarias (buildPrompt, limpiarPerfil)
│   ├── app.ts              # Configuración de Express
│   └── index.ts            # Punto de entrada
├── .env.development        # Variables para entorno de desarrollo
├── .env.production         # Variables para producción
├── tsconfig.json
├── package.json
└── README.md
```

## Variables de entorno

Crear archivos `.env.development` y `.env.production` según corresponda. Las variables necesarias son:

```env
OPENAI_API_KEY=sk-...
RAPIDAPI_KEY=your_rapidapi_key
PORT=3000 en dev || 8080 en prod 
```

## Cómo correr en desarrollo

```bash
npm install
npm run dev
```

## Cómo generar build y correr en producción

```bash
npm run build
npm start
```

## Cómo funciona

El cliente envía una solicitud con:

- URL del **emisor** y **receptor** de LinkedIn
- **Problema** identificado y **solución** ofrecida
- **Idioma** de respuesta

El backend realiza los siguientes pasos:

1. Obtiene el perfil y publicaciones del receptor vía **RapidAPI**
2. Extrae características de escritura y engagement
3. Genera un **resumen de estilo** con **OpenAI**
4. Construye el **prompt** de generación
5. Llama a **OpenAI** para generar **3 mensajes tipo icebreaker** listos para usar
