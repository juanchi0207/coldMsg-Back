import axios from 'axios';
import { IProfileFetcher } from '../interfaces/IProfileFetcher';
import { limpiarPerfilLinkedIn } from '../utils/limpiarPerfilLinkedIn';

export class LinkedinFetcher implements IProfileFetcher {
  private readonly apiKey = process.env.RAPIDAPI_KEY;
  private readonly host = 'linkedin-data-api.p.rapidapi.com';

  async fetchProfile(url: string): Promise<any> {
    if (!this.apiKey) {
      throw new Error('RAPIDAPI_KEY no está definida en las variables de entorno');
    }
  
    const encodedUrl = encodeURIComponent(url);
    const endpoint = `https://${this.host}/get-profile-data-by-url?url=${encodedUrl}`;
  
    try {
      const res = await axios.get(endpoint, {
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': this.host
        }
      });
  
      const rawProfile = res.data;
      const cleanedProfile = limpiarPerfilLinkedIn(rawProfile);
      return cleanedProfile;
    } catch (err: any) {
      console.error('Error al obtener perfil de LinkedIn:', err?.response?.data || err.message);
      throw new Error('No se pudo obtener el perfil desde LinkedIn');
    }
  }

  private extractUsernameFromUrl(linkedinUrl: string): string {
    const match = linkedinUrl.match(/linkedin\.com\/in\/([^\/\?]+)/i);
    if (!match || !match[1]) {
      throw new Error('No se pudo extraer el username de la URL de LinkedIn');
    }
    return match[1];
  }

  async fetchPosts(url: string): Promise<string[]> {
    if (!this.apiKey) {
      throw new Error('RAPIDAPI_KEY no está definida en las variables de entorno');
    }
  
    const username = this.extractUsernameFromUrl(url);
    const endpoint = `https://${this.host}/get-profile-posts?username=${username}`;
  
    try {
      const res = await axios.get(endpoint, {
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': this.host
        }
      });
  
      const posts = res.data?.data || [];
      
      // Solo los primeros 5 con texto presente
      const texts = posts
        .slice(0, 5)
        .map((p: any) => p.text)
        .filter((t: string) => typeof t === 'string' && t.trim() !== '');
  
      return texts;
    } catch (err: any) {
      console.error('Error al obtener publicaciones de LinkedIn:', err?.response?.data || err.message);
      throw new Error('No se pudieron obtener las publicaciones del perfil');
    }
  }
  
  
}
