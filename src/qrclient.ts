import QrScanner from 'qr-scanner';
import qrcode from 'qrcode';

export interface QRCodeClient {
    set(data: string): void;
    clear(): void;
    scan(image: Blob): Promise<String>;
}

export function createClient(canvasId: string): QRCodeClient {
    const canvas = document.querySelector<HTMLCanvasElement>(`#${canvasId}`);
    if(!isCanvas(canvas))
        throw Error(`${canvasId} is not canvas`);
    return  {
        set(data: string) {
            qrcode.toCanvas(canvas, data);
        },
        clear() {
            canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        },
        scan
    }
    function isCanvas(canvas: any): canvas is HTMLCanvasElement {
        return canvas;
    }
    async function scan(image: Blob): Promise<String> {
        return await QrScanner.scanImage(image, {  
            
        }).then(text => text.data);
    }
}