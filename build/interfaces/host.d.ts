export default interface Host {
    name?: string;
    ipAddress: string;
    coordinates?: {
        lat: string;
        long: string;
    };
}
