import type { WebhookRepository } from "@/repositories/webhook-repository";
import { ERROR_MESSAGES } from "@/shared/error-messages";

interface DeleteWebhookRequest {
  creatorID: string
  uniquePath: string
}

export class DeleteWebhookUseCase {
  constructor(private webhookRepository: WebhookRepository) {}

  async execute(props: DeleteWebhookRequest): Promise<void> {
    const webhook = await this.webhookRepository.findByUniquePath(props.uniquePath)

    if (!webhook) throw new Error(ERROR_MESSAGES["NOT_FOUND"])

    const hasSameCreatorID = webhook.hasSameCreatorID(props.creatorID)
    
    if(!hasSameCreatorID) throw new Error(ERROR_MESSAGES["CREATOR_ID_MISMATCH"])

    await this.webhookRepository.delete(webhook.id.toString())
  }
}