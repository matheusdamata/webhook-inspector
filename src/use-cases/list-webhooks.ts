import type { Webhook } from "@/entities/webhook";
import type { WebhookRepository } from "@/repositories/webhook-repository";
import { ERROR_MESSAGES } from "@/shared/error-messages";

interface ListWebhooksRequest {
  creatorID: string
}

export class ListWebhooksUseCase {
  constructor(private webhookRepository: WebhookRepository) {}

  async execute(props: ListWebhooksRequest): Promise<Webhook[]> {
    const creatorExists = await this.webhookRepository.findByCreatorID(props.creatorID)

    if (!creatorExists) throw new Error(ERROR_MESSAGES["NOT_FOUND"])

    const webhooks = await this.webhookRepository.findAll(props.creatorID)
    
    return webhooks
  }
}