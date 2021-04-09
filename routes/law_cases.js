const express = require('express')
const router = express.Router()
const Lawcase  = require('../models/law_case')
const Customer  = require('../models/customer')

// // All Customers Route
// router.get('/new', async (req, res) => {
//     let searchOptions = {}
//     if (req.query.civialIDNumber
//         != null && req.query.civialIDNumber
//         !== '') {
//       searchOptions.civialIDNumber
//       = new RegExp(req.query.civialIDNumber
//         , 'i')
//     }
//     try {
//       const customers = await Customer.find(searchOptions)
//       res.render('lawcases/new', {
//         customers: customers,
//         searchOptions: req.query
//       })
//     } catch {
//       res.redirect('/')
//     }
//   })


 
// All Cas Route
router.get('/', async (req , res)=>{
    try {
        const lawcases = await Lawcase.find({}).populate('customer')
        res.render('lawcases/index', {
            lawcases: lawcases,
            
           
         }) 
         console.log()
    } catch {
        
        res.redirect('/')
    }
})

// New Case Route
router.get('/new', async (req, res) =>{
    try {
    const customers = await Customer.find({})
    const lawcase = new Lawcase()
    res.render('lawcases/new', { 
        customers: customers,
        lawcase: lawcase

     })
    } catch {
        res.redirect('lawcases')

    }
})

// Create Law Case Route
router.post('/', async (req, res) =>{
    const lawcase = new Lawcase({
        customer: req.body.customer,
        opponent: req.body.opponent,
        customerStatus: req.body.customerStatus,
        caseType: req.body.caseType,
        court: req.body.court
        
    })
    try {
        const newLawcase = await lawcase.save()
        // res.redirect(`clients/${newClient.id}`)
        res.redirect(`lawcases`)

    } catch {
        res.render('lawcases/new', {
          lawcase: lawcase,
           errorMessage: 'Error creating Client'
                          
            
        })
        

    }
})

module.exports = router