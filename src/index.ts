import { poll, clusterPoll, globalPoll } from './modules/pollers';
import Host from './interfaces/host';
import { Network } from './interfaces/network';
import { getRange } from './modules/get-range';
import { IPScanResponse } from './interfaces/ip-scan-response';
import { sshClient } from './modules/ssh-client';

class NetworkScannerLite {
    repeat: number;
    timeout: number;
    constructor(){
        this.repeat = 5;
        this.timeout = 3;
    };

    get pollCount(){ return this.repeat; };
    set pollCount(n:number){ this.repeat = n; };

    get timeoutInterval(){ return this.timeout; };
    set timeoutInterval(n:number){ this.timeout = n; };

    async ping(host:Host, repeat?:number){
        if(!repeat){
            repeat = 1;
        };
        const ping = await poll(host, repeat, this.timeout);
        return ping;
    };

    async clusterPing(hosts:Host[]){
        const poll = await clusterPoll(hosts, this.repeat, this.timeout);
        return poll;
    };

    async globalPing(networks:Network[]){
        const res = await globalPoll(networks, this.repeat, this.timeout);
        return res;
    };

    async ipScan(range:string): Promise<IPScanResponse[]>{
        const response = await Promise.all(getRange(range).map(async(ipAddress:string) => {
            try{
                const { alive, numeric_host } = await this.ping({ipAddress});
                return { alive, numeric_host };
            }catch(err){
                throw err as Error;
            }
        }));
        return response as IPScanResponse[];
    };

    async ssh(host:string, username:string, command:string, identity?:string): Promise<any>{
        const client = await sshClient(host, username, command, identity);
        return client;
    };
};

export default NetworkScannerLite;
