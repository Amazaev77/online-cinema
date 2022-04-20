export const formatTimeCode = (videoTime: number) => {
	return (
		Math.floor(videoTime / 60) +
		':' +
		('0' + Math.floor(videoTime % 60)).slice(-2)
	)
}
