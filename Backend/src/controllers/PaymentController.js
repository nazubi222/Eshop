dotenv = require('dotenv');

dotenv.config()

const getId = async (req, res) => {
    try {
        return res.status(200).json({
          status: 'OK',
          data:process.env.CLIENT_ID
        })
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
  }

  module.exports = {
    getId
  }