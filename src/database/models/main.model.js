const axios = require('axios');
const {MongoClient} = require('mongodb');

const uri = 'mongodb://mongodb-container:27017/';
const client = new MongoClient(uri);

const dbName = 'rick_and_morty';

const db = client.db(dbName);
const collection = db.collection('characters');

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error(e);
    } 
    return db;
}

main().then(console.log).finally(() => client.close());

module.exports = {
    getAll: async () => {
        try {
            const baseURL = 'https://rickandmortyapi.com/api/character';
            const response = await axios.get(baseURL);
            let results = response.data.results;
            let characters = results.map((character) => Object({
                id: character.id,
                name: character.name,
                status: character.status,
                species: character.species,
                gender: character.gender,
                image: character.image,
                url: character.url,
            }));
            for(let i = 2; i <= response.data.info.pages; i++) {
                let nextChars = await axios.get(`${baseURL}/?page=${i}`);
                let newResults = nextChars.data.results;
                let newCharacters = newResults.map((character) => Object({
                    id: character.id,
                    name: character.name,
                    status: character.status,
                    species: character.species,
                    gender: character.gender,
                    image: character.image,
                    url: character.url,
                }));
                characters = characters.concat(newCharacters);
            }
            main();
            const insertResult = db.collection('characters').insertMany(characters);
            console.log(`${insertResult.insertedCount} documents were inserted`);
            return characters;
        } catch (error) {
            console.log(error);
        }
    },
    /* getByName: async (name) => {
        try{
            main();
            const character = await db.collection('characters').find({ name: name }).toArray();
            return character;
        } catch (error) {
            console.log(error);
        }
    },
    findById: async (id) => {
        try{
            main();
            const character = await db.collection('characters').find({ id: id }).toArray();
            return character;
        } catch (error) {
            console.log(error);
        }
    }, */
    findAll: async () => {
        try{
            main();
            const characters = await db.collection('characters').find({}).toArray();
            return characters;
        } catch (error) {
            console.log(error);
        }
    },
}