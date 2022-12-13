const { getAll, getByName, findById, findAll } = require('../database/models/main.model');

module.exports = {
    findAll: async (req, res) => {
        const characters = await findAll();
        
        return res.status(200).json(characters);
    },
    loadData: async (req, res) => {
        const characters = await getAll();
        
        return res.status(200).json(characters);
    },
    findBYName: async (req, res) => {
        const name = req.query.name;
        let character = await getByName(name);
        if(!character) {
            return res.status(404).json({ message: 'Character not found' });
        } else {
            return res.status(200).json(character);
        }
    },
    updateStatus: async (req, res) => {
        const id = req.query.id;
        const status = req.query.status;
        
        if(!id || !status) {
            return res.status(400).json({ message: 'id and status are required' });
        } else {
            const search = await findById(id);
            if(!search) {
                return res.status(404).json({ message: 'Character not found' });
            } else {
                const character = await search[0].updateOne({ status : status });
                console.log(`Character updated: ${character}`);
                return res.status(200).json({message : 'Character updated'});
            }
        }
    },
    deleteCharacter: async (req, res) => {
        const id = req.query.id;
        
        if(!id) {
            return res.status(400).json({ message: 'a character is required' });
        } else {
            const search = await findById(id);
            if(!search) {
                return res.status(204).json({ message: 'Character not found' });
            } else {
                const character = await search[0].deleteMany({ id : id });
                console.log(`Character deleted: ${character}`);
                return res.status(200).json({message : 'Character deleted'});
            } 
        }
    },
}