export interface ProductionData {
  name: string;
  time: number; // time to produce, in seconds
  price: number;
  producer: string;
  requirements?: { name: string; count: number }[];
}

export interface ProducerData {
  name: string;
  slots: number;
  sequential?: boolean;
}
