"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AudioTrack } from '@/types/audio'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react'

type Props = {
  tracks: AudioTrack[]
  initialIndex?: number
}

const formatTime = (sec: number) => {
  if (!isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer({ tracks, initialIndex = 0 }: Props) {
  const [index, setIndex] = useState(Math.min(initialIndex, Math.max(0, tracks.length - 1)))
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.9)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLInputElement | null>(null)

  const track = tracks[index]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoaded = () => {
      setDuration(audio.duration || 0)
    }
    const onTime = () => setCurrentTime(audio.currentTime || 0)
    const onEnded = () => {
      if (index < tracks.length - 1) {
        setIndex(index + 1)
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
        audio.currentTime = 0
      }
    }

    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
    }
  }, [index, tracks.length])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = muted
    }
  }, [volume, muted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying, track?.src])

  useEffect(() => {
    if (typeof navigator === 'undefined' || !(navigator as any).mediaSession) return
    const ms = (navigator as any).mediaSession
    ms.metadata = new (window as any).MediaMetadata?.({
      title: track?.title,
      artist: track?.artist,
      artwork: track?.cover ? [{ src: track.cover, sizes: '512x512', type: 'image/png' }] : undefined,
    })
    ms.setActionHandler?.('play', () => setIsPlaying(true))
    ms.setActionHandler?.('pause', () => setIsPlaying(false))
    ms.setActionHandler?.('previoustrack', () => handlePrev())
    ms.setActionHandler?.('nexttrack', () => handleNext())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track?.id])

  const handleToggle = () => setIsPlaying(p => !p)
  const handlePrev = () => setIndex(i => (i > 0 ? i - 1 : i))
  const handleNext = () => setIndex(i => (i < tracks.length - 1 ? i + 1 : i))

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    if (audioRef.current && isFinite(v)) {
      audioRef.current.currentTime = v
      setCurrentTime(v)
    }
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.key) {
      case ' ':
        e.preventDefault()
        handleToggle()
        break
      case 'ArrowRight':
        if (audioRef.current) {
          audioRef.current.currentTime = Math.min(duration, (audioRef.current.currentTime || 0) + 5)
        }
        break
      case 'ArrowLeft':
        if (audioRef.current) {
          audioRef.current.currentTime = Math.max(0, (audioRef.current.currentTime || 0) - 5)
        }
        break
      case 'ArrowUp':
        setVolume(v => Math.min(1, Math.round((v + 0.05) * 20) / 20))
        break
      case 'ArrowDown':
        setVolume(v => Math.max(0, Math.round((v - 0.05) * 20) / 20))
        break
      case 'm':
      case 'M':
        setMuted(m => !m)
        break
    }
  }

  if (!track) {
    return (
      <div className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-6 text-center text-gray-300">
        音源が登録されていません
      </div>
    )
  }

  return (
    <div
      className="bg-gray-900/50 rounded-xl border border-yellow-400/20 p-4 sm:p-6"
      role="region"
      aria-label="オーディオプレイヤー"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center gap-4 mb-4">
        {track.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={track.cover} alt="cover" className="w-16 h-16 rounded-lg object-cover" />
        )}
        <div className="min-w-0">
          <div className="text-white font-semibold truncate">{track.title}</div>
          {track.artist && (
            <div className="text-gray-400 text-sm truncate">{track.artist}</div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <button
          type="button"
          onClick={handlePrev}
          disabled={index === 0}
          className="p-2 rounded-lg border border-yellow-400/20 text-yellow-400 hover:bg-gray-800 disabled:opacity-40"
          aria-label="前の曲"
        >
          <SkipBack size={18} />
        </button>
        <button
          type="button"
          onClick={handleToggle}
          className="p-3 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-colors"
          aria-label={isPlaying ? '一時停止' : '再生'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={index >= tracks.length - 1}
          className="p-2 rounded-lg border border-yellow-400/20 text-yellow-400 hover:bg-gray-800 disabled:opacity-40"
          aria-label="次の曲"
        >
          <SkipForward size={18} />
        </button>

        <div className="ml-2 text-sm text-gray-300 tabular-nums">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <input
          ref={progressRef}
          type="range"
          min={0}
          max={Math.max(0, Math.floor(duration))}
          step={1}
          value={Math.floor(currentTime)}
          onChange={handleSeek}
          aria-label="再生位置"
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMuted(m => !m)}
          className="p-2 rounded-lg border border-yellow-400/20 text-yellow-400 hover:bg-gray-800"
          aria-label={muted ? 'ミュート解除' : 'ミュート'}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="音量"
          className="w-40 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        crossOrigin="anonymous"
        controls={false}
        aria-hidden
        controlsList="nodownload noplaybackrate"
      />
    </div>
  )
}

