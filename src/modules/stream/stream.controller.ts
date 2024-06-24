import { Controller, Get, Sse, StreamableFile } from '@nestjs/common';
import { StreamService } from './stream.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Observable } from 'rxjs';
import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { html } from './dto';
@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Get('file')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    console.log(file);
    return new StreamableFile(file);
  }

  @Sse('stream')
  stream() {
    return new Observable((observer) => {
      observer.next({ data: { msg: 'aaa' } });
      let i = 0;
      const timer = setInterval(() => {
        observer.next({ data: { msg: html[i] } });
        i++;
        if (i > html.length) {
          clearInterval(timer);
          observer.complete();
        }
      }, 1000);
    });
  }

  @Sse('stream2')
  stream2() {
    const childProcess = exec('tail -f ./log');

    return new Observable((observer) => {
      childProcess.stdout.on('data', (msg) => {
        console.log(msg.toString(), '111');
        observer.next({ data: { msg: msg.toString() } });
      });
    });
  }

  @Sse('stream3')
  stream3() {
    return new Observable((observer) => {
      const json = readFileSync('./package.json').toJSON();
      console.log(json, '222');
      // observer.next({ data: { msg: json } });
      observer.next({ data: { msg: json } });
    });
  }
}
