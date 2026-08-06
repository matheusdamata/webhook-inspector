import type { Optional } from "@/type/optional";
import { Entity } from "./entity";
import type { UniqueEntityID } from "./unique-entity-id";

export interface WebhookEventProps {
  webhookID: UniqueEntityID
  fromIP: string 
  headers: string
  body?: string 
  queryParams?: string
  createdAt: Date
  updatedAt?: Date
}

export class WebhookEvent extends Entity<WebhookEventProps> {
  get webhookID(): UniqueEntityID {
    return this.props.webhookID
  }

  get fromIP(): string {
    return this.props.fromIP
  }

  get headers(): string {
    return this.props.headers
  }

  get body(): string | undefined {
    return this.props.body
  }

  get queryParams(): string | undefined {
    return this.props.queryParams
  }

  set headers(headers: string) {
    this.props.headers = headers
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