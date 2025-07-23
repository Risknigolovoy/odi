export class AssetGenerator {
    constructor() {
        this.textures = {};
    }

    generateAll() {
        this.textures.characterFrame1 = this.createCharacterTexture(false);
        this.textures.characterFrame2 = this.createCharacterTexture(true);
        this.textures.backgrounds = this.createBackgrounds();
        
        PIXI.Assets.add({ alias: 'characterWalk1', src: this.textures.characterFrame1 });
        PIXI.Assets.add({ alias: 'characterWalk2', src: this.textures.characterFrame2 });

        for (let i = 0; i < this.textures.backgrounds.length; i++) {
            PIXI.Assets.add({ alias: `bg${i}`, src: this.textures.backgrounds[i] });
        }
    }

    createCharacterTexture(isStep) {
        const g = new PIXI.Graphics();
        
        g.fill(0x3355FF).rect(2, 8, 12, 16);
        g.fill(0xFFDDC9).rect(4, 0, 8, 8);
        g.fill(0x442211).rect(4, 0, 8, 4);
        g.fill(0x222233);
        if (isStep) {
            g.rect(2, 24, 4, 10);
            g.rect(10, 24, 4, 8);
        } else {
            g.rect(2, 24, 4, 8);
            g.rect(10, 24, 4, 10);
        }

        return app.renderer.generateTexture(g);
    }

    createBackgrounds() {
        const backgrounds = [];
        const width = 800;
        const height = 450;

        const bg0 = new PIXI.Graphics().fill(0x2d2d3a).rect(0, 0, width, height).fill(0x5a4a3a).rect(0, height - 50, width, 50).fill(0x9acde3).rect(100, 50, 150, 150).fill(0x111111).rect(105, 55, 65, 140).fill(0x111111).rect(180, 55, 65, 140).fill(0x4a3a2a).rect(500, 200, 200, 200).fill(0xffffff).rect(520, 180, 50, 20);
        backgrounds.push(app.renderer.generateTexture(bg0));

        const bg1 = new PIXI.Graphics().fill(0x787c80).rect(0, 0, width, height).fill(0x3a3a4a).rect(0, height - 100, width, 100).fill(0x8a8a8a).rect(100, 100, 150, 250).fill(0x9a9a9a).rect(400, 50, 200, 300);
        backgrounds.push(app.renderer.generateTexture(bg1));

        const bg2 = new PIXI.Graphics().fill(0x6b7a8f).rect(0, 0, width, height).fill(0xc0c0c0).rect(0, 50, width, 10).fill(0x4a3a2a).rect(0, height - 60, width, 60).fill(0x223344).rect(100, 80, 600, 200).fill(0xffffff).rect(150, 300, 100, 50).fill(0xffffff).rect(550, 300, 100, 50);
        backgrounds.push(app.renderer.generateTexture(bg2));
        
        const bg3 = new PIXI.Graphics().fill(0xc0c0c0).rect(0, 0, width, height).fill(0x8a7a6a).rect(0, height - 80, width, 80).fill(0x555555).rect(0, 50, 20, height - 130).fill(0x555555).rect(width - 20, 50, 20, height - 130);
        backgrounds.push(app.renderer.generateTexture(bg3));
        
        const bg4 = new PIXI.Graphics().fill(0xffa07a).rect(0, 0, width, height);
        for(let i = 0; i < 50; i++) {
            bg4.fill(0xffffff, Math.random() * 0.5 + 0.5).circle(Math.random() * width, Math.random() * height * 0.7, Math.random() * 2 + 1);
        }
        backgrounds.push(app.renderer.generateTexture(bg4));
        
        return backgrounds;
    }
}
