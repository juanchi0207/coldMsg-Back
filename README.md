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
- [Ejemplo de Uso](#ejemplo-de-uso)}
- [Correr todo con Docker](#correr-todo-con-docker)


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

## Ejemplo de uso

### Request desde el cliente

```json
POST /generate
Content-Type: application/json

{
  "idioma":"Español (ARG)"
  "senderUrl": "https://www.linkedin.com/in/juanperez/",
  "recipientUrl": "https://www.linkedin.com/in/adamselipsky/",
  "problem": "Muchas empresas luchan por implementar IA de forma práctica en sus equipos de trabajo.",
  "solution": "Ayudamos a product teams a aterrizar casos de uso de IA y prototiparlos en días, no meses.",
}

```

## Correr todo con Docker

1. Cloná el proyecto y asegurate de tener Docker instalado.
2. Creá una red para que los servicios se comuniquen:

```bash
docker network create coldmsg-net
```
```bash
docker pull ghcr.io/juanchi0207/coldmsg-back:dev (o main)
docker pull ghcr.io/juanchi0207/coldmsg-front:dev (o main)
```
```bash
docker run -d --name coldmsg-front --network coldmsg-net -p 80:80 ghcr.io/juanchi0207/coldmsg-front:dev
docker run -d --name coldmsg-back --network coldmsg-net -p 8080:8080 ghcr.io/juanchi0207/coldmsg-back:dev

```

