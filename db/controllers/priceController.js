const key = require('../../server/config/config.js').X_Mashape_Key;
const rp = require('request-promise');
const cheerio = require('cheerio');

const APIURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/visualizePriceEstimator';

module.exports = {
  getPriceBreakdown: (req, res) => {
    const ingredients = req.params.ingredients;
    const options = {
      method: 'POST',
      uri: APIURL,
      headers: {
        'X-Mashape-Key': key,
        Accept: 'text/html',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        defaultCss: 'false',
        ingredientList: ingredients,
        mode: '2',
        servings: '1',
        showBacklink: 'true',
      },
      json: true,
    };

    rp(options)
      .then((body) => {
        const prices = cheerio.load(body).html('#spoonacular-price-estimator-script');
        const start = prices.search('dataPoints') + 12;
        let end = start;
        while (prices[end] !== ']') { end += 1; }
        const dataPoints = prices.substring(start, end + 1);
        const pricesArray = [];
        let counter = 0;
        for (let i = 0; i < dataPoints.length; i += 1) {
          if (dataPoints.substring(i, i + 2) === 'y:') {
            let amount = '';
            let j = i + 3;
            while (dataPoints[j + 1] !== ',') {
              amount = amount.concat(dataPoints[j]);
              j += 1;
            }
            let value = Number(amount);
            value /= 100.0;
            pricesArray.push({ price: value });
            counter += 1;
          }
          if (dataPoints.substring(i, i + 11) === 'indexLabel:') {
            let label = '';
            let j = i + 12;
            while (dataPoints[j + 1] !== '}') {
              label = label.concat(dataPoints[j]);
              j += 1;
            }
            pricesArray[counter - 1].text = label;
          }
        }
        res.json(pricesArray);
      })
      .catch(() => {
        res.status(404).end('Failed to get prices from Spoonacular API');
      });
  },
};
