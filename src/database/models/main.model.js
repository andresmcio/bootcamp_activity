const fetch = require('node-fetch');
const {MongoClient} = require('mongodb');

module.exports = {
    getAll: async () => {
        try {
            const baseURL = 'https://rickandmortyapi.com/api/character';
            const response = await fetch(baseURL);
            const results = await response.json();
            const data = results.results;
            let characters = data.map((character) => Object({
                id: character.id,
                name: character.name,
                status: character.status,
                species: character.species,
                gender: character.gender,
                image: character.image,
                url: character.url,
            }));
            for(let i = 2; i <= results.info.pages; i++) {
                let nextChars = await fetch(`${baseURL}/?page=${i}`);
                let newResponse = await nextChars.json();
                let newResults = newResponse.results;
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
            const uri = 'mongodb://localhost:27017/';
            MongoClient.connect(uri, {useUnifiedTopology: true}, (err, db) => {
                if(err){
                    throw err;
                } else {
                    let dbo = db.db('rick_and_morty');
                    const insertResult = dbo.collection('characters').insertMany(characters)
                    .then(result => {
                        console.log(`${result.insertedCount} documents were inserted`);
                    });
                    return insertResult;
                };
                });
        } catch (error) {
            console.log(error);
        }
    },
    findAll: async () => {
        try{
            const uri = 'mongodb://localhost:27017/';
            MongoClient.connect(uri, {useUnifiedTopology: true}, (err, db) => {
                if(err){
                    throw err;
                } else {
                    let dbo = db.db('rick_and_morty');
                    const characters = dbo.collection('characters').find({}).toArray()
                    .then((characters) => {
                        const successMsg = `${characters.length} documents were found`;
                        console.log(successMsg);
                        console.log(characters);
                    });
                    return characters;
                }
                
            });
        } catch (error) {
            console.log(error);
        }
    },
    getByName: async (name) => {
        try{
            const uri = 'mongodb://localhost:27017/';
            MongoClient.connect(uri, {useUnifiedTopology: true}, (err, db) => {
                if(err){
                    throw err;
                } else {
                    let dbo = db.db('rick_and_morty');
                    const characters = dbo.collection('characters').find({name : name }).toArray()
                    .then((characters) => {
                        const successMsg = `${characters.length} documents were found`;
                        console.log(successMsg);
                        console.log(characters);
                    });
                    return characters;
                }
                
            });
        } catch (error) {
            console.log(error);
        }
    },
    findById: async (id) => {
        try{
            const uri = 'mongodb://localhost:27017/';
            MongoClient.connect(uri, {useUnifiedTopology: true}, (err, db) => {
                if(err){
                    throw err;
                } else {
                    let dbo = db.db('rick_and_morty');
                    const characters = dbo.collection('characters').find({id : id }).toArray()
                    .then((characters) => {
                        const successMsg = `${characters.length} documents were found`;
                        console.log(successMsg);
                        console.log(characters);
                    });
                    return characters;
                }
                
            });
        } catch (error) {
            console.log(error);
        }
    }
}