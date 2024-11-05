import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Secret
const EXPRESS_SECRET = process.env.EXPRESS_SECRET;

// Auth
app.use((req, res, next) => {
    const token = req.header('X-API-Key');
    if (token !== EXPRESS_SECRET) {
        return res.status(401).json({ error: 'Acceso no autorizado' });
    }
    next();
});

// import database
import User from "./models/users.js";

// import discord js
import { Client, GatewayIntentBits } from 'discord.js';

// import config 
import 'dotenv/config'

const token = process.env.token;

import qs from 'querystring';

// Plan API
const baseUrl = process.env.plan_baseUrl;
const loginUrl = `${baseUrl}/auth/login`;
const serverPlayerUrl = `${baseUrl}/v1/players`;

const credentials = {
    user: process.env.plan_user,
    password: process.env.plan_password
};



const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

async function getGuild(client, guildId) {
    return await client.guilds.cache.get(guildId) || "error";
}
async function fetchMembers(guild) {
    const guildMembers = await getMembers(guild);
    // filter members with role id
    const filteredMembers = guildMembers.filter(member => member.roles.cache.has('1011223459923238943'));
    console.log(guild.name + ' has ' + filteredMembers.length + ' members with role');
    return filteredMembers;
}
function getMembers(guild) {
    // get all members and return them
    return guild.members.fetch()
        .then(data => {
            const membersArray = Array.from(data.values());
            return membersArray;
        })
        .catch(console.error)
}
client.login(token);

app.get('/', async(req, res) => {
    let planPlayers = await loginAndFetch()
    let members = await fetchMembers(await getGuild(client, process.env.guildId));
    
    const players = []
    
    await Promise.all(members.map(async member => {
        const user = await User.findOne({ where: { id: member.user.id } });
        if (user) {       
            const player = {}
            const playerData = planPlayers.data.filter(player => player.name.match(/<a.*?>(.*?)<\/a>/)[1] === user.minecraftName)[0]
            if (playerData) {
                player.id = member.user.id
                player.minecraftName = user.minecraftName;
                player.activePlaytime = playerData?.activePlaytime.v || "-"
                player.activityIndex = playerData?.index.v || "-"
                player.registered = playerData?.registered.v || "-"
                player.primaryGroup = playerData?.primaryGroup.v || "-"
                player.geolocation = playerData?.geolocation || "-"
                players.push(player)
            }
        }
    }));

    res.send(players.map(player => ({
        id: player.id,
        displayName: player.minecraftName,
        activePlaytime: player.activePlaytime,
        activityIndex: player.activityIndex,
        registered: player.registered,
        primaryGroup: player.primaryGroup,
        geolocation: player.geolocation
    })));
})


const port = 8080;
app.listen(port, () => {
    console.log('Listening on port ' + port);
})

async function loginAndFetch() {
    try {
        const loginResponse = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify(credentials),
            redirect: 'manual'
        });

        if (!loginResponse.ok) {
            throw new Error(`Error en login: ${loginResponse.statusText}`);
        }

        const cookies = loginResponse.headers.get('set-cookie');

        // Extraer la cookie de autenticación
        const authCookie = cookies.split(';')[0];

        // Realizar una solicitud GET
        const getResponse = await fetch(serverPlayerUrl + "?server=1", {
            method: 'GET',
            headers: {
                'Cookie': authCookie,
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        if (!getResponse.ok) {
            const responseText = await getResponse.text();
            console.log('Contenido de la respuesta de error:', responseText);
            throw new Error(`Error en la solicitud GET: ${getResponse.statusText}`);
        }

        const data = await getResponse.json();
        // console.log('Respuesta de la solicitud GET:', data);
        return data;

    } catch (error) {
        console.error('Error:', error.message);
    }
}