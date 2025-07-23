// src/main.js

import { SceneManager } from './managers/SceneManager.js';
import { AudioManager } from './managers/AudioManager.js';
import { AssetGenerator } from './managers/AssetGenerator.js';

class Game {
    constructor() {
        this.app = new PIXI.Application();
        this.audioManager = new AudioManager();
        // AssetGenerator теперь создается без app, т.к. app еще не инициализирован
        this.assetGenerator = null;
    }

    async init() {
        // Инициализируем приложение
        await this.app.init({
            width: 800,
            height: 450,
            backgroundColor: 0x000000,
            antialias: false,
        });

        // Настраиваем и добавляем холст на страницу
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        document.getElementById('app-container').appendChild(this.app.canvas);

        // **КЛЮЧЕВЫЕ ИЗМЕНЕНИЯ**
        // 1. Создаем AssetGenerator, передав ему готовое приложение
        this.assetGenerator = new AssetGenerator(this.app);
        
        // 2. Генерируем ассеты (без загрузки)
        this.assetGenerator.generateAll();

        // 3. ЖДЕМ, пока все ассеты будут реально загружены
        await this.assetGenerator.loadAssets();

        // 4. Только теперь, когда все готово, запускаем сцены
        this.sceneManager = new SceneManager(this.app);
        this.sceneManager.start();
        
        // Добавляем TWEEN в главный цикл обновления
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
