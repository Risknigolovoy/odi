import { StoryScene } from '../scenes/StoryScene.js';

export class SceneManager {
    constructor(app) {
        this.app = app;
        this.currentScene = null;
        this.sceneIndex = 0;

        this.scenes = [
            { bg: 'bg0', text: "Пора. Путь будет долгим...", duration: 4000 },
            { bg: 'bg1', text: "Холодные улицы Петербурга...", duration: 7000 },
            { bg: 'bg2', text: "Часы в поезде тянутся вечно.", duration: 8000 },
            { bg: 'bg3', text: "Москва. Почти на месте.", duration: 6000 },
            { bg: 'bg4', text: "Наконец-то...", final: true, duration: 10000 }
        ];
    }

    start() {
        this.nextScene();
    }

    async nextScene() {
        if (this.currentScene) {
            await this.currentScene.fadeOut();
            this.app.stage.removeChild(this.currentScene);
            this.currentScene.destroy();
        }

        if (this.sceneIndex >= this.scenes.length) {
            this.sceneIndex = 0; 
        }

        const sceneData = this.scenes[this.sceneIndex];
        this.currentScene = new StoryScene(sceneData);
        this.app.stage.addChild(this.currentScene);
        await this.currentScene.fadeIn();

        setTimeout(() => {
            this.sceneIndex++;
            this.nextScene();
        }, sceneData.duration);
    }
}
