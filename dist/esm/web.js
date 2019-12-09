import { WebPlugin } from '@capacitor/core';
export class AudioPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: 'Audio',
            platforms: ['web']
        });
        this.current = null;
        this.currentIndex = 0;
    }
    playList(items) {
        this.audios = items.map((v, _) => {
            let audio = new Audio();
            audio.src = v.src;
            audio.load();
            return audio;
        });
        this.current = this.audios[0];
        this.currentIndex = 0;
        this.play();
    }
    triggerEvent(name) {
        var event; // The custom event that will be created
        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent(name, true, true);
            // event.eventName = name;
            window.dispatchEvent(event);
        }
    }
    play() {
        this.current.onended = (_) => {
            this.triggerEvent('playEnd');
            if (this.current === this.audios[this.audios.length - 1]) {
                this.triggerEvent('playAllEnd');
            }
            else {
                this.currentIndex += 1;
                this.current = this.audios[this.currentIndex];
                this.play();
            }
        };
        this.current.onpause = (_) => {
            this.triggerEvent('playPaused');
        };
        this.current.onplaying = (_) => {
            this.triggerEvent('playResumed');
        };
        this.current && this.current.play();
    }
    pausePlay() {
        this.current && this.current.pause();
    }
    resumePlay() {
        this.play();
    }
    setPlaying(info) {
        this.info = info;
        return new Promise(r => r());
    }
}
const AudioPlugin = new AudioPluginWeb();
export { AudioPlugin };
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AudioPlugin);
//# sourceMappingURL=web.js.map