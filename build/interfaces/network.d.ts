import Host from './host';
export interface Network {
    network_name: string;
    nodes?: Host[];
}
