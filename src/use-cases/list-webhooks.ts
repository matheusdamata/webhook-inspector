import type { Webhook } from "@/entities/webhook";
import type { WebhookRepository } from "@/repositories/webhook-repository";

interface ListWebhooksRequest {
  creatorID: string
}

export class ListWebhooksUseCase {
  constructor(private webhookRepository: WebhookRepository) {}

  async execute(props: ListWebhooksRequest): Promise<Webhook[]> {
    const creatorExists = await this.webhookRepository.findByCreatorID(props.creatorID)

    if (!creatorExists) throw new Error('Creator not found.')

    const webhooks = await this.webhookRepository.findAll(props.creatorID)
    
    return webhooks
  }
}