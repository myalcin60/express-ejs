import connection from '../config/db.config.js'


const findAll = async () => {
    try {
        const SELECT = "Select * from personnes"
        const resultat = await connection.query(SELECT)
        return resultat[0];
    } catch (err) {
        console.log(err);
        return null;
    }

}

const save = async (personne) => {
    try {
        const INSERT = "INSERT INTO personnes values (null, ?, ?, ?)"
        const resultat = await connection.query(INSERT, [personne.nom, personne.prenom, personne.age]);
        personne.id = resultat[0].insertId
        return personne;
    } catch (error) {
        console.log(err);
        return null;
    }
}

const deleteById = async (id) => {
    try {
        const DELETE = "DELETE FROM personnes WHERE id=?"
        await connection.query(DELETE, id)
        return true;
    } catch (error) {
        console.log(err);
        return null;
    }
}

const update = async (nom, prenom, age, id) => {   
    try {
        const UPDATE = "UPDATE personnes SET nom = ?, prenom=?, age=? WHERE id = ?"
        const resultat = await connection.query(UPDATE, [nom, prenom, age, id]);
        if (resultat[0].affectedRows >0) {
            return personne;
        }

    } catch (error) {
        console.log(err);    
    }
    return null;

}

const findById = async (id) => {
    try {
        const SELECT = "Select * from personnes where id =? "
        const resultat = await connection.query(SELECT, id)
        return resultat[0][0];

    } catch (err) {
        console.log(err);
        return null;
    }
}


// pour la teste
// findById(200).then(console.log)  

export default { findAll, save, deleteById, update, findById };