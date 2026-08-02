import type { Optional } from "@/type/optional";
import { Entity } from "./entity";
import type { UniqueEntityID } from "./unique-entity-id";

interface WebhookEventProps {
  caller: string 
  body?: string 
  queryParams?: string
  createdAt: Date
  updatedAt?: Date
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

  set body(payload: string) {
    this.props.body = payload
  }

  set queryParams(query: string) {
    this.props.queryParams = query
  }

  static convertObjectToString(object: Record<string, string>): string {
    return JSON.stringify(object)
  }

  static convertStringToObject(payload: string): Record<string, string> {
    return JSON.parse(payload)
  }
  
  static create(props: Optional<WebhookEventProps, 'createdAt'>, id?: UniqueEntityID) {
    return new WebhookEvent({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id)
  }
}