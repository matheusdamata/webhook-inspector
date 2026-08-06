import type { Optional } from "@/type/optional";
import { Entity } from "./entity";
import { UniqueEntityID } from "./unique-entity-id";
import type { WebhookEvent } from "./webhook-event";

export interface WebhookProps {
  uniquePath: string
  status: boolean
  expirationTime: string
  expiresIn: Date
  creatorID: UniqueEntityID
  createdAt: Date
  updatedAt?: Date

  // relations
  events: WebhookEvent[]
}

export class Webhook extends Entity<WebhookProps> {
  get uniquePath(): string {
    return this.props.uniquePath
  }

  get status(): boolean {
    return this.props.status
  }

  get expirationTime(): string {
    return this.props.expirationTime
  }

  get expiresIn(): Date {
    return this.props.expiresIn
  }

  get creatorID(): UniqueEntityID {
    return this.props.creatorID
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  get events(): WebhookEvent[] {
    return this.props.events
  }

  set status(status: boolean) {
    this.props.status = status
  }

  addEvent(event: WebhookEvent) {
    this.props.events.push(event)
  }

  hasSameCreatorID(creatorID: string): boolean {
    return this.creatorID.equals(new UniqueEntityID(creatorID))
  }

  static calculateExpiration(expirationTime: string, fullCreationDate?: Date): Date {
    const expirationTimeAsNumber = Number(expirationTime.replace('h', ''))
    const creationDate = fullCreationDate ?? new Date()

    return new Date(creationDate.setHours(creationDate.getHours() + expirationTimeAsNumber))
  }
  
  static create(props: Optional<WebhookProps, 'status' | 'events' | 'expiresIn' | 'createdAt'>, id?: UniqueEntityID) {
    return new Webhook({
      ...props,
      status: props.status ?? true,
      events: props.events ?? [],
      expiresIn: this.calculateExpiration(props.expirationTime),
      createdAt: props.createdAt ?? new Date(),
    }, id) 
  }
}