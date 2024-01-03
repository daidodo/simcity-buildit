# SimCity BuildIt Game Helper

<!--
First publish:

```sh
npm publish --access public
```

[![npm](https://img.shields.io/npm/v/PROJECT_NAME.svg)](https://www.npmjs.com/package/simcity-buildit)
![Downloads](https://img.shields.io/npm/dm/simcity-buildit.svg)

-->

[![Build Status](https://github.com/daidodo/simcity-buildit/actions/workflows/node.js.yml/badge.svg)](https://github.com/daidodo/simcity-buildit/actions)

Tools for the game.

# Usage

## List

```sh
$ node ./dist/bin/list -h
```

```log
  Usage: list [options] [command]

  Commands:
    help     Display help
    version  Display version

  Options:
    -c, --count <n>  # of products, must be positive (defaults to 1)
    -e, --earn <n>   Sort by earnings per n hours, must be positive (defaults to 4)
    -h, --help       Output usage information
    -p, --price      Sort by sale price
    -t, --time       Sort by production time
    -v, --version    Output the version number
```

### Example: List all products and sort by earnings in 4 hours.

```log
$ node ./dist/bin/list
Name                   Time      Price   §/4h
---
Burger                 9h29m45s  §3,620  §1,524.88
Garden Gnome           5h20m     §1,600  §1,200
Lemonade Bottle        5h51m     §1,690  §1,155.56
Green Smoothie         3h21m     §1,150  §1,150
Ice Cream Sandwich     8h11m54s  §2,256  §1,100.71
Fire Pit               6h32m     §1,740  §1,065.31
Pizza                  9h44m24s  §2,560  §1,051.33
Cherry Cheesecake      8h36m     §2,240  §1,041.86
Shoes                  4h        §980    §980
Bread Roll             7h48m     §1,840  §943.59
Donuts                 4h36m     §950    §826.09
Business Suit          5h48m     §1,170  §806.9
Fruit and Berries      2h57m     §730    §730
Frozen Yogurt          10h12m    §1,750  §686.27
Garden Furniture       4h48m     §820    §683.33
Couch                  10h36m    §1,810  §683.02
Cupboard               5h36m     §900    §642.86
Home Textile           4h        §610    §610
Cap                    3h48m     §600    §600
Flour Bag              3h24m     §570    §570
TV                     9h15m     §1,280  §553.51
Cheese Fries           7h41m     §1,050  §546.64
Popcorn                9h13m30s  §1,250  §542.01
BBQ Grill              3h13m     §530    §530
Table                  57m       §500    §500
Cement                 2h40m     §440    §440
Glue                   2h48m     §440    §440
Beef                   8h        §860    §430
Ladder                 1h39m     §420    §420
Tree Sapling           1h45m     §420    §420
Refrigerator           10h9m     §1,060  §417.73
Lighting System        8h34m     §890    §415.56
Lawn Mower             8h36m     §840    §390.7
Coffee                 7h48m     §750    §384.62
Watch                  6h12m     §580    §374.19
Cheese                 7h24m     §660    §356.76
Backpack               5h        §430    §344
Paint                  2h48m     §320    §320
Grass                  57m       §310    §310
Chair                  30m12s    §300    §300
Corn                   1h18m     §280    §280
Drill                  8h36m     §590    §274.42
Cream                  7h        §440    §251.43
Cooking Utensils       45m       §250    §250
Microwave Oven         8h48m     §480    §218.18
Bricks                 46m       §190    §190
Vegetables             36m       §160    §160
Shovel                 33m       §150    §150
Planks                 27m       §120    §120
Sugar and Spices       4h        §110    §110
Measuring Tape         25m       §110    §110
Glass                  5h        §120    §96
Animal Feed            6h        §140    §93.33
Electrical Components  7h        §160    §91.43
Textiles               3h        §90     §90
Hammer                 14m12s    §90     §90
Nails                  5m        §80     §80
Chemicals              2h        §60     §60
Minerals               30m       §40     §40
Seeds                  20m       §30     §30
Plastic                9m        §25     §25
Wood                   3m        §20     §20
Metal                  1m        §10     §10
```

## Plan

```sh
$ node ./dist/bin/plan -h
```

```log
  Usage: plan [options] [command] <Product Names>

  Commands:
    help     Display help
    version  Display version

  Options:
    -h, --help     Output usage information
    -v, --version  Output the version number
```

### Example: Show production steps for Burger🍔

```log
$ node ./dist/bin/plan burger
Time      Metal-5    Wood-2     Plastic-2  Seeds-4    Textiles-4  Animal Feed-4  Cooking Utensils  BBQ Grill          Flour Bag-2        Cream              Bread Roll    Beef               Burger
          (Factory)  (Factory)  (Factory)  (Factory)  (Factory)   (Factory)      (Hardware Store)  (Home Appliances)  (Farmer's Market)  (Farmer's Market)  (Donut Shop)  (Farmer's Market)  (Fast Food Restaurant)
---
0s        *          *          *          *          *           *
1m        ⊥          |          |          |          |           |
3m                   ⊥          |          |          |           |
9m                              ⊥          |          |           |              *
20m                                        ⊥          |           |              |
45m                                                   |           |              ⊥                 *
3h                                                    ⊥           |                                |                  *
3h13m                                                             |                                ⊥                  |
3h48m                                                             |                                                   ⊥
6h                                                                ⊥                                                                      *
7h                                                                                                                                       ⊥                  *             *
7h48m                                                                                                                                                       ⊥             |
9h                                                                                                                                                                        ⊥                  *
9h29m45s                                                                                                                                                                                     ⊥
```

# License

MIT © Zhao DAI <daidodo@gmail.com>
