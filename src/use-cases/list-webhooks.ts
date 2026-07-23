import type { Webhook } from "@/entities/webhook";
import type { WebhookRepository } from "@/repositories/webhook-repository";

interface ListWebhooksRequest {
  userReferenceId: string
}

export class ListWebhooksUseCase {
  constructor(private webhookRepository: WebhookRepository) {}

  async execute(props: ListWebhooksRequest): Promise<Webhook[]> {
    const webhooks = await this.webhookRepository.findAll(props.userReferenceId)
    return webhooks
  }
}