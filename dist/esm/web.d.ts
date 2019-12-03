import { WebPlugin } from '@capacitor/core';
import { AudioPluginPlugin } from './definitions';
export declare class AudioPluginWeb extends WebPlugin implements AudioPluginPlugin {
    constructor();
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
}
declare const AudioPlugin: AudioPluginWeb;
export { AudioPlugin };
