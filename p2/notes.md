# Skeeto game notes

## App

### Data
- score Number
- difficulties[], objects containing names and values
- currentDifficulty: 'Hard'
- showNewGame: false
- showBeam: false

### Watch
- score, when score changes change showBeam to true, wait briefly, change back to false

### Lifecycle hooks
- mounted: change showNewGame

## Components

### Scoreboard
- Display current score ($root.score)
- Visual effect when points are added, removed?


### Start game dialog
- Difficulty controls: Hard, Harder, Hardest
- Parameters difficulty could affect:
  - Speed
  - Size
  - Simultaneous quantity

#### Methods
- hide, emit showNewGame: false

#### element attributes
- `v-for='difficulty in difficulties'` input radio buttons for each difficulty
- emit currentDifficulty when difficulty input changes
- `v-bind:class="{ newGameDialog: showNewGame }"`
- `@keyup.escape('hide')`
- `@click('hide')` on close button 

### Mosquito sprite
- Points for hitting based on difficulty (size, speed)
- Points lost for Mosquito reaching other side
- Maybe different images for different sizes
- Click hitbox is transparent, unrelated to image shape
- Randomly set height of start and end points
- Randomly vary speed of each instance (modified by difficulty)
- wrap in Vue <keep-alive> component?
- create only one instance per sprite that will be on screen simultaneously (maybe create max at game start then use as many as difficulty level says)

#### Data
- hitboxDiameter
- hitState: false
- heightStart
- heightEnd
- speed
- image
- pointsAdd (maybe computed property)
- pointsSubtract (maybe computed property)
- currentPosition

#### Methods
- hit: when clicked, change hitState, emit score increase to root method, briefly change to "death" image, and deactivate

#### Watchers
- currentPosition, when it crosses to other side, emit score decrease and deactivate

#### Lifecycle hooks
- activated: set data values

#### element attributes
- `@click('hit')`

### Wall
- Points lost for hitting wall

#### Methods
- miss: emit score decrease when clicked

#### element attributes
- `@click('miss')`

### Laser
- Transparent line from bottom center to last clicked position (or current position of cursor); initally centered on screen
- Visible barrel at bottom of line
- momentarily change from transparent to red laser beam

#### element attributes
- `v-bind:class="{ beam: showBeam }"`

### Hit marks (optional)
- place a hit mark at every clicked position that hit the wall
