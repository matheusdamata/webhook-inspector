import { UniqueEntityID } from "@/entities/unique-entity-id"
import { Webhook } from "@/entities/webhook"
import type { WebhookRepository } from "@/repositories/webhook-repository"

interface CreateWebhookRequest {
  uniquePath: string
  creatorID: string
}

export class CreateWebhookUseCase {
  constructor(private webhookRepository: WebhookRepository) {}

  async execute(props: CreateWebhookRequest): Promise<void> { 
    const invalidUserReferenceID = props.creatorID.length === 0 || props.creatorID === null || props.creatorID === undefined
    
    if (invalidUserReferenceID) throw new Error('It is necessary to forward the creatorID.')

    const isAnExistingWebhook = await this.webhookRepository.findByUniquePath(props.uniquePath)
    
    if (isAnExistingWebhook) throw new Error('A webhook with this unique path already exists.')

    const webhook = Webhook.create({
      uniquePath: props.uniquePath,
      expirationTime: '2h',
      creatorID: new UniqueEntityID(props.creatorID),
    })

    await this.webhookRepository.create(webhook)
  }
}