import Host from '../interfaces/host';
import { Response } from '../interfaces/poll-response';
import { NetworkResponse } from '../interfaces/poll-response';
import { Network } from '../interfaces/network';
declare const poll: (host: Host, repeat: number, timeout: number) => Promise<Response>;
declare const clusterPoll: (hosts: Host[], repeat: number, timeout: number) => Promise<Response[]>;
declare const globalPoll: (networks: Network[], repeat: number, timeout: number) => Promise<NetworkResponse[]>;
export { poll, clusterPoll, globalPoll };
