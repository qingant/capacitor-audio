import { WebPlugin } from '@capacitor/core';
import { AudioPluginPlugin } from './definitions';
export declare class AudioPluginWeb extends WebPlugin implements AudioPluginPlugin {
    constructor();
    current: any;
    currentIndex: number;
    audios: any[];
    info: object;
    playList(items: object[]): void;
    triggerEvent(name: string): void;
    play(): void;
    pausePlay(): void;
    resumePlay(): void;
    setPlaying(info: object): Promise<unknown>;
}
declare const AudioPlugin: AudioPluginWeb;
export { AudioPlugin };
