import SSH2Promise from 'ssh2-promise';

const sshClient = async(host:string, username:string, command:string, identity?:string): Promise<any> => {
    const sshconfig = { host, username, identity };
    const ssh = new SSH2Promise(sshconfig);
    await ssh.connect();
    const executeCommand = await ssh.exec(command);
    return executeCommand;
};

export { sshClient };
