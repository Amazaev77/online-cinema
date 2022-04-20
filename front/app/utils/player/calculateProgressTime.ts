export const calculateProgressTime = (
	offsetX: number,
	clientWidth: number,
	videoTime: number
) => Math.floor((offsetX / clientWidth) * videoTime)
