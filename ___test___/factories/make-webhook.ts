import { UniqueEntityID } from "@/entities/unique-entity-id";
import { Webhook, type WebhookProps } from "@/entities/webhook";

export function makeWebhook(override: Partial<WebhookProps> = {}, id?: UniqueEntityID): Webhook {
  const webhook = Webhook.create({
    creatorID: new UniqueEntityID(),
    uniquePath: 'my-webhook',
    status: true,
    expirationTime: '2h',
    createdAt: new Date(),
    events: [],
    ...override,
  }, id)

  return webhook
}