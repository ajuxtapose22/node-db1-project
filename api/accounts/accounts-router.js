const router = require('express').Router()
const md = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC 
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
   } catch (err) {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
 res.json(req.account)
})


router.post(
  '/',
  md.checkAccountPayload, 
  md.checkAccountNameUnique,  // Ensure this is here
  async (req, res, next) => {
    try {
      const newAccount = await Account.create(req.body); // Call the create function
      res.status(201).json(newAccount); // Return the newly created account
    } catch (err) {
      next(err);
    }
  }
);


router.put('/:id',
  md.checkAccountId,
  md.checkAccountPayload, 
  md.checkAccountNameUnique,
  async (req, res, next) => {

  try {
    const updatedAccount = await Account.updateById(req.params.id, req.body)
    res.json(updatedAccount)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.status(200).json({ message: 'Account deleted' })
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
res.status(err.status || 500).json({
  message: err.message,
})
})

module.exports = router;
