import type { WebhookRepository } from "@/repositories/webhook-repository";

interface DeleteWebhookRequest {
  uniquePath: string
}

export class DeleteWebhookUseCase {
  constructor(private webhookRepository: WebhookRepository) {}

  async execute(props: DeleteWebhookRequest): Promise<void> {
    const webhookExists = await this.webhookRepository.findByUniquePath(props.uniquePath)

    if (!webhookExists) throw new Error('Webhook not found.')

    await this.webhookRepository.delete(webhookExists.id.toString())
  }
}