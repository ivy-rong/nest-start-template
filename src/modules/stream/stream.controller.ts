import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  Sse,
  StreamableFile,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import {
  Observable,
  filter,
  finalize,
  interval,
  map,
  take,
  takeUntil,
} from 'rxjs';
import { html } from './dto';
import { ServerResponse } from 'http';

@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  private connectedClients: ServerResponse[] = [];

  @Sse('stream')
  @HttpCode(HttpStatus.OK)
  stream(@Res({ passthrough: true }) res: ServerResponse) {
    this.connectedClients.push(res);

    // 移除已经断开的客户端
    this.connectedClients = this.connectedClients.filter(
      (client) => !client.closed,
    );

    // 如果没有客户端连接,直接返回
    if (this.connectedClients.length === 0) {
      return;
    }

    const source = interval(100);
    const stopSource = source.pipe(filter((val) => val >= html.length));
    const evenSource = source.pipe(
      map((val) => {
        console.log(val);
        return { data: { msg: html[val] } };
      }),
      take(html.length),
      takeUntil(stopSource),
      finalize(() => {
        // 在数据推送完成后关闭 SSE 连接
        res.end();
      }),
    );
    return evenSource;
  }
}
