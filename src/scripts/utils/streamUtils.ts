import { ObjectMultiplex } from "@theqrl/zond-wallet-provider/object-multiplex";
import PortStream from "extension-port-stream";
import { pipeline } from "readable-stream";
import { EXTENSION_MESSAGES } from "../constants/streamConstants";

// Sets up stream multiplexing for the given stream
export function setupMultiplex(connectionStream: PortStream) {
  const mux = new ObjectMultiplex();
  /**
   * We are using this streams to send keep alive message between backend/ui without setting up a multiplexer
   * We need to tell the multiplexer to ignore them, else we get the "orphaned data for stream" warnings
   */
  mux.ignoreStream(EXTENSION_MESSAGES.CONNECTION_READY);
  pipeline(connectionStream, mux, connectionStream, (err) => {
    if (err && !err.message?.match("Premature close")) {
      console.error(err);
    }
  });
  return mux;
}
