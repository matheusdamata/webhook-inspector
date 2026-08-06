import type { WebhookRepository } from "@/repositories/webhook-repository";
import { ERROR_MESSAGES } from "@/shared/error-messages";

interface DeleteWebhookRequest {
  uniquePath: string
}

export class DeleteWebhookUseCase {
  constructor(private webhookRepository: WebhookRepository) {}

  async execute(props: DeleteWebhookRequest): Promise<void> {
    const webhookExists = await this.webhookRepository.findByUniquePath(props.uniquePath)

    if (!webhookExists) throw new Error(ERROR_MESSAGES["NOT_FOUND"])

    await this.webhookRepository.delete(webhookExists.id.toString())
  }
}