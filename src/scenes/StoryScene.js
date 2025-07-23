import { BaseScene } from './BaseScene.js';
import { AudioManager } from '../managers/AudioManager.js';

export class StoryScene extends BaseScene {
    constructor({ bg, text, final = false }) {
        super();
        this.audioManager = new AudioManager();

        const background = PIXI.Sprite.from(bg);
        background.width = 800;
        background.height = 450;
        this.addChild(background);

        if (!final) {
            this.createCharacter();
        } else {
            this.createFinalScene();
        }

        this.createText(text);
    }

    createCharacter() {
        const walkTextures = [
            PIXI.Assets.get('characterWalk1'),
            PIXI.Assets.get('characterWalk2')
        ];
        this.character = new PIXI.AnimatedSprite(walkTextures);
        this.character.animationSpeed = 0.05;
        this.character.scale.set(3);
        this.character.y = 450 - this.character.height - 40;
        this.character.x = -100;
        this.character.play();
        this.addChild(this.character);

        new TWEEN.Tween(this.character.position)
            .to({ x: 850 }, 7000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                if(Math.random() < 0.1) this.audioManager.playStepSound();
            })
            .start();
    }

    createFinalScene() {
        this.audioManager.playMeetSound();
        const heart = new PIXI.Graphics()
            .fill(0xff0000)
            .moveTo(0, -15)
            .bezierCurveTo(0, -25, -30, -25, -30, -15)
            .bezierCurveTo(-30, 0, 0, 0, 0, -15)
            .moveTo(0, -15)
            .bezierCurveTo(0, -25, 30, -25, 30, -15)
            .bezierCurveTo(30, 0, 0, 0, 0, -15);

        heart.x = 400;
        heart.y = 225;
        heart.scale.set(0);
        this.addChild(heart);

        new TWEEN.Tween(heart.scale)
            .to({ x: 4, y: 4 }, 2000)
            .easing(TWEEN.Easing.Elastic.Out)
            .delay(1000)
            .start();
    }

    createText(text) {
        const style = new PIXI.TextStyle({
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: 22,
            fill: 'white',
            stroke: { color: 'black', width: 4 },
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 700,
        });

        const storyText = new PIXI.Text({ text, style });
        storyText.x = 400;
        storyText.y = 50;
        storyText.anchor.set(0.5);
        this.addChild(storyText);
    }
}
