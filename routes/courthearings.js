const express = require('express')
const router = express.Router()
const Courthearing  = require('../models/courthearing')
const Lawcase  = require('../models/law_case')
const Customer  = require('../models/customer')

// All Cas Route
router.get('/', async (req , res)=>{
    try {
        const lawcases = await Lawcase.find({}).populate('customer')
        const courthearing = new Courthearing()
        const courthearings = await Courthearing.find({}).populate({ 
            path: 'lawcase',
            populate: {
              path: 'customer',
              model: 'Customer'
            } 
         })
        res.render('courthearings/index', {
            courthearings: courthearings,
            lawcases: lawcases,
            courthearing: courthearing
            
           
         }) 
         console.log()
    } catch {
        
        res.redirect('/')
    }
})

// New Case Route
// router.get('/', async (req, res) =>{
//     try {
//     const lawcases = await Lawcase.find({})
//     const courthearing = new Courthearing()
//     res.render('courthearings/index', { 
//         lawcases: lawcases,
//         courthearing: courthearing

//      })
//     } catch {
//         res.redirect('courthearings')

//     }
// })

// Create Law Case Route
router.post('/', async (req, res) =>{
    const courthearing = new Courthearing({
        lawcase: req.body.lawcase,
        courtdate: req.body.courtdate,
        room: req.body.room
        
    })
    try {
        const newCourthearing = await courthearing.save()
        // res.redirect(`clients/${newClient.id}`)
        res.redirect(`courthearings`)

    } catch {
        res.render('courthearings/index', {
          courthearing: courthearing,
           errorMessage: 'Error creating Client'
                          
            
        })

    }
})

module.exports = router