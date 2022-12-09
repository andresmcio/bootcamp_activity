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
    /* findBYName: async (req, res) => {
        const name = req.params.name;
        let character = await getByName(name);

        if(!character) {
            return res.status(404).json({ message: 'Character not found' });
        } else {
            return res.status(200).json(character);
        }
    },
    updateStatus: async (req, res) => {
        const id = req.params.id;
        const status = req.params.status;
        
        if(!id || !status) {
            return res.status(400).json({ message: 'id and status are required' });
        } else {
            const search = await findById(id);
            if(!search) {
                return res.status(404).json({ message: 'Character not found' });
            } else {
                const character = search[0].updateOne({ status: status });
                return res.status(200).json(character);
            }
        }
    },
    deleteCharacter: async (req, res) => {
        const id = req.params.id;
        
        if(!id) {
            return res.status(400).json({ message: 'an id is required' });
        } else {
            const search = await findById(id);
            if(!search) {
                return res.status(204).json({ message: 'Character not found' });
            } else {
                const character = search[0].deleteMany({ id : id });
                return res.status(200).json(character);
            }
        }
    }, */
}