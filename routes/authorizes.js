const express = require('express')
const router = express.Router()
const Authoriz  = require('../models/authoriz')
const Customer  = require('../models/customer')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

// All Cas Route
router.get('/', async (req , res)=>{
  try {
      const customers = await Customer.find({})
      const authoriz = new Authoriz()
      const authorizes = await Authoriz.find({}).populate({ 
            path: 'customer',
            populate: {
              path: 'customer',
              model: 'Customer'
            } 
         })
      res.render('authorizes/index', {
          authorizes: authorizes,
          customers: customers,
          authoriz: authoriz
          
         
       }) 
       
  } catch {
      
      res.redirect('/')
  }
})



// Create Law Case Route
router.post('/', async (req, res) =>{
  const customers = await Customer.find({})
  const authoriz = new Authoriz({
      customer: req.body.customer,
      authorizdate: req.body.authorizdate,
      
  })
  saveCover(authoriz, req.body.cover)
  try {
      const newAuthoriz = await authoriz.save()
      // res.redirect(`clients/${newClient.id}`)
      res.redirect(`authorizes`)

  } catch {
      res.render('authorizes/index', {
        customers: customers,
        authoriz: authoriz,
         errorMessage: 'Error creating Client'
                        
          
      })

  }
})

router.get('/:id', async (req, res) => {

  try {
    const authoriz = await Authoriz.findById(req.params.id)
    res.render('authorizes/show', {
      authoriz: authoriz

    })

  } catch {

    res.redirect('/')
  }
})
  

function saveCover(authoriz, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    authoriz.authorizImage = new Buffer.from(cover.data, 'base64')
    authoriz.authorizImageType = cover.type
  }
}

module.exports = router