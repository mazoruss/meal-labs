const key = require('../../server/config/config.js').X_Mashape_Key;
const rp = require('request-promise');

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
      body: JSON.stringify({
        defaultCss: 'true',
        ingredientList: ingredients,
        mode: '2',
        servings: '1',
        showBacklink: 'false',
      }),
      json: true,
    };

    rp(options)
      .then((body) => {
        res.json(body);
      })
      .catch(() => {
        res.status(404).end('Failed to get prices from Spoonacular API');
      });
  },
};
