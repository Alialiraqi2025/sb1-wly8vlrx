// WebRTC utility functions for TELE IRAQ
export interface CallConfiguration {
  iceServers: RTCIceServer[];
  audio: boolean;
  video: boolean | MediaTrackConstraints;
}

export interface CallState {
  isConnected: boolean;
  isConnecting: boolean;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  peerConnection: RTCPeerConnection | null;
}

export class WebRTCManager {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private configuration: RTCConfiguration;
  
  constructor() {
    this.configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' }
      ]
    };
  }

  async initializeCall(constraints: MediaStreamConstraints): Promise<MediaStream> {
    try {
      // Get user media
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Create peer connection
      this.peerConnection = new RTCPeerConnection(this.configuration);
      
      // Add local stream tracks to peer connection
      this.localStream.getTracks().forEach(track => {
        if (this.peerConnection && this.localStream) {
          this.peerConnection.addTrack(track, this.localStream);
        }
      });
      
      return this.localStream;
    } catch (error) {
      console.error('Error initializing call:', error);
      throw this.handleMediaError(error as Error);
    }
  }

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }
    
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }
    
    await this.peerConnection.setRemoteDescription(offer);
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }

  async handleAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }
    
    await this.peerConnection.setRemoteDescription(answer);
  }

  async addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }
    
    await this.peerConnection.addIceCandidate(candidate);
  }

  toggleAudio(enabled: boolean): void {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = enabled;
      }
    }
  }

  toggleVideo(enabled: boolean): void {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = enabled;
      }
    }
  }

  async switchCamera(): Promise<void> {
    if (!this.localStream) return;
    
    const videoTrack = this.localStream.getVideoTracks()[0];
    if (!videoTrack) return;
    
    const currentFacingMode = videoTrack.getSettings().facingMode;
    const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
    
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newFacingMode },
        audio: true
      });
      
      const newVideoTrack = newStream.getVideoTracks()[0];
      
      if (this.peerConnection) {
        const sender = this.peerConnection.getSenders().find(s => 
          s.track && s.track.kind === 'video'
        );
        
        if (sender) {
          await sender.replaceTrack(newVideoTrack);
        }
      }
      
      // Replace track in local stream
      videoTrack.stop();
      this.localStream.removeTrack(videoTrack);
      this.localStream.addTrack(newVideoTrack);
      
    } catch (error) {
      console.error('Error switching camera:', error);
    }
  }

  getConnectionState(): RTCPeerConnectionState | null {
    return this.peerConnection?.connectionState || null;
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  onRemoteStream(callback: (stream: MediaStream) => void): void {
    if (this.peerConnection) {
      this.peerConnection.ontrack = (event) => {
        callback(event.streams[0]);
      };
    }
  }

  onConnectionStateChange(callback: (state: RTCPeerConnectionState) => void): void {
    if (this.peerConnection) {
      this.peerConnection.onconnectionstatechange = () => {
        callback(this.peerConnection!.connectionState);
      };
    }
  }

  onIceCandidate(callback: (candidate: RTCIceCandidate) => void): void {
    if (this.peerConnection) {
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          callback(event.candidate);
        }
      };
    }
  }

  cleanup(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
    
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  }

  private handleMediaError(error: Error): Error {
    const errorMessage = error.message;
    
    if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
      return new Error('Camera and microphone access was denied. Please enable permissions in your browser settings and try again.');
    } else if (errorMessage.includes('NotFoundError')) {
      return new Error('No camera or microphone found. Please connect your devices and try again.');
    } else if (errorMessage.includes('NotReadableError')) {
      return new Error('Camera or microphone is already in use by another application. Please close other applications and try again.');
    } else if (errorMessage.includes('OverconstrainedError')) {
      return new Error('The requested camera or microphone settings are not supported by your device.');
    } else if (errorMessage.includes('SecurityError')) {
      return new Error('Access to camera and microphone was blocked due to security restrictions.');
    } else {
      return new Error('Unable to access camera and microphone. Please check your device connections and permissions, then try again.');
    }
  }
}

// Audio processing utilities
export class AudioProcessor {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;

  async initialize(stream: MediaStream): Promise<void> {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      
      this.analyser.fftSize = 256;
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      
      source.connect(this.analyser);
    } catch (error) {
      console.error('Error initializing audio processor:', error);
    }
  }

  getAudioLevel(): number {
    if (!this.analyser || !this.dataArray) return 0;
    
    this.analyser.getByteFrequencyData(this.dataArray);
    
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    
    return sum / this.dataArray.length / 255; // Normalize to 0-1
  }

  cleanup(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.analyser = null;
    this.dataArray = null;
  }
}

// Call quality monitoring
export class CallQualityMonitor {
  private peerConnection: RTCPeerConnection;
  private stats: RTCStatsReport | null = null;
  
  constructor(peerConnection: RTCPeerConnection) {
    this.peerConnection = peerConnection;
  }

  async getStats(): Promise<CallQualityStats> {
    try {
      this.stats = await this.peerConnection.getStats();
      
      let audioStats: AudioStats = { bitrate: 0, packetsLost: 0, jitter: 0 };
      let videoStats: VideoStats = { bitrate: 0, packetsLost: 0, frameRate: 0, resolution: '' };
      
      this.stats.forEach((report) => {
        if (report.type === 'inbound-rtp' && report.mediaType === 'audio') {
          audioStats = {
            bitrate: report.bytesReceived * 8 / 1000, // kbps
            packetsLost: report.packetsLost || 0,
            jitter: report.jitter || 0
          };
        } else if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
          videoStats = {
            bitrate: report.bytesReceived * 8 / 1000, // kbps
            packetsLost: report.packetsLost || 0,
            frameRate: report.framesPerSecond || 0,
            resolution: `${report.frameWidth}x${report.frameHeight}`
          };
        }
      });
      
      return { audio: audioStats, video: videoStats };
    } catch (error) {
      console.error('Error getting call stats:', error);
      return {
        audio: { bitrate: 0, packetsLost: 0, jitter: 0 },
        video: { bitrate: 0, packetsLost: 0, frameRate: 0, resolution: '' }
      };
    }
  }
}

export interface AudioStats {
  bitrate: number;
  packetsLost: number;
  jitter: number;
}

export interface VideoStats {
  bitrate: number;
  packetsLost: number;
  frameRate: number;
  resolution: string;
}

export interface CallQualityStats {
  audio: AudioStats;
  video: VideoStats;
}

// Device management utilities
export class DeviceManager {
  static async getAvailableDevices(): Promise<MediaDeviceInfo[]> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices;
    } catch (error) {
      console.error('Error getting devices:', error);
      return [];
    }
  }

  static async getAudioInputDevices(): Promise<MediaDeviceInfo[]> {
    const devices = await this.getAvailableDevices();
    return devices.filter(device => device.kind === 'audioinput');
  }

  static async getVideoInputDevices(): Promise<MediaDeviceInfo[]> {
    const devices = await this.getAvailableDevices();
    return devices.filter(device => device.kind === 'videoinput');
  }

  static async getAudioOutputDevices(): Promise<MediaDeviceInfo[]> {
    const devices = await this.getAvailableDevices();
    return devices.filter(device => device.kind === 'audiooutput');
  }

  static async switchAudioOutput(deviceId: string, audioElement: HTMLAudioElement): Promise<void> {
    try {
      if ('setSinkId' in audioElement) {
        await (audioElement as any).setSinkId(deviceId);
      }
    } catch (error) {
      console.error('Error switching audio output:', error);
    }
  }
}