// 音乐播放器共享状态
import { ref } from 'vue'

export interface Track {
  name: string
  author: string
  file: string
  cover: string
  category: string
}

// 播放列表 - 统一管理

// name: '歌曲名称',
// author: '艺术家名称',
// file: '/music/分类文件夹/音频文件.flac', 支持 .flac, .mp3, .wav 等
// cover: '封面图片URL',                   可以是本地路径或外部URL
// category: 'japanese'                   分类标签

export const musicPlaylist = ref<Track[]>([
  {
    name: 'ワールドイズマイン (World is Mine)',
    author: 'supercell feat. 初音ミク',
    file: '/music/japanese/ワールドイズマイン-supercell_初音ミク-1252051-2000.flac',
    cover: 'https://banxia-log.oss-cn-beijing.aliyuncs.com/public/logo.bmp',
    category: 'japanese'
  },
  {
    name: 'Butterfly',
    author: '雅-MIYAVI',
    file: '/music/japanese/Butterfly-雅MIYAVI-72923431-2000.flac',
    cover: 'https://banxia-log.oss-cn-beijing.aliyuncs.com/public/logo.bmp',
    category: 'japanese'
  },
  {
    name: '不问天',
    author: '说说Crystal',
    file: '/music/chinese/不问天-说说Crystal-169211217-2000.flac',
    cover: 'https://banxia-log.oss-cn-beijing.aliyuncs.com/public/logo.bmp',
    category: 'chinese'
  },
  {
    name: '天知河',
    author: '说说Crystal',
    file: '/music/chinese/天知河-说说Crystal.flac',
    cover: 'https://banxia-log.oss-cn-beijing.aliyuncs.com/public/logo.bmp',
    category: 'chinese'
  },
  {
    name: '小孩小孩【2023拜年纪单品】',
    author: '刷牙',
    file: '/music/chinese/小孩小孩【2023拜年纪单品】-刷牙-259377242-100.ogg',
    cover: 'https://banxia-log.oss-cn-beijing.aliyuncs.com/public/logo.bmp',
    category: 'chinese'
  },
  {
    name: '故郷の原風景',
    author: '宗次郎',
    file: '/music/light/故郷の原風景-宗次郎-229351415-2000.flac',
    cover: 'https://banxia-log.oss-cn-beijing.aliyuncs.com/public/logo.bmp',
    category: 'light'
  },
  {
    name: '蓄勢 ～ GEAR UP ～',
    author: '采风乐坊',
    file: '/music/rock/蓄勢_～_GEAR_UP_～-采风乐坊-6336174-320.mp3',
    cover: 'https://banxia-log.oss-cn-beijing.aliyuncs.com/public/logo.bmp',
    category: 'rock'
  }
  // 在这里添加更多歌曲
])

// 使用共享播放列表的 composable
export function useMusicStore() {
  return {
    playlist: musicPlaylist
  }
}
