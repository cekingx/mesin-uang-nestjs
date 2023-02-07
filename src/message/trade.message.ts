export const TRADE_EXECUTED = (id: string): string => {
  return `trade executed with id: ${id}`;
};

export const TRADE_ERROR = (errorCode: number, errorMsg: string): string => {
  return `trade not executed. error: ${errorCode} - ${errorMsg}`;
};
