const admin = require('firebase-admin');
const serviceAccount = require('./keyfire.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function deleteCollection(collectionPath) {
  const collectionRef = db.collection(collectionPath);
  const docs = await collectionRef.listDocuments();

  docs.forEach((doc) => doc.delete().then(() => {
    console.log(`Documento ${doc.id} da coleção ${collectionPath} excluído.`);
  }).catch((error) => {
    console.error(`Erro ao excluir o documento ${doc.id}:`, error);
  }));
}

async function deleteAllData() {
  const collections = ['tiposAlojamento', 'comodidades', 'funcionarios', 'usuarios', 'canais', 'plataformas', 'clientes', 'reservas', 'alojamentos', 'reservasFuturas', 'mensagens', 'reviews'];
  
  for (const collection of collections) {
    await deleteCollection(collection);
  }

  console.log('Todas as coleções foram excluídas.');
}

deleteAllData().catch(console.error);
