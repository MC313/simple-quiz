export interface Quote {
  created: Date;
  _id: string;
  quoteId: string;
  realQuote: boolean;
  source: string;
  tags: string[];
  text: string;
}
