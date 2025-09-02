import yup from 'yup'
import { setLocale } from 'yup'
import { fr } from 'yup-locales'
// configuer yup
setLocale(fr)

const personneSchema = yup.object().shape({
    nom: yup
        .string()
        .required()
        .matches(/^[A-Z]{1}.{2,19}$/, "Le nom doit commencer par une majuscule et comporter entre 3 et 20 lettres"),
    prenom: yup
        .string()
        .min(3, (args)=> `Le prénom doit contenir au moins ${args.min} caractéres, valeur saisie : ${args.value}`)
        .max(20),
    age: yup
        .number()
        .required()
        .positive()
})


const personnes = [
    { id: 1, nom: "Wick", prenom: "John", age: 45 },
    { id: 2, nom: "Dalton", prenom: "Jack", age: 55 },
    { id: 3, nom: "Maggio", prenom: "Sophie", age: 33 },
]

const showPersonnes = (req, res, next) => {
    res.render('personne', {
        personnes,
        erreurs: null
    })
}
const addPersonne = (req, res, next) => {
    
    personneSchema
        .validate(req.body, { abortEarly: false })
        .then(() => {
            personnes.push(req.body)
            req.session.firstname = req.body.prenom
            res.redirect('/personne')
        })
        .catch(err => {
            res.render('personne', {
                erreurs: err.errors,
                personnes
            })
        })

    // console.log(req.body)
    //const { nom, prenom, age } = req.body
    // res.end(`Bonjour ${prenom} ${nom}, vous avez ${age} ans.`)

}
const deletePersonne = (req, res, next) => {
    const id = req.params.id
    const index = personnes.findIndex(p => p.id == id)
    if (index != -1) {
        personnes.splice(index, 1)
    } else {
        alert("Suppression impossible !")
    }
    res.redirect('/personne')

}

export default { showPersonnes, addPersonne, deletePersonne }

