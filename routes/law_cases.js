const express = require('express')
const router = express.Router()
const Lawcase  = require('../models/law_case')
const Customer  = require('../models/customer')
const Courthearing  = require('../models/courthearing')

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
        const courthearings = await Courthearing.find({}).populate('lawcase')
        const lawcases = await Lawcase.find({}).populate('customer')

        res.render('lawcases/index', {
            courthearings: courthearings,
            lawcases: lawcases
            
           
         }) 
         console.log()
    } catch(e) {
        console.log
        
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

router.get('/:id', async (req, res) => {

    try {
      const lawcase = await Lawcase.findById(req.params.id).populate('customer')
      const courthearings = await Courthearing.find({ lawcase: lawcase.id})
      res.render('lawcases/show', {
        courthearings: courthearings,
        lawcase: lawcase
  
      })
  
    } catch {
  
      res.redirect('/')
    }
  })

module.exports = router