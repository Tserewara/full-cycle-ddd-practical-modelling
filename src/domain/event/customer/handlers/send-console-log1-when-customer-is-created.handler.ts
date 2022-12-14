import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsole1LogWhenCustomerIsCreatedHandler
  implements EventHandlerInterface {
  handle (event: CustomerCreatedEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id},
     ${event.eventData.name} alterado para: ${event.eventData.endereco}`);
  }
}