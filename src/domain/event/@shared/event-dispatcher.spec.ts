import CustomerCreatedEvent from "../customer/customer-created.event";
import SendConsole1LogWhenCustomerIsCreatedHandler from "../customer/handlers/send-console-log1-when-customer-is-created.handler";
import EnviaConsoleLog1Handler from "../customer/handlers/send-console-log1-when-customer-is-created.handler";
import SendConsole2LogWhenCustomerIsCreatedHandler from "../customer/handlers/send-console-log2-when-customer-is-created.handler";
import EnviaConsoleLog2Handler from "../customer/handlers/send-console-log2-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBe(eventHandler);
  })

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBe(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);


  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBe(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  })

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle")

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBe(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0
    });

    // Quando o notify for executado
    // o SendMailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent)

    expect(spyEventHandler).toHaveBeenCalled();
  })

  it("should notify when customer is created", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new SendConsole1LogWhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsole2LogWhenCustomerIsCreatedHandler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0])
      .toBe(eventHandler1);

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1])
      .toBe(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "John Doe",
      address: "Some random address, n 8",
    });

    eventDispatcher.notify(customerCreatedEvent)

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  })
})