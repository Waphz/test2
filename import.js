const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const db = require('./firebaseConfig.js'); // Atualizado para usar o novo arquivo de configuração




// Função para obter URL de imagem aleatória
async function getRandomImageUrl() {
    // Usando Lorem Picsum para imagens aleatórias
    return 'https://picsum.photos/800/600';
  }
  

// Função para gerar dados fictícios para Properties
async function generateProperties() {
    const properties = [];
    for (let i = 0; i < 30; i++) {
      const imageUrl = await getRandomImageUrl(); // Obter imagem aleatória
      const property = {
      PropertyID: uuidv4(),
      Name: `Property ${i}`,
      Description: `Description for Property ${i}`,
      PropertyType: getRandomPropertyType(),
      Address: `Address ${i}, Lisbon`,
      City: 'Lisbon',
      Country: 'Portugal',
      MaxCapacity: getRandomInt(2, 10),
      Bedrooms: getRandomInt(1, 5),
      Bathrooms: getRandomInt(1, 3),
      Amenities: 'WiFi, Air Conditioning',
      Photos: imageUrl,
      HouseRules: 'No smoking. No pets.',
      CancellationPolicy: 'Flexible cancellation policy.'
    };
    properties.push(property);
  }
  return properties;
}

// Funções auxiliares
function getRandomPropertyType() {
  const types = ['Apartment', 'House', 'Villa'];
  return types[Math.floor(Math.random() * types.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateBookings(properties, users) {
    const bookings = [];
    for (let i = 0; i < 100; i++) {
      const booking = {
        BookingID: uuidv4(),
        PropertyID: properties[getRandomInt(0, properties.length - 1)].PropertyID,
        UserID: users[getRandomInt(0, users.length - 1)].UserID,
        CheckInDate: getRandomDate(new Date(2021, 0, 1), new Date()),
        CheckOutDate: getRandomDate(new Date(2021, 0, 1), new Date()),
        TotalPrice: getRandomInt(50, 500),
        Status: getRandomBookingStatus(),
        NumberOfGuests: getRandomInt(1, 5)
      };
      bookings.push(booking);
    }
    return bookings;
}
  
function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
  
function getRandomBookingStatus() {
    const statuses = ['Confirmed', 'Cancelled', 'Pending'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}
  
function generateUsers() {
    const users = [];
    for (let i = 0; i < 100; i++) {
      const user = {
        UserID: uuidv4(),
        Name: `User ${i}`,
        Email: `user${i}@example.com`,
        Phone: `+3519000000${i}`,
        // Outros campos conforme necessário
      };
      users.push(user);
    }
    return users;
}

function generateReviews(properties, users) {
    const reviews = [];
    for (let i = 0; i < 200; i++) {
      const review = {
        ReviewID: uuidv4(),
        PropertyID: properties[getRandomInt(0, properties.length - 1)].PropertyID,
        UserID: users[getRandomInt(0, users.length - 1)].UserID,
        Rating: getRandomInt(1, 5),
        Comment: `This is a review comment ${i}`,
        // Outros campos conforme necessário
      };
      reviews.push(review);
    }
    return reviews;
}
  
function generateCalendarAvailability(properties) {
    const availability = [];
    properties.forEach(property => {
      for (let i = 0; i < 365; i++) { // Exemplo para um ano
        const date = new Date();
        date.setDate(date.getDate() + i);
  
        const dayAvailability = {
          Date: date,
          PropertyID: property.PropertyID,
          Available: Math.random() > 0.5, // Disponibilidade aleatória
        };
        availability.push(dayAvailability);
      }
    });
    return availability;
  }

  
  function generateFinancialTransactions(bookings) {
    const transactions = [];
    bookings.forEach(booking => {
      const transaction = {
        TransactionID: uuidv4(),
        BookingID: booking.BookingID,
        Amount: booking.TotalPrice,
        Date: booking.CheckInDate,
        // Outros campos conforme necessário
      };
      transactions.push(transaction);
    });
    return transactions;
  }

  
  function generateMessages(users) {
    const messages = [];
    for (let i = 0; i < 500; i++) {
      const message = {
        MessageID: uuidv4(),
        UserID: users[getRandomInt(0, users.length - 1)].UserID,
        Text: `This is a message ${i}`,
        Date: new Date(),
        // Outros campos conforme necessário
      };
      messages.push(message);
    }
    return messages;
  }

  function generateMaintenanceServices(properties) {
    const services = [];
    properties.forEach(property => {
      const service = {
        ServiceID: uuidv4(),
        PropertyID: property.PropertyID,
        Description: `Maintenance service for PropertyID ${property.PropertyID}`,
        Date: new Date(),
        // Outros campos conforme necessário
      };
      services.push(service);
    });
    return services;
  }
  



// Função para importar dados para Firebase
async function importDataToFirebase() {
    const properties = await generateProperties();
    const users = generateUsers();
    const bookings = await generateBookings(properties, users);
    const reviews = generateReviews(properties, users);
    const availability = generateCalendarAvailability(properties);
    const transactions = generateFinancialTransactions(bookings);
    const messages = generateMessages(users);
    const services = generateMaintenanceServices(properties);
  
    // Importa propriedades
    for (const property of properties) {
      await db.collection('properties').add(property);
    }
  
    // Importa usuários
    for (const user of users) {
      await db.collection('users').add(user);
    }
  
    // Importa reservas
    for (const booking of bookings) {
      await db.collection('bookings').add(booking);
    }
  
    // Importa avaliações
    for (const review of reviews) {
      await db.collection('reviews').add(review);
    }
  
    // Importa disponibilidade de calendário
    for (const day of availability) {
      await db.collection('calendarAvailability').add(day);
    }
  
    // Importa transações financeiras
    for (const transaction of transactions) {
      await db.collection('financialTransactions').add(transaction);
    }
  
    // Importa mensagens
    for (const message of messages) {
      await db.collection('messages').add(message);
    }
  
    // Importa serviços de manutenção
    for (const service of services) {
      await db.collection('maintenanceServices').add(service);
    }
  }
  
  importDataToFirebase();
  