declare module "@capacitor/core" {
  interface PluginRegistry {
    AudioPlugin: AudioPluginPlugin;
  }
}

export interface AudioPluginPlugin {
  echo(options: { value: string }): Promise<{value: string}>;
}
