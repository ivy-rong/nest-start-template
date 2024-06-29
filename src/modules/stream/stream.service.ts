import { Injectable, Res } from '@nestjs/common';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { Observable, filter, interval, map, takeUntil } from 'rxjs';
import { html } from './dto';
import { ServerResponse } from 'http';

@Injectable()
export class StreamService {
  getConnectedClients() {
    throw new Error('Method not implemented.');
  }

  generateSseStream() {
    const source = interval(50);
    const stopSource = source.pipe(filter((val) => val >= html.length));
    const evenSource = source.pipe(
      map((val) => {
        console.log(val);
        return { data: { msg: html[val] } };
      }),
      takeUntil(stopSource),
    );
    return evenSource;
  }
}
