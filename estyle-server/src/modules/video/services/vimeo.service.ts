import {Injectable} from '@nestjs/common';
import { promisify } from 'util';
import { Vimeo } from 'vimeo';

@Injectable()
export class VimeoService {
  request;
  // Todo: Refactoring, move user data to env
  private readonly CLIENT_SECRET = 'Nu4qrIhSUi6LFMMMo5qWOoKYLPbrXMe5LUb1I49GEDh1QVfkQeoaAXebKk/Ic4xKcjMcY7cyKeBvvmlfk3pHV50+r2Scdr8PpcxfFf/mOzD8zUZGksUoWaJ6iEvXpjYA';
  private readonly ACCESS_TOKEN = '582bde93d4a6cc96649d649a30c3383c';
  private readonly CLIENT_ID = 'cf0692770f4a7e0cb6bfc9dc278e2a01bd57cee7';
  private readonly VIDEO_PLAYER_URL = 'https://player.vimeo.com';

  private client = new Vimeo(this.CLIENT_ID, this.CLIENT_SECRET, this.ACCESS_TOKEN);

  constructor() {
    this.request = promisify(this.client.request);
  }

  async find(page: number = 1, perPage: number = 6) {
    // const res = await this.request(`/videos?query=fashion&per_page=${perPage}&page=${page}`);
    // console.log(res);
    // return this.parseVimeoRawData(res);
    return new Promise(((res, rej) => {
        this.client.request({
          method: 'GET',
          path: `/videos?query=fashion&per_page=${perPage}&page=${page}`,
        }, (error, body, statusCode, headers) => {
          if (error) {
            rej(error);
            return;
          }
          res(this.parseVimeoRawData(body));
        });
    }));
  }

  async findById(id: string) {
    return new Promise((resolve, reject) => {
      this.client.request(`videos/${id}`, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  parseVimeoRawData(rawResult) {
    return {
      data: this.parseVimeoVideos(rawResult.data),
      total: rawResult.total,
    };
  }

  // Todo: Refactoring
  parseVimeoVideos(rawVideos) {
    const videos = [];
    rawVideos.forEach(video => {
      videos.push({
        image: video.pictures.sizes[3].link,
        name: video.name,
        created_time: video.created_time,
        duration: video.duration,
        link: video.link,
        playerLink: this.parsePlayerVideoUrl(video.uri),
        comments: video.metadata.connections.comments.total,
        likes: video.metadata.connections.likes.total,
        authorThumbnail: video.user.pictures.sizes[2].link,
        description: video.description,
        author: video.user.name,
        authorLink: video.user.link,
      });
    });

    return videos;
  }

  // Example uri: "/videos/419983412";
  parsePlayerVideoUrl(uri) {
    const id = uri.substr(uri.lastIndexOf('/') + 1);

    return this.VIDEO_PLAYER_URL + `/video/${id}`;
  }
}
