const Housing = require('../../../models/Dashboard/Housing')

// Controller function to create a new housnig entry
exports.createHousing = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const newHousing = await Housing.create({ userId, ...req.body  });
  
      res.status(201).json(newHousing);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get all Housing entries for a user
exports.getAllHousing = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const allHousing = await Housing.find({ userId }).select('description amount frequency');
      res.status(200).json(allHousing);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to update an existing income entry
exports.updateHousing = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const updatedHousing = await Housing.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );
      
      if (!updatedHousing) {
        return res.status(404).json({ message: 'Housing entry not found' });
      }
      
      res.status(200).json(updatedHousing);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Controller function to delete an existing income entry
exports.deleteHousing = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const deletedHousing = await Housing.findOneAndDelete({ _id: req.params.id, userId });
      
      if (!deletedHousing) {
        return res.status(404).json({ message: 'Housing entry not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controller function to get a specific income entry by ID
// exports.getHousingById = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const housing = await Housing.findOne({ _id: req.params.id, userId });

//     if (!housing) {
//       return res.status(404).json({ message: 'Housing entry not found' });
//     }

//     res.status(200).json(housing);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };