export class BaseScene extends PIXI.Container {
    constructor() {
        super();
        this.alpha = 0;
    }

    fadeIn() {
        return new Promise((resolve) => {
            new TWEEN.Tween(this)
                .to({ alpha: 1 }, 1500)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onComplete(resolve)
                .start();
        });
    }

    fadeOut() {
        return new Promise((resolve) => {
            new TWEEN.Tween(this)
                .to({ alpha: 0 }, 1500)
                .easing(TWEEN.Easing.Quadratic.In)
                .onComplete(resolve)
                .start();
        });
    }
}
