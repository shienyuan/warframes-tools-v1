import firebase from 'firebase/app';

class ClanModel {
    constructor() {}

    col = process.env.GRIDSOME_CLAN_COL;
    db = firebase.firestore().collection(this.col);

    async create(data) {
        await this.db.add(data);
    }

    async getAll() {
        const snap = await this.db.get();
        return snap.docs.map(doc => doc.data());
    }
}

export default new ClanModel();

// db.collection("users").add({
// 	first: "Ada",
// 	last: "Lovelace",
// 	born: 1815
// })
// 	.then(function(docRef) {
// 		console.log("Document written with ID: ", docRef.id);
// 	})
// 	.catch(function(error) {
// 		console.error("Error adding document: ", error);
// 	});
