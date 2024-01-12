const { v4: uuidv4 } = require('uuid');
const faker = require('faker');
const admin = require('firebase-admin');
const serviceAccount = require('./keyfire.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Função para criar a tabela Tipos de Alojamento
const criarTiposAlojamento = async () => {
  const tiposAlojamento = [
    { IDTipoAlojamento: uuidv4(), Descrição: "Apartamento" },
    { IDTipoAlojamento: uuidv4(), Descrição: "Villa" },
    { IDTipoAlojamento: uuidv4(), Descrição: "Penthouse" },
    { IDTipoAlojamento: uuidv4(), Descrição: "Casa de Campo" },
    { IDTipoAlojamento: uuidv4(), Descrição: "Estúdio" },
    { IDTipoAlojamento: uuidv4(), Descrição: "Bangalô" },
    { IDTipoAlojamento: uuidv4(), Descrição: "Chalé" }
  ];

  for (const tipo of tiposAlojamento) {
    await db.collection('tiposAlojamento').doc(tipo.IDTipoAlojamento).set(tipo);
  }

  return tiposAlojamento;
};

// Função para criar a tabela Comodidades
const criarComodidades = async () => {
  const comodidades = [
    { IDComodidade: uuidv4(), Nome: "Wifi" },
    { IDComodidade: uuidv4(), Nome: "Jacuzzi" },
    { IDComodidade: uuidv4(), Nome: "Grelhador" },
    { IDComodidade: uuidv4(), Nome: "Piscina" },
    { IDComodidade: uuidv4(), Nome: "Estacionamento" },
    { IDComodidade: uuidv4(), Nome: "Ar Condicionado" },
    { IDComodidade: uuidv4(), Nome: "TV" },
    { IDComodidade: uuidv4(), Nome: "Máquina de Lavar" },
    { IDComodidade: uuidv4(), Nome: "Secadora" },
    { IDComodidade: uuidv4(), Nome: "Cozinha Equipada" },
    { IDComodidade: uuidv4(), Nome: "Vista para o Mar" },
    { IDComodidade: uuidv4(), Nome: "Terraço" },
    { IDComodidade: uuidv4(), Nome: "Varanda" },
    { IDComodidade: uuidv4(), Nome: "Jardim" },
    { IDComodidade: uuidv4(), Nome: "Aquecimento Central" }
  ];

  for (const comodidade of comodidades) {
    await db.collection('comodidades').doc(comodidade.IDComodidade).set(comodidade);
  }

  return comodidades.map(comodidade => comodidade.IDComodidade);
};

// Função para criar a tabela Funcionários
const criarFuncionarios = async () => {
  const funcionarios = [
    { IDFuncionario: uuidv4(), Nome: "Funcionario1", HorarioTipo: "Horário Normal", Folgas: 2, Status: "ativo" },
    { IDFuncionario: uuidv4(), Nome: "Funcionario2", HorarioTipo: "Horário Flexível", Folgas: 1, Status: "ativo" },
    { IDFuncionario: uuidv4(), Nome: "Funcionario3", HorarioTipo: "Horário Noturno", Folgas: 3, Status: "ativo" },
    { IDFuncionario: uuidv4(), Nome: "Funcionario4", HorarioTipo: "Horário Normal", Folgas: 2, Status: "ativo" },
    { IDFuncionario: uuidv4(), Nome: "Funcionario5", HorarioTipo: "Horário Flexível", Folgas: 1, Status: "ativo" }
  ];

  for (const funcionario of funcionarios) {
    await db.collection('funcionarios').doc(funcionario.IDFuncionario).set(funcionario);
  }
};

// Função para criar a tabela Usuários
const criarUsuarios = async () => {
  const usuarios = [
    { IDUsuario: uuidv4(), Nome: "Admin", Email: "admin@example.com", NivelAcesso: "admin" },
    { IDUsuario: uuidv4(), Nome: "ReservationUser", Email: "reservation@example.com", NivelAcesso: "reservation" },
    { IDUsuario: uuidv4(), Nome: "CleaningUser", Email: "cleaning@example.com", NivelAcesso: "cleaning" }
  ];

  for (const usuario of usuarios) {
    await db.collection('usuarios').doc(usuario.IDUsuario).set(usuario);
  }

  return usuarios;
};
// Função para criar a tabela Canais e retornar os canais criados
const criarCanais = async () => {
  const canais = [
    { IDCanal: uuidv4(), Nome: "Airbnb" },
    { IDCanal: uuidv4(), Nome: "Booking" },
    { IDCanal: uuidv4(), Nome: "WhatsApp" },
    { IDCanal: uuidv4(), Nome: "SMS" },
    { IDCanal: uuidv4(), Nome: "Email" }
  ];

  for (const canal of canais) {
    await db.collection('canais').doc(canal.IDCanal).set(canal);
  }

  return canais.map(canal => canal.IDCanal);
};

const criarPlataformas = async () => {
  const plataformas = [
    { IDPlataforma: uuidv4(), Nome: "Airbnb" },
    { IDPlataforma: uuidv4(), Nome: "Booking" }
  ];

  for (const plataforma of plataformas) {
    await db.collection('plataformas').doc(plataforma.IDPlataforma).set(plataforma);
  }

  return plataformas.map(plataforma => plataforma.IDPlataforma);
};
// Função para criar a tabela Clientes
const criarClientes = async (idsCanais) => {
  const clientes = [];

  for (let i = 0; i < 100; i++) {
    const nacionalidade = faker.address.country();
    const telefone1 = faker.phone.phoneNumber();
    const telefone2 = faker.datatype.boolean() ? faker.phone.phoneNumber() : null;
    const numCanais = faker.datatype.number({ min: 2, max: 5 });
    const canaisCliente = [];

    for (let j = 0; j < numCanais; j++) {
      const canalCliente = faker.random.arrayElement(idsCanais);
      if (canalCliente) {
        canaisCliente.push(canalCliente);
      }
    }

    const cliente = {
      Nome: faker.name.findName(),
      IDCliente: uuidv4(),
      Email1: faker.internet.email(),
      Email2: faker.datatype.boolean() ? faker.internet.email() : null,
      Telefone1: telefone1,
      Telefone2: telefone2,
      Notas: faker.lorem.sentence(),
      Morada: faker.address.streetAddress(),
      Nacionalidade: nacionalidade,
      Canais: canaisCliente
    };

    clientes.push(cliente);
  }

  for (const cliente of clientes) {
    await db.collection('clientes').doc(cliente.IDCliente).set(cliente);
  }

  return clientes.map(cliente => cliente.IDCliente);
};
// Função para criar a tabela Reservas
const criarReservas = async (idsPlataformas, idsClientes, idsAlojamentos) => {
  const reservas = [];

  for (let i = 0; i < 100; i++) {
    const plataforma = faker.random.arrayElement(idsPlataformas);
    const idCliente = faker.random.arrayElement(idsClientes);
    const idAlojamento = faker.random.arrayElement(idsAlojamentos);
    const numHospedes = faker.datatype.number({ min: 1, max: 10 });
    const checkIn = faker.date.between("2023-01-01", "2023-12-31");
    const checkOut = faker.date.between(checkIn, "2023-12-31");
    const valor = faker.commerce.price(50, 500);
    const notas = faker.lorem.sentence();
    const status = faker.random.arrayElement(["cancelada", "concluida"]);

    const reserva = {
      IDReserva: uuidv4(),
      Plataforma: plataforma,
      IDCliente: idCliente,
      IDAlojamento: idAlojamento,
      NumHospedes: numHospedes,
      CheckIn: checkIn,
      CheckOut: checkOut,
      Valor: valor,
      Notas: notas,
      Status: status
    };

    reservas.push(reserva);
  }

  for (const reserva of reservas) {
    await db.collection('reservas').doc(reserva.IDReserva).set(reserva);
  }
  return reservas;
};
// Função para criar a tabela Alojamentos
const criarAlojamentos = async (tiposAlojamento, idsPlataformas, idsComodidades) => {
  const alojamentos = [];

  for (let i = 0; i < 10; i++) {
      const tipoAlojamento = faker.random.arrayElement(tiposAlojamento.map(t => t.IDTipoAlojamento));
      const plataforma = faker.random.arrayElement(idsPlataformas);
      const comodidadesSelecionadas = faker.random.arrayElements(idsComodidades, faker.datatype.number({ min: 5, max: 14 }));
      const numCamas = faker.datatype.number({ min: 1, max: 5 });
      const maxHospedes = faker.datatype.number({ min: numCamas, max: 10 });
      const morada = faker.address.streetAddress() + ', Lisboa, Portugal';

      const alojamento = {
        Nome: faker.address.streetName() + " " + faker.random.arrayElement(["Residence", "Place", "Villa", "Estate"]),
        IDAlojamento: uuidv4(),
        Morada: morada,
        Descrição: faker.lorem.paragraph(),
        Quartos: faker.datatype.number({ min: 1, max: 5 }),
        Camas: numCamas,
        MaxHospedes: maxHospedes,
        CasasBanho: faker.datatype.number({ min: 1, max: 3 }),
        PreçoVerao: faker.commerce.price(100, 500),
        PrecoInverno: faker.commerce.price(80, 400),
        Comodidades: comodidadesSelecionadas,
        Regras: faker.lorem.sentence(),
        Notas: faker.lorem.sentences(2),
        Fotos: [
          "https://source.unsplash.com/featured/?house",
          "https://source.unsplash.com/featured/?apartment"
        ],
        TempoLimpeza: faker.datatype.number({ min: 30, max: 180 }),
        Plataformas: [plataforma],
        Tipo: tipoAlojamento,
        PoliticaCancelamento: faker.random.arrayElement(["flexivel", "nao flexivel"]),
        Fumador: faker.datatype.boolean(),
        Status: faker.datatype.boolean()
      };
  
      alojamentos.push(alojamento);
    }
  
    for (const alojamento of alojamentos) {
      await db.collection('alojamentos').doc(alojamento.IDAlojamento).set(alojamento);
    }
    return alojamentos.map(alojamento => alojamento.IDAlojamento);
  };
// Função para criar a tabela Reservas Futuras
const criarReservasFuturas = async (idsPlataformas, idsClientes, idsAlojamentos) => {
    const reservasFuturas = [];
  
    for (let i = 0; i < 50; i++) {
      const plataforma = faker.random.arrayElement(idsPlataformas);
      const idCliente = faker.random.arrayElement(idsClientes);
      const idAlojamento = faker.random.arrayElement(idsAlojamentos);
      const numHospedes = faker.datatype.number({ min: 1, max: 10 });
      const checkIn = faker.date.between("2024-01-01", "2024-03-31");
      const checkOut = faker.date.between(checkIn, "2024-03-31");
      const valor = faker.commerce.price(50, 500);
      const notas = faker.lorem.sentence();
      const status = faker.random.arrayElement(["pendente", "confirmada", "cancelada"]);
  
      const reservaFutura = {
        IDReserva: uuidv4(),
        Plataforma: plataforma,
        IDCliente: idCliente,
        IDAlojamento: idAlojamento,
        NumHospedes: numHospedes,
        CheckIn: checkIn,
        CheckOut: checkOut,
        Valor: valor,
        Notas: notas,
        Status: status
      };
  
      reservasFuturas.push(reservaFutura);
    }
  
    for (const reservaFutura of reservasFuturas) {
      await db.collection('reservas').doc(reservaFutura.IDReserva).set(reservaFutura);
    }
  
    return reservasFuturas;
};
// Função para criar a tabela Review
  const criarReviews = async (reservasConcluidas, idsClientes, idsPlataformas) => {
  for (const reserva of reservasConcluidas) {
    if (reserva.Status === 'concluida') {
      const dataReview = faker.date.between(reserva.CheckOut, new Date());
      const statusReview = dataReview < new Date(new Date().setDate(new Date().getDate() - 14)) ? 'vista' : 'pendente';

      const review = {
        IDReview: uuidv4(),
        Data: dataReview,
        IDReserva: reserva.IDReserva,
        IDCliente: reserva.IDCliente,
        Rating: faker.datatype.number({ min: 1, max: 5 }),
        Comentário: faker.lorem.sentence(),
        Plataformas: reserva.Plataforma,
        Status: statusReview
      };

      await db.collection('reviews').doc(review.IDReview).set(review);
    }
  }
};
// Função para criar a tabela Mensagens
const criarMensagens = async (idsClientes, usuarios, idsCanais, reservas) => {
  // Filtrar usuários permitidos (admin e reservation)
  const usuariosPermitidos = usuarios.filter(u => u.NivelAcesso === 'admin' || u.NivelAcesso === 'reservation').map(u => u.IDUsuario);


  // Criar mensagens para cada reserva
  for (const reserva of reservas) {
    // Garantir pelo menos 3 mensagens por conversa
    for (let i = 0; i < 3; i++) {
      // Alternar entre remetente e destinatário
      const remetente = i % 2 === 0 ? reserva.IDCliente : faker.random.arrayElement(usuariosPermitidos);
      const destinatario = remetente === reserva.IDCliente ? faker.random.arrayElement(usuariosPermitidos) : reserva.IDCliente;

      const mensagem = {
        IDMensagem: uuidv4(),
        Data: faker.date.between(reserva.CheckIn, reserva.CheckOut),
        Remetente: remetente,
        Destinatario: destinatario,
        Mensagem: faker.lorem.sentences(),
        Canal: faker.random.arrayElement(idsCanais),
        Status: 'vista'
      };

      await db.collection('mensagens').doc(mensagem.IDMensagem).set(mensagem);
    }
  }

  // Criar mensagens adicionais sem reservas
  idsClientes.forEach(async idCliente => {
    for (let i = 0; i < 3; i++) {
      const remetente = i % 2 === 0 ? idCliente : faker.random.arrayElement(usuariosPermitidos);
      const destinatario = remetente === idCliente ? faker.random.arrayElement(usuariosPermitidos) : idCliente;

      const mensagem = {
        IDMensagem: uuidv4(),
        Data: faker.date.recent(2),
        Remetente: remetente,
        Destinatario: destinatario,
        Mensagem: faker.lorem.sentences(),
        Canal: faker.random.arrayElement(idsCanais),
        Status: i < 2 ? 'vista' : 'pendente'
      };

      await db.collection('mensagens').doc(mensagem.IDMensagem).set(mensagem);
    }
  });
};
// Função principal para executar todas as criações
const executar = async () => {
  try{
    const tiposAlojamento = await criarTiposAlojamento();
    const idsComodidades = await criarComodidades();
    await criarFuncionarios();
    const usuarios = await criarUsuarios();
    
    const idsCanais = await criarCanais();
    const idsPlataformas = await criarPlataformas();

    const idsClientes = await criarClientes(idsCanais);
    const idsAlojamentos = await criarAlojamentos(tiposAlojamento, idsPlataformas, idsComodidades);

    const reservas = await criarReservas(idsPlataformas, idsClientes, idsAlojamentos);
    await criarReservasFuturas(idsPlataformas, idsClientes, idsAlojamentos);

    // Verifique se reservas é um array e possui o atributo Status
    const reservasConcluidas = reservas.filter(reserva => reserva.Status === 'concluida');
    await criarReviews(reservasConcluidas, idsClientes, idsPlataformas);
    await criarMensagens(idsClientes, usuarios, idsCanais, reservas);

    console.log('Todas as tabelas foram criadas e populadas com sucesso.');
  } catch (error) {
    console.error("Erro durante a execução:", error);
  }
};

executar().catch(console.error);
