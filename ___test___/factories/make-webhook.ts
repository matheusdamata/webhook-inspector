import { UniqueEntityID } from "@/entities/unique-entity-id";
import { Webhook, type WebhookProps } from "@/entities/webhook";

export function makeWebhook(override: Partial<WebhookProps> = {}, id?: UniqueEntityID): Webhook {
  const webhook = Webhook.create({
    userReferenceID: new UniqueEntityID(),
    uniquePath: 'my-webhook',
    status: true,
    expirationAt: '2h',
    ...override,
  }, id)

  return webhook
}