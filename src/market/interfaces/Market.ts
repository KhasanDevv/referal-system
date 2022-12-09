export interface Market {
  id: number;
  name: string;
  levels: MarketLevels[];
}

export interface MarketLevels {
  id: number;
  market: Market;
  level: number;
  percentage: number;
}

interface LevelResponse {
  level: number;
  percentage: number;
}

export class CreateMarketLevel {
  percentage: number;
}

export interface CreateMarket {
  name: string;
  levels: CreateMarketLevel[];
}

export class MarketResponse {
  id: number;
  name: string;
  levels: LevelResponse[];
}
