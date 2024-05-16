// totalMonthlyController.js
const TotalMonthly = require('../../../models/Dashboard/TotalMonthly.js');


exports.saveOrUpdateTotal = async (req, res) => {
    const { total, category } = req.body;
    const userId = req.user.id;

    try {
        const query = { userId, category };
        const update = { total };
        const options = { upsert: true, new: true };

        const result = await TotalMonthly.findOneAndUpdate(query, update, options);
        
        if (result) {
            console.log(result._id ?  `'MAJ : '${category}` : `'CREATE : '${category}`);
            res.status(200).send(result._id ? 'Total updated successfully' : 'Total created successfully');
        } else {
            res.status(500).send('Failed to save or update total');
        }
    } catch (error) {
        console.error('Error saving or updating total:', error);
        res.status(500).send('Server error');
    }
};

// fetch data from DB
exports.fetchTotal = async (req, res) => {

    try {
        const userId = req.user.id;

        const getAllCategory = await TotalMonthly.find({ userId }).select('category total');
        res.json(getAllCategory);
    } catch (error) {
        console.error('Error fetching Total monthly: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};