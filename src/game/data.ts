import { t } from './time';
import {
  ProducerData,
  ProductionData,
} from './types';

const ALL_PRODUCERES: ProducerData[] = [
  { name: 'Factory', slots: 55 },
  { name: 'Building Supplies Store', slots: 11, sequential: true },
  { name: 'Hardware Store', slots: 11, sequential: true },
  { name: "Farmer's Market", slots: 11, sequential: true },
  { name: 'Furniture Store', slots: 10, sequential: true },
  { name: 'Gardening Supplies', slots: 10, sequential: true },
  { name: 'Donut Shop', slots: 7, sequential: true },
  { name: 'Fashion Store', slots: 11, sequential: true },
  { name: 'Fast Food Restaurant', slots: 9, sequential: true },
  { name: 'Home Appliances', slots: 11, sequential: true },
];

const ALL_PRODUCTIONS: ProductionData[] = [
  // Factory
  {
    name: 'Metal',
    time: t('1m'),
    price: 10,
    producer: 'Factory',
  },
  {
    name: 'Wood',
    time: t('3m'),
    price: 20,
    producer: 'Factory',
  },
  {
    name: 'Plastic',
    time: t('9m'),
    price: 25,
    producer: 'Factory',
  },
  {
    name: 'Seeds',
    time: t('20m'),
    price: 30,
    producer: 'Factory',
  },
  {
    name: 'Minerals',
    time: t('30m'),
    price: 40,
    producer: 'Factory',
  },
  {
    name: 'Chemicals',
    time: t('2h'),
    price: 60,
    producer: 'Factory',
  },
  {
    name: 'Textiles',
    time: t('3h'),
    price: 90,
    producer: 'Factory',
  },
  {
    name: 'Sugar and Spices',
    time: t('4h'),
    price: 110,
    producer: 'Factory',
  },
  {
    name: 'Glass',
    time: t('5h'),
    price: 120,
    producer: 'Factory',
  },
  {
    name: 'Animal Feed',
    time: t('6h'),
    price: 140,
    producer: 'Factory',
  },
  {
    name: 'Electrical Components',
    time: t('7h'),
    price: 160,
    producer: 'Factory',
  },
  // Building Supplies Store
  {
    name: 'Nails',
    time: t('4m'),
    price: 80,
    producer: 'Building Supplies Store',
    requirements: [{ name: 'Metal', count: 2 }],
  },
  {
    name: 'Planks',
    time: t('24m'),
    price: 120,
    producer: 'Building Supplies Store',
    requirements: [{ name: 'Wood', count: 2 }],
  },
  {
    name: 'Bricks',
    time: t('16m'),
    price: 190,
    producer: 'Building Supplies Store',
    requirements: [{ name: 'Minerals', count: 2 }],
  },
  {
    name: 'Cement',
    time: t('40m'),
    price: 440,
    producer: 'Building Supplies Store',
    requirements: [
      { name: 'Minerals', count: 2 },
      { name: 'Chemicals', count: 1 },
    ],
  },
  {
    name: 'Glue',
    time: t('48m'),
    price: 440,
    producer: 'Building Supplies Store',
    requirements: [
      { name: 'Plastic', count: 1 },
      { name: 'Chemicals', count: 2 },
    ],
  },
  {
    name: 'Paint',
    time: t('48m'),
    price: 320,
    producer: 'Building Supplies Store',
    requirements: [
      { name: 'Metal', count: 1 },
      { name: 'Minerals', count: 1 },
      { name: 'Chemicals', count: 2 },
    ],
  },
  // Hardware Store
  {
    name: 'Hammer',
    time: t('11m12s'),
    price: 90,
    producer: 'Hardware Store',
    requirements: [
      { name: 'Metal', count: 1 },
      { name: 'Wood', count: 1 },
    ],
  },
  {
    name: 'Measuring Tape',
    time: t('16m'),
    price: 110,
    producer: 'Hardware Store',
    requirements: [
      { name: 'Metal', count: 1 },
      { name: 'Plastic', count: 1 },
    ],
  },
  {
    name: 'Shovel',
    time: t('24m'),
    price: 150,
    producer: 'Hardware Store',
    requirements: [
      { name: 'Metal', count: 1 },
      { name: 'Plastic', count: 1 },
      { name: 'Wood', count: 1 },
    ],
  },
  {
    name: 'Cooking Utensils',
    time: t('36m'),
    price: 250,
    producer: 'Hardware Store',
    requirements: [
      { name: 'Metal', count: 2 },
      { name: 'Plastic', count: 2 },
      { name: 'Wood', count: 2 },
    ],
  },
  {
    name: 'Ladder',
    time: t('48m'),
    price: 420,
    producer: 'Hardware Store',
    requirements: [
      { name: 'Metal', count: 2 },
      { name: 'Planks', count: 2 },
    ],
  },
  {
    name: 'Drill',
    time: t('1h36m'),
    price: 590,
    producer: 'Hardware Store',
    requirements: [
      { name: 'Metal', count: 2 },
      { name: 'Plastic', count: 2 },
      { name: 'Electrical Components', count: 1 },
    ],
  },
  // Farmer's Market
  {
    name: 'Vegetables',
    time: t('16m'),
    price: 160,
    producer: "Farmer's Market",
    requirements: [{ name: 'Seeds', count: 2 }],
  },
  {
    name: 'Flour Bag',
    time: t('24m'),
    price: 570,
    producer: "Farmer's Market",
    requirements: [
      { name: 'Seeds', count: 2 },
      { name: 'Textiles', count: 2 },
    ],
  },
  {
    name: 'Fruit and Berries',
    time: t('1h12m'),
    price: 730,
    producer: "Farmer's Market",
    requirements: [
      { name: 'Seeds', count: 2 },
      { name: 'Tree Sapling', count: 1 },
    ],
  },
  {
    name: 'Cream',
    time: t('1h'),
    price: 440,
    producer: "Farmer's Market",
    requirements: [{ name: 'Animal Feed', count: 1 }],
  },
  {
    name: 'Corn',
    time: t('48m'),
    price: 280,
    producer: "Farmer's Market",
    requirements: [
      { name: 'Minerals', count: 1 },
      { name: 'Seeds', count: 4 },
    ],
  },
  {
    name: 'Cheese',
    time: t('1h24m'),
    price: 660,
    producer: "Farmer's Market",
    requirements: [{ name: 'Animal Feed', count: 2 }],
  },
  {
    name: 'Beef',
    time: t('2h'),
    price: 860,
    producer: "Farmer's Market",
    requirements: [{ name: 'Animal Feed', count: 3 }],
  },
  // Furniture Store
  {
    name: 'Chair',
    time: t('16m'),
    price: 300,
    producer: 'Furniture Store',
    requirements: [
      { name: 'Wood', count: 2 },
      { name: 'Hammer', count: 1 },
      { name: 'Nails', count: 1 },
    ],
  },
  {
    name: 'Table',
    time: t('24m'),
    price: 500,
    producer: 'Furniture Store',
    requirements: [
      { name: 'Nails', count: 2 },
      { name: 'Planks', count: 1 },
      { name: 'Hammer', count: 1 },
    ],
  },
  {
    name: 'Home Textile',
    time: t('1h'),
    price: 610,
    producer: 'Furniture Store',
    requirements: [
      { name: 'Textiles', count: 2 },
      { name: 'Measuring Tape', count: 1 },
    ],
  },
  {
    name: 'Cupboard',
    time: t('36m'),
    price: 900,
    producer: 'Furniture Store',
    requirements: [
      { name: 'Glass', count: 2 },
      { name: 'Planks', count: 2 },
      { name: 'Paint', count: 1 },
    ],
  },
  {
    name: 'Couch',
    time: t('2h'),
    price: 1810,
    producer: 'Furniture Store',
    requirements: [
      { name: 'Textiles', count: 3 },
      { name: 'Glue', count: 1 },
      { name: 'Drill', count: 1 },
    ],
  },
  // Gardening Supplies
  {
    name: 'Grass',
    time: t('24m'),
    price: 310,
    producer: 'Gardening Supplies',
    requirements: [
      { name: 'Shovel', count: 1 },
      { name: 'Seeds', count: 1 },
    ],
  },
  {
    name: 'Tree Sapling',
    time: t('1h12m'),
    price: 420,
    producer: 'Gardening Supplies',
    requirements: [
      { name: 'Shovel', count: 1 },
      { name: 'Seeds', count: 2 },
    ],
  },
  {
    name: 'Garden Furniture',
    time: t('1h48m'),
    price: 820,
    producer: 'Gardening Supplies',
    requirements: [
      { name: 'Plastic', count: 2 },
      { name: 'Textiles', count: 2 },
      { name: 'Planks', count: 2 },
    ],
  },
  {
    name: 'Lawn Mower',
    time: t('1h36m'),
    price: 840,
    producer: 'Gardening Supplies',
    requirements: [
      { name: 'Metal', count: 3 },
      { name: 'Electrical Components', count: 1 },
      { name: 'Paint', count: 1 },
    ],
  },
  {
    name: 'Fire Pit',
    time: t('3h12m'),
    price: 1740,
    producer: 'Gardening Supplies',
    requirements: [
      { name: 'Bricks', count: 2 },
      { name: 'Cement', count: 2 },
      { name: 'Shovel', count: 1 },
    ],
  },
  {
    name: 'Garden Gnome',
    time: t('1h12m'),
    price: 1600,
    producer: 'Gardening Supplies',
    requirements: [
      { name: 'Cement', count: 2 },
      { name: 'Glue', count: 1 },
    ],
  },
  // Donut Shop
  {
    name: 'Donuts',
    time: t('36m'),
    price: 950,
    producer: 'Donut Shop',
    requirements: [
      { name: 'Flour Bag', count: 1 },
      { name: 'Sugar and Spices', count: 1 },
    ],
  },
  {
    name: 'Green Smoothie',
    time: t('24m'),
    price: 1150,
    producer: 'Donut Shop',
    requirements: [
      { name: 'Fruit and Berries', count: 1 },
      { name: 'Vegetables', count: 1 },
    ],
  },
  {
    name: 'Bread Roll',
    time: t('48m'),
    price: 1840,
    producer: 'Donut Shop',
    requirements: [
      { name: 'Flour Bag', count: 2 },
      { name: 'Cream', count: 1 },
    ],
  },
  {
    name: 'Cherry Cheesecake',
    time: t('1h12m'),
    price: 2240,
    producer: 'Donut Shop',
    requirements: [
      { name: 'Flour Bag', count: 1 },
      { name: 'Fruit and Berries', count: 1 },
      { name: 'Cheese', count: 1 },
    ],
  },
  {
    name: 'Frozen Yogurt',
    time: t('3h12m'),
    price: 1750,
    producer: 'Donut Shop',
    requirements: [
      { name: 'Fruit and Berries', count: 1 },
      { name: 'Sugar and Spices', count: 1 },
      { name: 'Cream', count: 1 },
    ],
  },
  {
    name: 'Coffee',
    time: t('48m'),
    price: 750,
    producer: 'Donut Shop',
    requirements: [
      { name: 'Sugar and Spices', count: 1 },
      { name: 'Cream', count: 1 },
      { name: 'Seeds', count: 2 },
    ],
  },
  // Fashion Store
  {
    name: 'Cap',
    time: t('48m'),
    price: 600,
    producer: 'Fashion Store',
    requirements: [
      { name: 'Textiles', count: 2 },
      { name: 'Measuring Tape', count: 1 },
    ],
  },
  {
    name: 'Shoes',
    time: t('1h'),
    price: 980,
    producer: 'Fashion Store',
    requirements: [
      { name: 'Plastic', count: 1 },
      { name: 'Textiles', count: 2 },
      { name: 'Glue', count: 1 },
    ],
  },
  {
    name: 'Watch',
    time: t('1h12m'),
    price: 580,
    producer: 'Fashion Store',
    requirements: [
      { name: 'Plastic', count: 2 },
      { name: 'Chemicals', count: 1 },
      { name: 'Glass', count: 1 },
    ],
  },
  {
    name: 'Business Suit',
    time: t('2h48m'),
    price: 1170,
    producer: 'Fashion Store',
    requirements: [
      { name: 'Textiles', count: 3 },
      { name: 'Glue', count: 1 },
      { name: 'Measuring Tape', count: 1 },
    ],
  },
  {
    name: 'Backpack',
    time: t('2h'),
    price: 430,
    producer: 'Fashion Store',
    requirements: [
      { name: 'Plastic', count: 2 },
      { name: 'Textiles', count: 2 },
      { name: 'Measuring Tape', count: 1 },
    ],
  },
  // Fast Food Restaurant
  {
    name: 'Ice Cream Sandwich',
    time: t('11m54s'),
    price: 2256,
    producer: 'Fast Food Restaurant',
    requirements: [
      { name: 'Cream', count: 1 },
      { name: 'Bread Roll', count: 1 },
    ],
  },
  {
    name: 'Pizza',
    time: t('20m24s'),
    price: 2560,
    producer: 'Fast Food Restaurant',
    requirements: [
      { name: 'Flour Bag', count: 1 },
      { name: 'Cheese', count: 1 },
      { name: 'Beef', count: 1 },
    ],
  },
  {
    name: 'Burger',
    time: t('29m45s'),
    price: 3620,
    producer: 'Fast Food Restaurant',
    requirements: [
      { name: 'Beef', count: 1 },
      { name: 'Bread Roll', count: 1 },
      { name: 'BBQ Grill', count: 1 },
    ],
  },
  {
    name: 'Cheese Fries',
    time: t('17m'),
    price: 1050,
    producer: 'Fast Food Restaurant',
    requirements: [
      { name: 'Cheese', count: 1 },
      { name: 'Vegetables', count: 1 },
    ],
  },
  {
    name: 'Lemonade Bottle',
    time: t('51m'),
    price: 1690,
    producer: 'Fast Food Restaurant',
    requirements: [
      { name: 'Glass', count: 2 },
      { name: 'Sugar and Spices', count: 2 },
      { name: 'Fruit and Berries', count: 1 },
    ],
  },
  {
    name: 'Popcorn',
    time: t('25m30s'),
    price: 1250,
    producer: 'Fast Food Restaurant',
    requirements: [
      { name: 'Microwave Oven', count: 1 },
      { name: 'Corn', count: 2 },
    ],
  },
  // Home Appliances
  {
    name: 'BBQ Grill',
    time: t('2h28m'),
    price: 530,
    producer: 'Home Appliances',
    requirements: [
      { name: 'Metal', count: 3 },
      { name: 'Cooking Utensils', count: 1 },
    ],
  },
  {
    name: 'Refrigerator',
    time: t('3h9m'),
    price: 1060,
    producer: 'Home Appliances',
    requirements: [
      { name: 'Plastic', count: 2 },
      { name: 'Chemicals', count: 2 },
      { name: 'Electrical Components', count: 2 },
    ],
  },
  {
    name: 'Lighting System',
    time: t('1h34m'),
    price: 890,
    producer: 'Home Appliances',
    requirements: [
      { name: 'Chemicals', count: 1 },
      { name: 'Glass', count: 1 },
      { name: 'Electrical Components', count: 1 },
    ],
  },
  {
    name: 'TV',
    time: t('2h15m'),
    price: 1280,
    producer: 'Home Appliances',
    requirements: [
      { name: 'Plastic', count: 2 },
      { name: 'Glass', count: 2 },
      { name: 'Electrical Components', count: 2 },
    ],
  },
  {
    name: 'Microwave Oven',
    time: t('1h48m'),
    price: 480,
    producer: 'Home Appliances',
    requirements: [
      { name: 'Metal', count: 4 },
      { name: 'Glass', count: 1 },
      { name: 'Electrical Components', count: 1 },
    ],
  },
];

export { ALL_PRODUCERES, ALL_PRODUCTIONS };
