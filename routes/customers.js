const express = require('express')
const router = express.Router()
const Customer  = require('../models/customer')
const Lawcase = require('../models/law_case')

// All Clients Route
router.get('/', async (req , res)=>{
    try {
        const customers = await Customer.find({})
        res.render('customers/index', {customers: customers }) 
    } catch {
        res.redirect('/')
    }
})

// New Client Route
router.get('/new', (req, res) =>{
    res.render('customers/new', {customer: new Customer()})
})

// Create Cilent Route
router.post('/', async (req, res) =>{
    const customer = new Customer({
        name: req.body.name,
        civialIDNumber: req.body.civilid,
        phoneNumber: req.body.phone,
        email: req.body.email
        
    })
    try {
        const newCustomer = await customer.save()
        // res.redirect(`clients/${newClient.id}`)
        res.redirect(`customers`)

    } catch {
        res.render('customers/new', {
          customer: customer,
           errorMessage: 'Error creating Client'
                          
            
        })

    }
})


router.get('/:id', async (req, res) => {

    try {
      const customer = await Customer.findById(req.params.id)
      const lawcases = await Lawcase.find({ customer: customer.id}).populate('customer')
      res.render('customers/show', {
        lawcases: lawcases,
        customer: customer
  
      })
  
    } catch {
  
      res.redirect('/')
    }
  })

module.exports = router