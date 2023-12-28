export interface Production {
  name: string;
  time: number; // time to produce, in seconds
  price: number;
  producer: string;
  requirements?: string[];
}

export interface Producer {
  name: string;
  slots: number;
  sequential?: boolean;
}
