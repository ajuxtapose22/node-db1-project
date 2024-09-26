const Account = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
const error = { status: 400 }
const {name, budget} = req.body
if (name === undefined || budget === undefined) {
  error.message = "name and budget are required"
  } else if (typeof name !== 'string') {
  error.message = 'name of account must be a string'
  } else if (name.trim().length < 3 || name.trim().length > 100){
  error.message = 'name of account must be between 3 and 100'
  } else if (typeof budget !== 'number' || isNaN(budget)) {
  error.message = 'budget of account must be a number'
  } else if (budget < 0 || budget > 1000000) {
  error.message = 'budget of account is too large or too small'
}

if (error.message) {
 return next(error)
} else {
  next()
}
}


exports.checkAccountNameUnique = async (req, res, next) => {
  const name = req.body.name.trim().toLowerCase(); // Ensure to call toLowerCase()

  try {
    // Check for existing accounts with the same name
    const existing = await db('accounts')
      .where('name', name) // Check for the name directly
      .first(); // Get the first result

    // If an existing account is found
    if (existing) {
      // Return a 400 status with your custom message
      return res.status(400).json({ message: 'that name is taken' });
    } else {
      next(); // Proceed to the next middleware/handler
    }
  } catch (error) {
    next(error); // Handle any errors
  }
};






exports.checkAccountId = async (req, res, next) => {
  console.log('Checking account ID:', req.params.id); // Debug log

  try {
    const account = await Account.getById(req.params.id);
    if (!account) { // Changed the condition check to account directly
      return next({ 
        status: 404,
        message: "account not found"
      });
    } else {
      req.account = account;
      next();
    }
  } catch (error) {
    next(error);
  }
};

