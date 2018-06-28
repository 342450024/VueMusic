import jsonp from 'common/js/jsonp'
import {
	commonParams,
	options
} from './config'
// var guid;
export function getSingerList() {
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

	const data = Object.assign({}, commonParams, {
		channel: 'singer',
		page: 'list',
		key: 'all_all_all',
		pagesize: 100,
		pagenum: 1,
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq'
	})

	return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

	const data = Object.assign({}, commonParams, {
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		order: 'listen',
		begin: 0,
		num: 80,
		songstatus: 1,
		singermid: singerId
	})

	return jsonp(url, data, options)
}

//获取歌曲播放时需要一个key
// export function getvkey() {
// 	const url = 'http://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg'

// 	const data = Object.assign({}, commonParams, {
// 		json: 3,
// 		guid: guid ? guid : guid(),
// 		g_tk: 938407465,
// 		loginUin: 0,
// 		hostUin: 0,
// 		format: 'jsonp',
// 		inCharset: 'utf8',
// 		outCharset: 'GB2312',
// 		notice: 0,
// 		platform: 'yqq',
// 		needNewCode: 0
// 	})

// 	return jsonp(url, data, {
// 		param: 'jsonCallback'
// 	})
// }

// function guid() {
// 	var t = (new Date).getUTCMilliseconds()
// 	guid = Math.round(2147483647 * Math.random()) * t % 1e10
// 	return guid
// }