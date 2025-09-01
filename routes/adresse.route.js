import express from 'express'
// ici, on gère les routes relatives  aux adresses
const router = express.Router()

router.get('/', (req, res) => {
 console.log("adresse");
    res.end("adresse");
})
router.post('/', (req, res) => {

})

export default router