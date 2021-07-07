import { HostInterface } from "./host-interface"

export interface Response {
    name:string,
    inputHost:string,
    host:string,
    alive:boolean,
    output:string,
    time:number,
    times?:number[],
    min:string,
    max:string,
    avg:string,
    stddev:string,
    packetLoss?:string,
    numeric_host:string,
    interfaces?:HostInterface[]
    coordinates:{
        lat:string,
        long:string
    },
}

export interface NetworkResponse {
    networkName: string,
    nodes: Response[]
};
