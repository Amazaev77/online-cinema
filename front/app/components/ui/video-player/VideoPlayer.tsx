import cn from 'classnames'
import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'
import AuthPlaceholder from '@/ui/video-player/AuthPlaceholder/AuthPlaceholder'
import { useVideo } from '@/ui/video-player/useVideo'

import { useAuth } from '@/hooks/useAuth'

import { formatTimeCode } from '@/utils/player/formatTimeCode'

import styles from './VideoPlayer.module.scss'
import { IVideoPlayer } from './video.interface'

const VideoPlayer: FC<IVideoPlayer> = ({ slug, videoSource }) => {
	const { videoRef, actions, video } = useVideo()

	const { user } = useAuth()

	return (
		<div
			className={cn(styles.wrapper, {
				'h-96': !user,
			})}
		>
			{user ? (
				<>
					<video
						ref={videoRef}
						className={styles.video}
						src={videoSource + '#t=0.5'}
						preload="metadata"
						onClick={actions.toggleVideo}
					/>
					<div className={styles.progressBarContainer}>
						<div />
						<div
							style={{ width: `${video.progress}%` }}
							className={styles.progressBar}
						/>
						<div />
					</div>
					<div className={styles.controls}>
						<div>
							<button onClick={actions.revert}>
								<MaterialIcon name="MdHistory" />
							</button>

							<button onClick={actions.toggleVideo}>
								<MaterialIcon
									name={video.isPlaying ? 'MdPause' : 'MdPlayArrow'}
								/>
							</button>

							<button onClick={actions.forward}>
								<MaterialIcon name="MdUpdate" />
							</button>

							<div className={styles.timeControls}>
								<p className={styles.timeControls}>
									{formatTimeCode(video.currentTime)}
								</p>
								<p> / </p>
								<p className={styles.controlsTime}>
									{formatTimeCode(video.videoTime)}
								</p>
							</div>
						</div>
						<div>
							<button onClick={actions.fullScreen}>
								<MaterialIcon name="MdFullscreen" />
							</button>
						</div>
					</div>
				</>
			) : (
				<AuthPlaceholder slug={slug} />
			)}
		</div>
	)
}

export default VideoPlayer
