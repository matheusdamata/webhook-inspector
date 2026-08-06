import type { Webhook } from "@/entities/webhook";

export interface WebhookRepository {
  findByCreatorID(id: string): Promise<Webhook | null>
  findByUniquePath(uniquePath: string): Promise<Webhook | null> 
  findAll(creatorID: string): Promise<Webhook[]>
  save(webhook: Webhook): Promise<void>
  create(webhook: Webhook): Promise<void>
}