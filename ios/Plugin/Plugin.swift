import Foundation
import Capacitor
import AVFoundation
import MediaPlayer

class Player: NSObject {
    var playItems: [AVPlayerItem]
    var player: AVQueuePlayer
    init(items: [AVPlayerItem]) {
        self.playItems = items
        player = AVQueuePlayer(items: items)
    }
    func play() {
        self.player.play()
    }
    func pause() {
        self.player.pause()
    }
    func toEnd() -> Bool {
        return self.player.currentItem == playItems.last
    }
}

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitor.ionicframework.com/docs/plugins/ios
 */
@objc(AudioPlugin)
public class AudioPlugin: CAPPlugin {
    
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }
    
    var isInited = false
    
    @objc func onPlayEnd(){
        self.bridge.triggerWindowJSEvent(eventName: "playEnd")
        if (self.audioPlayer?.toEnd() ?? false) {
            self.bridge.triggerWindowJSEvent(eventName: "playAllEnd")
        }
    }
    
    func initAudio() {
        if (self.isInited) {
            return
        }
        let session = AVAudioSession.sharedInstance()
        do{
            //  设置会话类别
            try session.setCategory(AVAudioSession.Category.playback)
            //  激活会话
            try session.setActive(true)
        }catch {
            print(error)
            return
        }
        DispatchQueue.main.sync {
            let command = MPRemoteCommandCenter.shared()
            command.pauseCommand.isEnabled = true
            command.pauseCommand.addTarget(handler: {e in self.bridge.triggerWindowJSEvent(eventName: "playPaused"); self.audioPlayer?.pause(); return MPRemoteCommandHandlerStatus.success })
            
            command.nextTrackCommand.isEnabled = true
            command.nextTrackCommand.addTarget(handler: {e in self.bridge.triggerWindowJSEvent(eventName: "playNext"); self.audioPlayer?.pause(); return MPRemoteCommandHandlerStatus.success})
            
            command.previousTrackCommand.isEnabled = true
            command.previousTrackCommand.addTarget(handler: {e in self.bridge.triggerWindowJSEvent(eventName: "playPrevious"); self.audioPlayer?.pause(); return MPRemoteCommandHandlerStatus.success})
            
            command.playCommand.isEnabled = true
            command.playCommand.addTarget(handler: {e in self.bridge.triggerWindowJSEvent(eventName: "play"); self.audioPlayer?.play(); return MPRemoteCommandHandlerStatus.success})
            
            let nofity = NotificationCenter.default
            nofity.addObserver(self, selector: #selector(self.onPlayEnd), name: NSNotification.Name.AVPlayerItemDidPlayToEndTime, object: nil)
        }
        self.isInited = true
    }
    
    @objc func setPlaying(_ call: CAPPluginCall) {
        let title = call.getString("title") ?? "多知电台"
        let artist = call.getString("artist") ?? "多小知"
        let now = MPNowPlayingInfoCenter.default()
        now.nowPlayingInfo = [
            MPMediaItemPropertyTitle: title,
            MPMediaItemPropertyArtist: artist
        ]
        call.resolve(["status": "ok"])
    }
    
    var audioPlayer: Player?
    @objc func playList(_ call: CAPPluginCall) {
        let audios = call.getArray("items", [String: String].self)
        if (audios == nil) {
            call.reject("Must provide items")
        }
        let urls = audios!.map({item in URL(string: item["src"]!)})
        let urls_ = urls.filter({u in u != nil}).map({u in u!})
        let items = urls_.map({u in AVPlayerItem(url: u)})
        self.initAudio()
        self.audioPlayer = Player(items: items)
        self.audioPlayer?.play()
    }
    
    @objc func pausePlay(_ call: CAPPluginCall) {
        self.audioPlayer?.pause()
    }
    @objc func resumePlay(_ call: CAPPluginCall) {
        self.audioPlayer?.play()
    }
}
