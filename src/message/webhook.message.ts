import { Position } from '../constant/position.constant';

export const WEBHOOK_RECEIVED = (
  position: Position | Error,
  amount: string,
): string => {
  return `webhook received. ${position} for ${amount}`;
};
