const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const Income = require('../../models/Dashboard/Income')
const Tax = require('../../models/Dashboard/Tax')
const Housing = require('../../models/Dashboard/Housing')
const Medical = require('../../models/Dashboard/Medical')
const Clothing = require('../../models/Dashboard/Clothing');
const Food = require('../../models/Dashboard/Food')
const Personal = require('../../models/Dashboard/Personal')
const Others = require('../../models/Dashboard/Others')
const Saving = require('../../models/Dashboard/Saving')

exports.exportToCSV = async (req, res) => {
    try {
        const userId = req.user.id;

        const incomeData = await Income.find({userId});
        const taxData = await Tax.find({userId});
        const housingData = await Housing.find({userId});
        const medicalData = await Medical.find({userId});
        const clothingData = await Clothing.find({userId});
        const foodData = await Food.find({userId});
        const personalData = await Personal.find({userId});
        const othersData = await Others.find({userId});
        const savingData = await Saving.find({userId});

        // Create an array of objects where each object contains category name and its data
        const mergedData = [
            { category: 'Income', data: incomeData },
            { category: 'Tax', data: taxData },
            { category: 'Housing', data: housingData },
            { category: 'Medical', data: medicalData },
            { category: 'Clothing', data: clothingData },
            { category: 'Food', data: foodData },
            { category: 'Personal', data: personalData },
            { category: 'Others', data: othersData },
            { category: 'Saving', data: savingData }
        ];

        // Flatten the merged data to a single array with category names prefixed to each data row
        const flattenedData = [];
        mergedData.forEach(({ category, data }) => {
            if (flattenedData.length > 0) {
                // Add an empty row between categories
                flattenedData.push({});
            }
            data.forEach(item => {
                flattenedData.push({ category, ...item.toObject() });
            });
        });


        // Write flattened data to CSV
        const csvWriter = createCsvWriter({
            path: 'exported_data.csv',
            header: [
                { id: 'category', title: 'Category' },
                { id: 'description', title: 'Description' },
                { id: 'amount', title: 'Amount' },
                { id: 'frequency', title: 'Frequency' },
            ]
        });

        await csvWriter.writeRecords(flattenedData);

        // Send the CSV file as a response
        res.attachment('exported_data.csv');
        res.sendFile('exported_data.csv', { root: '.' });

    } catch (error) {
        console.error('Export error:', error);
        return res.status(500).send('Error exporting data');
    }
}
