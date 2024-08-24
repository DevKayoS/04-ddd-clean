import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";

export class AnswerCreatedEvent implements DomainEvent {
  public public ocurredAt: Date;

  getAggregateId(): UniqueEntityId {
    
  }

  
}