# Capacitor Audio


## Introduction

This is a simple but powerful Plugin for develop radio like Apps using Capacitor.

[GitHub Repo](https://github.com/qingant/capacitor-audio)


## APIs

```javascript
// Play a list of audio source
Capacitor.Plugins.Audio.playList({
  items: [
    {
      src: '...'
    },
    {
      src: '...'
    }
  ]
})

// Set Playing Info in Control center
Capacitor.Plugins.Audio.setPlaying({
  title: 'My Radio',
  artist: "Ma Tao"
})

// pause playing
Capacitor.Plugins.Audio.pausePlay()

//resume playing
Capacitor.Plugins.Audio.resumePlay()

```

Events

```javascript
// trigger when one item of playlist play to endtime
window.addEventListener('playEnd', () => {
    console.log('PlayEndd')
})

// trigger when one playlist all endtime
window.addEventListener('playAllEnd', e => {

})
// trigger when user request next in control center
window.addEventListener('playNext', e => {

})

// trigger when user request prevous in control center
window.addEventListener('playPrevious', e => {

})

// trigger when play paused (from control center)
window.addEventListener('playPaused', e => {

})

// trigger when play resumed (from control center)
window.addEventListener('playResumed', e => {

})
```

