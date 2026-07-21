import { Entity } from "./entity";
import type { UniqueEntityID } from "./unique-entity-id";

interface WebhookEventProps {
  caller: string 
  body?: string 
  queryParams?: string
}

export class WebhookEvent extends Entity<WebhookEventProps> {
  get caller(): string {
    return this.props.caller
  }

  get body(): string | undefined {
    return this.props.body
  }

  get queryParams(): string | undefined {
    return this.props.queryParams
  }
  
  static create(props: WebhookEventProps, id?: UniqueEntityID) {
    return new WebhookEvent(props, id)
  }
}