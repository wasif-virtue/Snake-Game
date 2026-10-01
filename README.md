# Snake Game

A browser-based Snake game built with plain HTML, CSS, and JavaScript. The project is a small exercise in game loops, keyboard input, DOM updates, and browser storage.

## Features

- Start and restart screens
- Arrow-key movement on a grid
- Food collection and score tracking
- High score saved in `localStorage`
- Elapsed-time display

## Run locally

No build step or package installation is required. Clone the repository and open `index.html` in a modern browser.

```bash
git clone https://github.com/wasif-virtue/Snake-Game.git
cd Snake-Game
```

## Controls

Use the arrow keys to change direction. Select **Start Game** to begin and **Restart Game** after a round ends.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Game board, score panel, and start/end dialogs |
| `style.css` | Dark theme and grid presentation |
| `script.js` | Game state, rendering, input, scoring, and timer |

## Notes

The high score is stored in the current browser, so it is not shared across devices or browsers. This repository is a learning project and has no external dependencies.
