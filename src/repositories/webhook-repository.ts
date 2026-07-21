import type { Webhook } from "@/entities/webhook";

export interface WebhookRepository {
  findByUniquePath(uniquePath: string): Promise<Webhook | null> 
  findAll(userReferenceId: string): Promise<Webhook[]>
  save(webhook: Webhook): Promise<void>
}