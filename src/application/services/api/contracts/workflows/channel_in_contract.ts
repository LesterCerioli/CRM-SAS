
import { Channel, ConsumeMessage, Options, Replies } from "amqplib";

export interface ChannelInterface {
    queueDeclare(
      name: string,
      options?: Options.AssertQueue
    ): Promise<Replies.AssertQueue>;
  
    consume(
      queue: string,
      consumer: (msg: ConsumeMessage | null) => void,
      options?: Options.Consume
    ): Promise<Replies.Consume>;
  }