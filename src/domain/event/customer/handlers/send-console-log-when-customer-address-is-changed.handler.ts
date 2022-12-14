import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed";

export default class SendConsoleLogWhenCustomerAddresIsChangedHandler
  implements EventHandlerInterface {
  handle (event: CustomerAddressChangedEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id},
     ${event.eventData.name} alterado para: ${event.eventData.address}`);
  }
}