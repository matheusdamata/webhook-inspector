import { Entity } from "./entity";
import type { UniqueEntityID } from "./unique-entity-id";

export interface WebhookProps {
  uniquePath: string
  status: boolean
  expirationAt: string
  userReferenceID: UniqueEntityID
}

export class Webhook extends Entity<WebhookProps> {
  get uniquePath(): string {
    return this.props.uniquePath
  }

  get status(): boolean {
    return this.props.status
  }

  get userReferenceID(): UniqueEntityID {
    return this.props.userReferenceID
  }
  
  static create(props: WebhookProps, id?: UniqueEntityID) {
    return new Webhook(props, id) 
  }
}