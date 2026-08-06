import { UniqueEntityID } from "@/entities/unique-entity-id"
import { Webhook } from "@/entities/webhook"
import type { WebhookRepository } from "@/repositories/webhook-repository"
import { ERROR_MESSAGES } from "@/shared/error-messages"

interface CreateWebhookRequest {
  uniquePath: string
  creatorID: string
}

export class CreateWebhookUseCase {
  constructor(private webhookRepository: WebhookRepository) {}

  async execute(props: CreateWebhookRequest): Promise<void> { 
    const invalidUserReferenceID = props.creatorID.length === 0 || props.creatorID === null || props.creatorID === undefined
    
    if (invalidUserReferenceID) throw new Error(ERROR_MESSAGES["REQUIRED_VALUE"])

    const isAnExistingWebhook = await this.webhookRepository.findByUniquePath(props.uniquePath)
    
    if (isAnExistingWebhook) throw new Error(ERROR_MESSAGES["ALREADY_EXISTS"])

    const webhook = Webhook.create({
      uniquePath: props.uniquePath,
      expirationTime: '2h',
      creatorID: new UniqueEntityID(props.creatorID),
    })

    await this.webhookRepository.create(webhook)
  }
}