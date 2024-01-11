Estrutura da base de dados utilizada:
Tipos de Alojamento (tiposAlojamento):Cada documento representa um tipo diferente de alojamento, como "Apartamento", "Villa", "Penthouse", etc.Campos: IDTipoAlojamento, Descrição.
Comodidades (comodidades):Contém uma lista de comodidades disponíveis, como "Wifi", "Jacuzzi", "Piscina", etc.Campos: IDComodidade, Nome.
Funcionários (funcionarios):Armazena informações sobre os funcionários, como nome, tipo de horário, folgas e status (ativo/inativo).Campos: IDFuncionario, Nome, HorarioTipo, Folgas, Status.
Usuários (usuarios):Detalha os usuários do sistema, incluindo administradores, usuários de reservas e de limpeza.Campos: IDUsuario, Nome, Email, NivelAcesso.
Canais (canais):Lista os canais de comunicação ou venda, como "Airbnb", "Booking", "WhatsApp", etc.Campos: IDCanal, Nome.
Plataformas (plataformas):Semelhante aos canais, mas pode ser mais específico para plataformas de reservas como "Airbnb", "Booking".
Campos: IDPlataforma, Nome.
Clientes (clientes):Armazena informações sobre os clientes, incluindo nome, contatos, morada, nacionalidade e os canais pelos quais se comunicam.Campos: IDCliente, Nome, Email1, Email2, Telefone1, Telefone2, Notas, Morada, Nacionalidade, Canais.
Reservas (reservas):Registra detalhes de cada reserva, incluindo informações do cliente, alojamento, datas, valor, etc.Campos: IDReserva, Plataforma, IDCliente, IDAlojamento, NumHospedes, CheckIn, CheckOut, Valor, Notas, Status.
Alojamentos (alojamentos):Contém detalhes sobre os alojamentos disponíveis, como tipo, localização, capacidade, preço, etc.Campos: IDAlojamento, Nome, Morada, Descrição, Quartos, Camas, MaxHospedes, CasasBanho, PreçoVerao, PrecoInverno, Comodidades, Regras, Notas, Fotos, TempoLimpeza, Plataformas, Tipo, PoliticaCancelamento, Fumador, Status.
Reviews (reviews):Armazena avaliações feitas pelos clientes sobre as estadias, incluindo comentários e classificações.Campos: IDReview, Data, IDReserva, IDCliente, Rating, Comentário, Plataformas, Status.
Mensagens (mensagens):Registra mensagens trocadas entre clientes e usuários do sistema, relacionadas ou não a reservas.Campos: IDMensagem, Data, Remetente, Destinatario, Mensagem, Canal, Status.


Há correlação entre as lista vias os ID de cada tabela.








# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
