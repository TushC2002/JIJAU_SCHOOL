const Admin = require('../models/Admin');

const adminController = {
  adminLogin: (req, res) => {
    const { email, password } = req.body;

    Admin.findOne({ email, password }, (err, admin) => {
      if (err) {
        res.status(500).json({ Error: 'Internal Server Error' });
      } else if (admin) {
        res.json({ loginStatus: true });
      } else {
        res.json({ loginStatus: false, Error: 'Invalid credentials' });
      }
    });
  },
};

module.exports = adminController;
