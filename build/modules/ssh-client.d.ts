declare const sshClient: (host: string, username: string, command: string, identity?: string | undefined) => Promise<any>;
export { sshClient };
