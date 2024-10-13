import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class BlobConversionService {

  constructor(private sanitizer : DomSanitizer) { }
  
  async convert(imagePath : string) :Promise<ArrayBuffer>{
    const fileData = await Filesystem.readFile({
      path: imagePath,
    });

    console.log(fileData.data)

    const binaryString = atob(fileData.data as string);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
  
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  }

  decode(blobData : string){
    const byteNumbers = blobData.split(',').map(num => parseInt(num, 10));
    const uintArray = new Uint8Array(byteNumbers);
    const blob = new Blob([uintArray],{ type: 'image/jpeg' });
    console.log('DFO: decode ')
    console.log('DFO decode: '+blob.size)
    console.log('DFO: decode:'+blob.type)

    // const imgUrl = URL.createObjectURL(blob)
    // console.log('DFO: imgUrl '+imgUrl)
    let imgUrl;
    const reader = new FileReader();
    reader.readAsDataURL(blob)
    reader.onloadend = () =>{
      imgUrl = reader.result
      console.log('DFO typeof result '+typeof(imgUrl))
      console.log(reader.result)
    }
    return imgUrl;
  }
}
