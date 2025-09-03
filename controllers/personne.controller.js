import yup from 'yup'
import { setLocale } from 'yup'
import { fr } from 'yup-locales'
import connection from '../config/db.js'

// configuer yup
setLocale(fr)

const personneSchema = yup.object().shape({
    nom: yup
        .string()
        .required()
        .matches(/^[A-Z]{1}.{2,19}$/, "Le nom doit commencer par une majuscule et comporter entre 3 et 20 lettres"),
    prenom: yup
        .string()
        .min(3, (args) => `Le prénom doit contenir au moins ${args.min} caractéres, valeur saisie : ${args.value}`)
        .max(20),
    age: yup
        .number()
        .required()
        .positive()
})


const showPersonnes = async (req, res, next) => {
    const SELECT = "Select * from personnes"
    try {
        const resultat = await connection.query(SELECT)
        if (resultat[0].length >= 0) {
            res.render('personne', {
                personnes: resultat[0],
                erreurs: null
            })
        }
    } catch (error) {
        res.render('personne', {
            personnes: [],
            erreurs: null
        })
    }
}

const addPersonne = (req, res, next) => {

    personneSchema
        .validate(req.body, { abortEarly: false })
        .then(async () => {
            req.session.firstname = req.body.prenom
            const INSERT = "INSERT INTO personnes values (null, ?, ?, ?)"
            try {
                await connection.query(INSERT, [req.body.nom, req.body.prenom, req.body.age])
            } catch (error) {
                res.render('personne', {
                    erreurs: error,
                    personnes: [] // à refaire après l'ajout de PersonneRepository
                })
            }
            res.redirect('/personne')
        })
        .catch(err => {
            console.log(err);
            res.render('personne', {
                erreurs: err.errors,
                personnes: [] // à refaire après l'ajout de PersonneRepository
            })
        })
}

const deletePersonne = async (req, res, next) => {
    const id = req.params.id
    const DELETE = "DELETE FROM personnes WHERE id=?"
    try {
        await connection.query(DELETE, id)
        res.redirect('/personne')
    }
    catch (error) {
        res.render('personne', {
            personnes: [],
            erreurs: ['Probleme de supression de donnes']
        })
    }
}

export default { showPersonnes, addPersonne, deletePersonne }

