const personnes = [
    { id: 1, nom: "Wick", prenom: "John", age: 45 },
    { id: 2, nom: "Dalton", prenom: "Jack", age: 55 },
    { id: 3, nom: "Maggio", prenom: "Sophie", age: 33 },
]

const showPersonnes = (req, res, next) => {
    res.render('personne', {
        personnes
    })
}
const addPersonne = (req, res, next) => {
    personnes.push(req.body)
    req.session.firstname = req.body.prenom
    res.redirect('/personne')

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

