const express = require('express')
const router = express.Router()
const Customer  = require('../models/customer')

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

module.exports = router