import { WebPlugin } from '@capacitor/core';
import { AudioPluginPlugin } from './definitions';

export class AudioPluginWeb extends WebPlugin implements AudioPluginPlugin {
  constructor() {
    super({
      name: 'Audio',
      platforms: ['web']
    });
  }

  current: any = null
  currentIndex = 0
  audios: any[]
  info: object
  playList(items: object[]) {
      this.audios = items.map((v: {src: string}, _) => {
          let audio = new Audio()
          audio.src = v.src
          audio.load()
          return audio
      })
      this.current = this.audios[0]
      this.currentIndex = 0
      this.play()
  }
  triggerEvent(name: string) {
      var event; // The custom event that will be created
      if(document.createEvent){
          event = document.createEvent("HTMLEvents");
          event.initEvent(name, true, true);
          // event.eventName = name;
          window.dispatchEvent(event);
      }
  }
  play() {
      this.current.onended = (_: void) => {
          this.triggerEvent('playEnd')
          if (this.current === this.audios[this.audios.length - 1]) {
              this.triggerEvent('playAllEnd')
          } else {
              this.currentIndex += 1
              this.current = this.audios[this.currentIndex]
              this.play()
          }
      }
      this.current.onpause = (_: void) => {
          this.triggerEvent('playPaused')
      }
      this.current.onplaying = (_: void) => {
          this.triggerEvent('playResumed')
      }
      this.current && this.current.play()
  }
  pausePlay() {
      this.current && this.current.pause()
  }
  resumePlay() {
      this.play()
  }
  setPlaying(info: object) {
      this.info = info
      return new Promise(r => r() )
  }
}

const AudioPlugin = new AudioPluginWeb();

export { AudioPlugin };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AudioPlugin);
