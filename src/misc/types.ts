
// Generates by gpt-3.5
interface SongMetadata {
    title: string;  // 歌曲名称
    artist: string;  // 艺术家
    duration: number;  // 歌曲时长（单位：秒）
    album?: string;  // 专辑
    trackNumber?: number;  // 专辑中歌曲的序号
    discNumber?: number;  // 专辑中CD的数量
    year?: number;  // 歌曲发行年份
    genre?: string;  // 歌曲类型
    language?: string;  // 歌曲语言
    composer?: string;  // 歌曲作曲人
    lyricist?: string;  // 歌词作者
    publisher?: string;  // 发行公司
    coverImage: string;  // 歌曲封面图链接
}

// Generates by gpt-3.5
interface PlaylistMetadata {
    songs: Array<SongMetadata>;  // 歌曲列表
    name: string;  // 播放列表名称
    duration: number;  // 歌单总时长（单位：秒）
    createdAt: Date;  // 播放列表创建时间
    updatedAt: Date;  // 播放列表最近更新时间
    description?: string;  // 播放列表描述
    coverImage?: string; // 播放列表封面图链接
    playCount?: number;  // 播放次数
    // creator: string;  // 播放列表创建者
    // likeCount?: number;  // 点赞次数
    // shareCount?: number;  // 分享次数
  }
export type {
    SongMetadata,
    PlaylistMetadata
}