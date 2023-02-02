class Bar {
  time: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

class Strategy {
  position_size: string;
  order_action: string;
  order_contracts: string;
  order_price: string;
  order_id: string;
  comment: string;
  message: string;
  market_position: string;
  market_position_size: string;
  prev_market_position: string;
  prev_market_position_size: string;
}

export class TradingViewWebhook {
  passphrase: string;
  time: string;
  exchange: string;
  ticker: string;
  bar: Bar;
  strategy: Strategy;
}
