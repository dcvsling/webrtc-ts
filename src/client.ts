import { Negotiator } from "./negotiate";


export type RTCConnection = {
    local: RTCPeerConnection, 
    remote: RTCPeerConnection,
    connect: () => Promise<void>,
    disconnect: () => Promise<void>
};

export class RTCConnectionProvider {
    
    constructor(private negotiator: Negotiator, private configuration?: RTCConfiguration) {
        configuration ??= { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    }
    create(): RTCConnection {
        const negotiator = this.negotiator;
        const local: RTCPeerConnection = new RTCPeerConnection(this.configuration);
        const remote: RTCPeerConnection = new RTCPeerConnection(this.configuration);
        local.addEventListener('icecandidate', e => negotiator.SendIceCandidate(e.candidate!));
        remote.addEventListener('icecandidate', e => console.log('remote ice candidate completed'));
        negotiator.OnOffer = async offer => {
            await remote.setRemoteDescription(offer);
            if(!local.localDescription)
                await sendOfferAsync();
        }
        negotiator.OnAnswer = async answer => {
            await local.setRemoteDescription(answer);
        }
        negotiator.OnIceCandidate = async ice => {
            await sendAnswerAsync();
        }
        const connect = async () => await sendOfferAsync();
        const disconnect = () => {
            local.close();
            remote.close();
            return Promise.resolve();
        };
        return { 
            local, 
            remote,
            connect,
            disconnect
        };

        async function sendOfferAsync(): Promise<void> {
            const offer = await local.createOffer();
            await local.setLocalDescription(offer);
            await negotiator.SendOffer(new RTCSessionDescription(offer));
        }
    
        async function  sendAnswerAsync(): Promise<void> {
            const answer = await remote.createAnswer();
            await local.setLocalDescription(answer);
            await negotiator.SendAnswer(new RTCSessionDescription(answer));
        }
    }
}
