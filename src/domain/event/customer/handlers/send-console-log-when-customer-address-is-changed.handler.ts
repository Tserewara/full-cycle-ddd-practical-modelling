import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed";

export default class SendConsoleLogWhenCustomerAddresIsChangedHandler
  implements EventHandlerInterface {
  handle (event: CustomerAddressChangedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}