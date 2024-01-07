const admin = require('firebase-admin');
const fs = require('fs');
const pdf = require('pdfkit');

// Inicialize o Firebase Admin SDK com suas credenciais de serviço
const serviceAccount = require('./keyfire.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://seu-projeto.firebaseio.com'
});

const db = admin.firestore();

async function exportCollectionToTXT() {
  try {
    const collectionRef = db.collection('bookings'); // Alterado para a coleção "bookings"
    const querySnapshot = await collectionRef.get();
    
    const data = [];
    querySnapshot.forEach((doc) => {
      const bookingData = doc.data();
      
      // Converter os campos de timestamp para datas legíveis
      bookingData.CheckInDate = new Date(bookingData.CheckInDate._seconds * 1000);
      bookingData.CheckOutDate = new Date(bookingData.CheckOutDate._seconds * 1000);
      
      data.push(bookingData);
    });
    
    // Converter os dados em formato TXT
    const txtData = JSON.stringify(data, null, 2);
    
    // Escrever os dados no arquivo TXT
    fs.writeFileSync('bookings.txt', txtData, 'utf-8');
    
    console.log('Exportação para TXT concluída com sucesso.');
  } catch (error) {
    console.error('Erro ao exportar para TXT:', error);
  }
}

async function exportCollectionToPDF() {
  try {
    const collectionRef = db.collection('bookings'); // Alterado para a coleção "bookings"
    const querySnapshot = await collectionRef.get();
    
    const data = [];
    querySnapshot.forEach((doc) => {
      const bookingData = doc.data();
      
      // Converter os campos de timestamp para datas legíveis
      bookingData.CheckInDate = new Date(bookingData.CheckInDate._seconds * 1000);
      bookingData.CheckOutDate = new Date(bookingData.CheckOutDate._seconds * 1000);
      
      data.push(bookingData);
    });
    
    // Criar um documento PDF
    const doc = new pdf();
    doc.pipe(fs.createWriteStream('bookings.pdf'));
    
    // Adicionar os dados ao PDF    
    doc.text(JSON.stringify(data, null, 2));
    
    // Finalizar o PDF
    doc.end();
    
    console.log('Exportação para PDF concluída com sucesso.');
  } catch (error) {
    console.error('Erro ao exportar para PDF:', error);
  }
}

// Chamar a função desejada para exportar para TXT ou PDF
exportCollectionToTXT();
exportCollectionToPDF();
