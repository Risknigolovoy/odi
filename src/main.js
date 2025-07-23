import { SceneManager } from './managers/SceneManager.js';
import { AudioManager } from './managers/AudioManager.js';
import { AssetGenerator } from './managers/AssetGenerator.js';

class Game {
    constructor() {
        this.app = new PIXI.Application();
        this.audioManager = new AudioManager();
        this.assetGenerator = new AssetGenerator();
    }

    async init() {
        await this.app.init({
            width: 800,
            height: 450,
            backgroundColor: 0x000000,
            antialias: false,
        });

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        document.getElementById('app-container').appendChild(this.app.canvas);

        this.assetGenerator = new AssetGenerator(this.app);

        this.sceneManager = new SceneManager(this.app);
        this.sceneManager.start();
        
        this.app.ticker.add(() => {
            TWEEN.update();
        });
    }

    startAudio() {
        this.audioManager.startMusic();
    }
}

const game = new Game();
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', async () => {
    startButton.style.display = 'none';
    await game.init();
    game.startAudio();
}, { once: true });
