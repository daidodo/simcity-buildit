export interface ProductionData {
  name: string;
  time: number; // time to produce, in seconds
  price: number;
  producer: string;
  requirements?: string[];
}

export interface ProducerData {
  name: string;
  slots: number;
  sequential?: boolean;
}
