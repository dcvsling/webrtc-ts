import { RTCConnectionProvider } from './client';
import { createClient, QRCodeClient }  from './qrclient';
import { Negotiator, QRCodeNegotiator } from './negotiate';

const qrcode = createClient('qrcode');

const negotiator = new QRCodeNegotiator(qrcode);

const conn = new RTCConnectionProvider(negotiator).create();

conn.connect();

export default conn;