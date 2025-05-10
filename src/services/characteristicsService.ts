import { OpenAIgetCaracteristics } from "../adapters/openaiAdapter";

export class ProfileCharacteristicsService {
    constructor(private readonly summarizer: OpenAIgetCaracteristics) {}
  
    async getRecipientCharacteristics(profileData: any, postsData: any): Promise<string> {
      const characteristics = await this.summarizer.getCharacteristics(profileData, postsData);
      return JSON.stringify(characteristics);
    }
    async getSenderCharacteristics(profileData: any, postsData: any): Promise<string> {
      return JSON.stringify(await this.summarizer.getCharacteristics(profileData, postsData));
    }
  }