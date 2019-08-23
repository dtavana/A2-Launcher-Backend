const SteamUser = require('steam-user');
const Gamedig = require('gamedig');

module.exports = {
    getServers: async(req, res) => {
        let serverList = [];
        const client = new SteamUser();
        client.logOn(); 
        client.on('loggedOn', async (details) => {
            client.getServerList('\\appid\\33930', 5000, (err, servers) => {
                for(let server of servers){
                    const { addr: address, name, players: currentPlayers, max_players: maxPlayers, gameport: gamePort} = server;
                    const ip = address.substr(0, address.indexOf(':'));
                    const queryPort = address.slice(address.lastIndexOf(':') + 1);
                    const currentServer = { ip, gamePort, queryPort, name, currentPlayers, maxPlayers };
                    serverList.push(currentServer);
                };
                client.logOff();
                res.status(200).send({data: serverList});
            });
        });
    },
    getServerInfo: async(req, res) => {
        const { ip, queryPort: port } = req.query;
        if (!ip) {
            return res.status(400).send({error: "No IP was provided in the server object"});
        }
        if (!port) { 
            return res.status(400).send({error: "No query port was provided in the server object"});
        }
        const queryPort = parseInt(port);
        const state = await Gamedig.query({
            type: 'arma2oa',
            host: ip,
            port: queryPort
        });
        const { map, password, players, ping, connect: connectionString, raw: data } = state;
        let modString = "";
        for(let entry of Object.entries(data.rules)) {
            let key = entry[0];
            let value = entry[1];
            if(key.includes("modNames")) {
                modString += value;
            }
        }
        const result = { map, password, players, ping, connectionString, modString};
        res.status(200).send({data: result});
    },
}