import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { IVideoElement } from './video.interface'

export const useVideo = () => {
	const videoRef = useRef<IVideoElement>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const updateProgress = () => {
			setCurrentTime(video.currentTime)
			setProgress((video.currentTime / videoTime) * 100)
		}

		video.addEventListener('mousemove', updateProgress)
		return () => {
			video.removeEventListener('timeupdate', updateProgress)
		}
	}, [videoTime])

	useEffect(() => {
		const originalDuration = videoRef.current?.duration
		if (originalDuration) {
			setVideoTime(originalDuration)
		}
	}, [videoRef.current?.duration])

	const toggleVideo = useCallback(() => {
		if (!isPlaying) {
			videoRef.current?.play()
			setIsPlaying(true)
		} else {
			videoRef.current?.pause()
			setIsPlaying(false)
		}
	}, [isPlaying])

	const forward = () => {
		if (videoRef.current) {
			videoRef.current.currentTime += 10
		}
	}

	const revert = () => {
		if (videoRef.current) {
			videoRef.current.currentTime -= 10
		}
	}

	const fullScreen = () => {
		const video = videoRef.current

		if (!video) return

		if (video.requestFullscreen) {
			video.requestFullscreen()
		} else if (video.msRequestFullScreen) {
			video.msRequestFullScreen()
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen()
		} else if (video.webkitRequestFullScreen) {
			video.webkitRequestFullScreen()
		}
	}

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const updateProgress = () => {
			setCurrentTime(video.currentTime)
			setProgress((video.currentTime / videoTime) * 100)
		}

		video.addEventListener('timeupdate', updateProgress)
		return () => {
			video.removeEventListener('timeupdate', updateProgress)
		}
	}, [videoTime])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case 'ArrowRight':
					forward()
					break
				case 'ArrowLeft':
					revert()
					break
				case ' ': {
					event.preventDefault()
					toggleVideo()
					break
				}
				case 'f':
					fullScreen()
					break

				default:
					return
			}
		}
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [toggleVideo])

	return useMemo(
		() => ({
			videoRef,
			actions: {
				fullScreen,
				revert,
				forward,
				toggleVideo,
			},
			video: {
				isPlaying,
				currentTime,
				videoTime,
				progress,
			},
		}),
		[toggleVideo, isPlaying, currentTime, videoTime, progress]
	)
}