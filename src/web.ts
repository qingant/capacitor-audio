import { WebPlugin } from '@capacitor/core';
import { AudioPluginPlugin } from './definitions';

export class AudioPluginWeb extends WebPlugin implements AudioPluginPlugin {
  constructor() {
    super({
      name: 'AudioPlugin',
      platforms: ['web']
    });
  }

  async echo(options: { value: string }): Promise<{value: string}> {
    console.log('ECHO', options);
    return options;
  }
}

const AudioPlugin = new AudioPluginWeb();

export { AudioPlugin };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(AudioPlugin);
