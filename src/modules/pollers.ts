import ping from 'ping';
import Host from '../interfaces/host';
import { Response } from '../interfaces/poll-response';
import { NetworkResponse } from '../interfaces/poll-response';
import { Network } from '../interfaces/network';

const poll = async(host: Host, repeat:number, timeout:number): Promise<Response> => {
    const pollData = await ping.promise.probe(host.ipAddress, {min_reply:repeat, timeout:timeout});
    return {
        name:host.name,
        coordinates:{
            lat:host.coordinates?.lat,
            long:host.coordinates?.long
        },
        ...pollData
    } as Response;
};

const clusterPoll = async(hosts: Host[], repeat:number, timeout:number): Promise<Response[]> => {
    const response = await Promise.all(hosts.map(async(host) => {
        try{
            const node = await poll(host, repeat, timeout);
            return node;
        }catch(err){
          throw err as Error;
        };
    }));
    return response as Response[];
};

const globalPoll = async(networks:Network[], repeat:number, timeout:number): Promise<NetworkResponse[]> => {
    const response = await Promise.all(networks.map(async(network) => {
        if(network.nodes){
            const nodes = await clusterPoll(network.nodes, repeat, timeout);
            return {networkName:network.network_name, nodes};
        }  
    }));
    return response as NetworkResponse[];
};

export { poll, clusterPoll, globalPoll };
