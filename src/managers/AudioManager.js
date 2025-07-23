export class AudioManager {
    constructor() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.isPlaying = false;
    }

    startMusic() {
        if (this.isPlaying) return;
        this.isPlaying = true;

        const masterGain = this.audioCtx.createGain();
        masterGain.gain.value = 0.1;
        masterGain.connect(this.audioCtx.destination);

        const notes = [261, 293, 329, 349, 392, 440, 493];
        let noteIndex = 0;
        const tempo = 150;

        const playNote = () => {
            if (!this.isPlaying) return;

            const osc = this.audioCtx.createOscillator();
            const noteGain = this.audioCtx.createGain();

            osc.type = 'sine';
            const freq = notes[noteIndex % notes.length] * (Math.floor(noteIndex / notes.length) % 2 === 0 ? 0.5 : 1);
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

            noteGain.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
            noteGain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + (tempo / 1000));

            osc.connect(noteGain);
            noteGain.connect(masterGain);

            osc.start();
            osc.stop(this.audioCtx.currentTime + (tempo / 1000));

            noteIndex = (noteIndex + (Math.random() > 0.8 ? 2 : 1)) % (notes.length * 2);

            setTimeout(playNote, tempo + Math.random() * 50);
        };

        playNote();
    }

    playStepSound() {
        if (!this.isPlaying) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, this.audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.1);
    }

    playMeetSound() {
        if (!this.isPlaying) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523, this.audioCtx.currentTime);
        gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.5);
    }
}
