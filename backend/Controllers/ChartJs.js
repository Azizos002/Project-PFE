const mongoose = require('mongoose');
const Tax = require('../models/Dashboard/Tax'); // Adjust the path as needed
const Housing = require('../models/Dashboard/Housing'); // Adjust the path as needed
const Clothing = require('../models/Dashboard/Clothing');
const Food = require('../models/Dashboard/Food');
const Medical = require('../models/Dashboard/Medical');
const Personal = require('../models/Dashboard/Personal');
const Saving = require('../models/Dashboard/Saving');
const Others = require('../models/Dashboard/Others');




// Controller method to get the total of amounts for the authenticated user
exports.ChartFetch = async (req, res) => {
    const userId = req.user.id; // Extract userId from req.user set by the auth middleware
    const uid = mongoose.Types.ObjectId.createFromHexString(userId);
    const totalResult = [];
    try {
        const result = await Tax.aggregate([
            { $match: { userId: uid  } }, // Correct usage of mongoose.Types.ObjectId
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        totalResult.push({category: 'tax', total: result.length > 0 ? result[0].total : 0});

        const result2 = await Housing.aggregate([
            { $match: { userId: uid  } }, // Correct usage of mongoose.Types.ObjectId
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        totalResult.push({category: 'housing', total: result2.length > 0 ? result2[0].total : 0});

        const result3 = await Clothing.aggregate([
            { $match: { userId: uid  } }, // Correct usage of mongoose.Types.ObjectId
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        totalResult.push({category: 'clothing', total: result3.length > 0 ? result3[0].total : 0});

        const result4 = await Food.aggregate([
            { $match: { userId: uid  } }, // Correct usage of mongoose.Types.ObjectId
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        totalResult.push({category: 'food', total: result4.length > 0 ? result4[0].total : 0});
        
        const result5 = await Medical.aggregate([
            { $match: { userId: uid  } }, // Correct usage of mongoose.Types.ObjectId
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        totalResult.push({category: 'medical', total: result5.length > 0 ? result5[0].total : 0});

        const result6 = await Personal.aggregate([
            { $match: { userId: uid  } }, // Correct usage of mongoose.Types.ObjectId
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        totalResult.push({category: 'personal', total: result6.length > 0 ? result6[0].total : 0});
        
        const result7 = await Saving.aggregate([
            { $match: { userId: uid  } }, // Correct usage of mongoose.Types.ObjectId
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        totalResult.push({category: 'saving', total: result7.length > 0 ? result7[0].total : 0});
        
        const result8 = await Others.aggregate([
            { $match: { userId: uid  } }, // Correct usage of mongoose.Types.ObjectId
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        totalResult.push({category: 'others', total: result8.length > 0 ? result8[0].total : 0});

        res.status(200).json(totalResult);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
