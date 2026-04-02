let audioCtx: AudioContext | null = null

export const playClickSound = () => {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
        }

        if (audioCtx.state === "suspended") {
            audioCtx.resume()
        }

        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()

        // Create a pleasant, clear "pop" sound
        osc.type = "sine"
        osc.frequency.setValueAtTime(880, audioCtx.currentTime) // High pitch
        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1) // Quick slide down

        gain.gain.setValueAtTime(0.4, audioCtx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1)

        osc.connect(gain)
        gain.connect(audioCtx.destination)

        osc.start()
        osc.stop(audioCtx.currentTime + 0.1)
    } catch (e) {
        console.error("Audio playback error:", e)
    }
}
