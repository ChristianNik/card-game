https://www.cluemediator.com/draggable-rectangle-on-canvas-using-react
# Card Game

## Ideas

- Farming
  - Soil
  - Farm,...)
- Industry
  - Mine
  - Oil
  - Energy
  - Water
  - Microchips
  - ...
- Trading (
  - Markt
  - Coins
  - ...
- Exploration
  - Forest
  - Mointain
  - ...
- Fight
  - Enemies
  - Turrets
  -...
- Expansion
  - Map size increases
  - ...

## Card Categories

- Building
  - isConsumable: `false` (default)
- Ingredient
  - isConsumable: `true` (default)
  - Quantity
- Person
  - isConsumable: `false` (default)
  - Health
  - (Hunger)
- Animal
  - isConsumable: `true` (default)
  - Health
  - (Hunger)
- Enemy
  - isConsumable: `true` (default)
  - Health
- Plant
- Resource
  - isConsumable: `true` (default)
  - quantity

# Crafting

## Recepie

- duration
- ingredients
  - count
  - consumed
- outcome
- quantity

## Crafting Tree

```mermaid
graph TB;

    Tree  --> |1x| Wood
    Villager -.-> |1x| Wood
    
    House   --> |1x| Baby
    Villager    -.-> |2x| Baby


    Rock    --> |1x| Stone
    Wood & Stone    --> |1x| House


    Baby    --> |1x| Villager
    House   -.-> |1x| Villager
    Wood    --> |1x| Stick    
```

## Example

### Wood / Stick

```mermaid
graph TB;

    Tree        -->  |1x| a1(Produces)
    Villager    -.-> |1x| a1
    a1          -.-> |50%| Stick
    a1          --> Wood
    
```

```json
{
    "id": "tree",
    "category": "recource",
    "quantity": 5,
    "producible": [
        {
            // Ingredient
            "id": "wood",
            "probability": 1
        },
        {
            // Ingredient
            "id": "sticks",
            "probability": 0.5
        }
    ]
}
```

### House

```mermaid
graph TB;

    Wood        --> |2x| House
    Stone       --> |2x| House
    Villager    -.-> |1x| House

```

```json
{
    "id": "house",
    "quantity": 1,
    "duration": 30,
    "ingredients": [
        {
            // Ingredient
            "id": "wood",
            "count": 2,
            "isConsumable": true
        },
        {
            // Ingredient
            "id": "stone",
            "count": 2,
            "isConsumable": true
        },
        {
            // Person
            "id": "villager",
            "count": 1,
            "isConsumable": false
        }
    ]
}
```

```js
const persons = {
    villager: new GameObject({
        id: "villager",
        category: "person",
        args: {
            title: "Villager"
        },
        recipes: [
            [
                {
                    id: "baby",
                    count: 1,
                    isConsumable: true
                },
                {
                    id: "house",
                    count: 1,
                    isConsumable: false
                }
            ]
        ]
    })
};
```

### Berry

```mermaid
graph TB;

    Bush        --> |1x| a1(+)
    Villager    -.-> |1x| a1

    a1 --> |1x| Berry

```

```json
// TODO
```

### Berry Bush

```mermaid
graph TB;

    Soil        -.-> |1x| a1(+)
    Berry    --> |1x| a1

    a1 --> |1x| a2(Berry Bush)

```

```json
// TODO
```


### Baby

```mermaid
graph TB;

    Villager       -.-> |2x| Baby
    House          -.-> |1x| Baby

```

```json
// TODO
```

### Energy

```mermaid
graph TB;

    Coal       --> |1x| Energy
    a1(Coal Power Station)        -.-> |1x| Energy

```

```json
{
    "id": "energy",
    "quantity": 1,
    "duration": 30,
    "ingredients": [
        {
            // Ingredient
            "id": "coal",
            "count": 1,,
            "isConsumable": true
        },
        {
            // Building
            "id": "coal-power-station",
            "count": 1,
            "isConsumable": true
        }
    ]
}
```


## GameObject

```ts
class GameObject {
    id: string;
    category: string;
    args: any;
    recipes: any[];
    constructor(params: { id: string; category: string; args: any; recipes: any[] }) {
        this.id = params.id;
        this.category = params.category;
        this.args = params.args;
        this.recipes = params.recipes;
    }

    get isCraftable() {
        return this.recipes.length > 0;
    }
}
```
