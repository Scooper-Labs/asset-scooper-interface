import { CovalentClient } from "@covalenthq/client-sdk";

const COVALENT_API_KEY = process.env.COVALENT_API_KEY as string;

export const covalentClient = new CovalentClient(
  "cqt_rQMxBtyF7qMDrFXYq6jcrqXmxPyj"
);
