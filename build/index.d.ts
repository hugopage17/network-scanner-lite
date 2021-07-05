import Host from './interfaces/host';
import { Network } from './interfaces/network';
import { IPScanResponse } from './interfaces/ip-scan-response';
declare class NetworkScannerLite {
    repeat: number;
    timeout: number;
    constructor();
    get pollCount(): number;
    set pollCount(n: number);
    get timeoutInterval(): number;
    set timeoutInterval(n: number);
    ping(host: Host, repeat?: number): Promise<import("./interfaces/poll-response").Response>;
    clusterPing(hosts: Host[]): Promise<import("./interfaces/poll-response").Response[]>;
    globalPing(networks: Network[]): Promise<import("./interfaces/poll-response").NetworkResponse[]>;
    ipScan(range: string): Promise<IPScanResponse[]>;
}
export default NetworkScannerLite;
