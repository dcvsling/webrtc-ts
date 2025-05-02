import { QRCodeClient } from './qrclient';


export interface Negotiator {
    SendIceCandidate(iceCandidate: RTCIceCandidate): Promise<void>;
    SendOffer(offer: RTCSessionDescription): Promise<void>;
    SendAnswer(answer: RTCSessionDescription): Promise<void>;
    OnIceCandidate: (iceCandidate: RTCIceCandidate) => Promise<void>;
    OnOffer: (offer: RTCSessionDescription) => Promise<void>;
    OnAnswer: (answer: RTCSessionDescription) => Promise<void>;
}

export class QRCodeNegotiator implements Negotiator {
    constructor(private client: QRCodeClient) {}
    SendIceCandidate(iceCandidate: RTCIceCandidateInit): Promise<void> {
        this.client.set(JSON.stringify(iceCandidate));
        return Promise.resolve();
    }
    SendOffer(offer: RTCSessionDescriptionInit): Promise<void> {
        this.client.set(JSON.stringify(offer));
        return Promise.resolve();
    }
    SendAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
        this.client.set(JSON.stringify(answer));
        return Promise.resolve();
    }
    OnIceCandidate(iceCandidate: RTCIceCandidateInit): Promise<void> { return Promise.resolve(); }
    OnOffer(offer: RTCSessionDescriptionInit): Promise<void> { return Promise.resolve(); }
    OnAnswer(answer: RTCSessionDescriptionInit): Promise<void> { return Promise.resolve(); }

}



// export class Negotiator {
//     private _negoticators: { [userId: string]: NegotiatorWithUser } = {}
//     constructor(private negoticator: INegotiator) {
//         this.negoticator.OnIceCandidate = (from, iceCandidate) => this.get(from).OnIceCandidate(iceCandidate);
//         this.negoticator.OnOffer = (from, offer) => this.get(from).OnOffer(offer);
//         this.negoticator.OnAnswer = (from, answer) => this.get(from).OnAnswer(answer);
//     }
//     get(userId: string): NegotiatorWithUser {
//         return this._negoticators[userId] ??= new NegotiatorWithUser(userId, this.negoticator);
//     }
// }


// export class NegotiatorWithUser {
//     constructor(public userId: string, private negotiator: INegotiator) { }
//     SendIceCandidate(iceCandidate: RTCIceCandidateInit): Promise<void> {
//         return this.negotiator.SendIceCandidate(this.userId, iceCandidate);
//     }
//     SendOffer(offer: RTCSessionDescriptionInit): Promise<void> {
//         return this.negotiator.SendOffer(this.userId, offer);
//     }
//     SendAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
//         return this.negotiator.SendAnswer(this.userId, answer);
//     }
//     OnIceCandidate: (iceCandidate: RTCIceCandidateInit) => Promise<void> = EMPTY_EVENT;
//     OnOffer: (offer: RTCSessionDescriptionInit) => Promise<void> = EMPTY_EVENT;
//     OnAnswer: (answer: RTCSessionDescriptionInit) => Promise<void> = EMPTY_EVENT;
// }