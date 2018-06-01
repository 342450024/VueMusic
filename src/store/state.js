import {
	playMode
} from 'common/js/config'
const state = {
	singer: {}, //歌手头像以及专辑歌曲信息
	playing: false, //是否在播放中
	fullScreen: false, //是否全屏
	playlist: [], //播放顺序列表
	sequenceList: [] //根据播放模式调整后的列表
	mode: playMode.sequence, //播放模式
	currentIndex: -1

}

export default state