const convert = require('xml-js');
const axios = require('axios');
require('dotenv').config();

class BookController {
  static read(req, res){
    axios.get(`https://www.goodreads.com/search.xml?key=${process.env.GOODREAD_API}&q=${req.query.q}`)
      .then(({data}) => {
        let xml = data;
        let result1 = JSON.parse(convert.xml2json(xml, {compact: true, spaces: 4}));
        res.status(200).json(result1);
      })
      .catch(({data}) => {
        res.status(500).json({err: data.err});
      })
  }
}

module.exports = BookController;