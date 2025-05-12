
import { IMessageGenerator } from '../interfaces/IMessageGenerator';
import { IProfileFetcher } from '../interfaces/IProfileFetcher';
import { recipientDataMock, recipientPostsMock, senderDataMock, senderPostsMock } from '../mocks/jsonMocks';
import { mockSenderPerfilSummary, mockRecipientPerfilSummary } from '../mocks/profileDataMocks';
import { buildPrompt } from '../utils/buildPrompt';
import { ProfileCharacteristicsService } from './characteristicsService';
import { ProfileSummarizerService } from './profileSummarizer';


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
