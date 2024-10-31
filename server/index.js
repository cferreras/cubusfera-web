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
const guildId = process.env.guildId;
let planPlayers = {};
let discordGuild = ""

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

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
        console.error(`Guild with ID ${guildId} not found`);
    } else {
        console.info(`Guild ${guild.name} found`);
        discordGuild = guild;
        // fetch members every 4 hours
        setInterval(async () =>  members = await fetchMembers(guild), 4 * 60 * 60 * 1000);
        // fetch members on startup
        let members = await fetchMembers(guild);
    }
});

// Fetch JSON from plan api each 4 hours
setInterval(async () => {
    await loginAndFetch();
}, 4 * 60 * 60 * 1000);

await loginAndFetch();

//


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
    let members = await fetchMembers(discordGuild);
    console.log('Valor de members:', members);
    // Filter results by query
    // const q = req.query.q?.toLowerCase() || '';
    // const results = members.filter(
    //     member => member.user.displayName.toLowerCase().includes(q));
    // Search MinecraftName in database by id
    await Promise.all(members.map(async member => {
        const user = await User.findOne({ where: { id: member.user.id } });
        if (user) {
            // member.plan = await loginAndFetch(user.minecraftName);
            member.minecraftName = user.minecraftName;
            const playerData = planPlayers.data.filter(player => player.name.match(/<a.*?>(.*?)<\/a>/)[1] === member.minecraftName)[0]
            member.activePlaytime = playerData?.activePlaytime.v || "-"
            member.activityIndex = playerData?.index.v || "-"
            member.registered = playerData?.registered.v || "-"
            member.primaryGroup = playerData?.primaryGroup.v || "-"
            member.geolocation = playerData?.geolocation || "-"
        }
        return member;
    }));


    res.send(members.map(member => ({
        id: member.user.id,
        displayName: member.minecraftName,
        activePlaytime: member.activePlaytime,
        activityIndex: member.activityIndex,
        registered: member.registered,
        primaryGroup: member.primaryGroup,
        geolocation: member.geolocation
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
        planPlayers = data;

    } catch (error) {
        console.error('Error:', error.message);
    }
}