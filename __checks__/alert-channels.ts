import { EmailAlertChannel } from "checkly/constructs";

// Create and export an email channel for notifications when tests fail 

export const emailChannel = new EmailAlertChannel("email-channel-1", {
  address: "<YOUR EMAIL ADDRESS HERE>",
});