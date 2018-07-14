import {
	playMode
} from 'common/js/config'
import {
	loadSearch,
	loadPlay,
	loadFavorite
} from 'common/js/cache'
const state = {
	singer: {}, //歌手头像以及专辑歌曲信息
	playing: false, //是否在播放中
	fullScreen: false, //是否全屏
	playlist: [], //根据播放模式调整后的列表
	sequenceList: [], //播放顺序列表
	mode: playMode.sequence, //播放模式
	currentIndex: -1, //正在播放的歌曲index
	disc: {}, //首页详细页详情
	topList: {}, //排行榜歌单
	searchHistory: loadSearch(), //查询历史
	playHistory: loadPlay(), //播放历史
	favoriteList: loadFavorite() //我喜欢的

}

export default state