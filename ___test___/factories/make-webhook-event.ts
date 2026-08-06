import { UniqueEntityID } from "@/entities/unique-entity-id";
import { WebhookEvent, type WebhookEventProps } from "@/entities/webhook-event";

export function makeWebhookEvent(override: Partial<WebhookEventProps>, id?: UniqueEntityID) {
  const event = WebhookEvent.create({
    webhookID: new UniqueEntityID(),
    fromIP: '1.1.1.1',
    headers: '{"host": "localhost:3333", "content-type": "application/json"}',
    queryParams: '/?user=matheusdamatag',
    body: '{"status": "payment.created"}',
    ...override
  }, id)

  return event
}