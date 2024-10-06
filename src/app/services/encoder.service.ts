import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncoderService {
  private encoder : TextEncoder = new TextEncoder();
  private decoderUTF8 : TextDecoder = new TextDecoder('utf-8');
  private decoderISO : TextDecoder = new TextDecoder('iso-8859-1');
  constructor() { }

  convertStringUTF8(text : string) : string{
    const byteStr = this.encoder.encode(text);
    const decoded = this.decoderUTF8.decode(byteStr)
    return decoded
  }

  convertStringISO(text : string) : string{
    const byteStr = this.encoder.encode(text);
    const decoded = this.decoderISO.decode(byteStr)
    return decoded
  }
}
