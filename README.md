Base do projeto: React e TypeScript -- preset utilizado "https://js.devexpress.com/React/Documentation/Guide/React_Components/Application_Template/"
A ser desenvolvido em VM de Debian12 e VSC

-------------------------------------------------
Estrutura do projeto:

/home/waph/Documents/yaz/test2
/home/waph/Documents/yaz/test2/.codesandbox
/home/waph/Documents/yaz/test2/.codesandbox/tasks.json
/home/waph/Documents/yaz/test2/node_modules
/home/waph/Documents/yaz/test2/public
/home/waph/Documents/yaz/test2/public/favicon.ico
/home/waph/Documents/yaz/test2/public/index.html
/home/waph/Documents/yaz/test2/public/logo192.png
/home/waph/Documents/yaz/test2/public/logo512.png
/home/waph/Documents/yaz/test2/public/manifest.json
/home/waph/Documents/yaz/test2/public/robots.txt
/home/waph/Documents/yaz/test2/src
/home/waph/Documents/yaz/test2/src/api
/home/waph/Documents/yaz/test2/src/components
/home/waph/Documents/yaz/test2/src/components/calendar
/home/waph/Documents/yaz/test2/src/components/calendar/CalendarioReservas.tsx --- em uso
/home/waph/Documents/yaz/test2/src/components/change-password-form
/home/waph/Documents/yaz/test2/src/components/create-account-form
/home/waph/Documents/yaz/test2/src/components/footer
/home/waph/Documents/yaz/test2/src/components/header
/home/waph/Documents/yaz/test2/src/components/login-form
/home/waph/Documents/yaz/test2/src/components/reset-password-form
/home/waph/Documents/yaz/test2/src/components/side-navigation-menu
/home/waph/Documents/yaz/test2/src/components/user-panel
/home/waph/Documents/yaz/test2/src/components/index.tsx
/home/waph/Documents/yaz/test2/src/contexts
/home/waph/Documents/yaz/test2/src/layouts
/home/waph/Documents/yaz/test2/src/models
/home/waph/Documents/yaz/test2/src/models/Alojamentos.ts --- em uso
/home/waph/Documents/yaz/test2/src/models/Canais.ts --- em uso
/home/waph/Documents/yaz/test2/src/models/Clientes.ts --- em uso
/home/waph/Documents/yaz/test2/src/models/Comodidades.ts --- em uso
/home/waph/Documents/yaz/test2/src/models/Funcionarios.ts --- em uso
/home/waph/Documents/yaz/test2/src/models/Mensagens.ts --- em uso
/home/waph/Documents/yaz/test2/src/models/Plataformas.ts --- em uso
/home/waph/Documents/yaz/test2/src/models/Reservas.ts --- em uso
/home/waph/Documents/yaz/test2/src/models/Reviews.ts --- em uso
/home/waph/Documents/yaz/test2/src/models/TiposAlojamento.ts --- em uso
/home/waph/Documents/yaz/test2/src/models/Usuarios.ts --- em uso
/home/waph/Documents/yaz/test2/src/pages
/home/waph/Documents/yaz/test2/src/pages/Alojamentos
/home/waph/Documents/yaz/test2/src/pages/Alojamentos/detalhes
/home/waph/Documents/yaz/test2/src/pages/Alojamentos/detalhes/DetalhesAlojamento.scss --- em uso
/home/waph/Documents/yaz/test2/src/pages/Alojamentos/detalhes/DetalhesAlojamento.tsx --- em uso
/home/waph/Documents/yaz/test2/src/pages/Alojamentos/Alojamentos.scss --- em uso
/home/waph/Documents/yaz/test2/src/pages/Alojamentos/Alojamentos.tsx --- em uso
/home/waph/Documents/yaz/test2/src/pages/Clientes
/home/waph/Documents/yaz/test2/src/pages/Clientes/Clientes.scss --- em uso
/home/waph/Documents/yaz/test2/src/pages/Clientes/Clientes.tsx --- em uso
/home/waph/Documents/yaz/test2/src/pages/Comunicacoes
/home/waph/Documents/yaz/test2/src/pages/Comunicacoes/Comunicacoes.scss --- em uso
/home/waph/Documents/yaz/test2/src/pages/Comunicacoes/Comunicacoes.tsx --- em uso
/home/waph/Documents/yaz/test2/src/pages/home
/home/waph/Documents/yaz/test2/src/pages/home/home.scss --- em uso
/home/waph/Documents/yaz/test2/src/pages/home/home.tsx --- em uso
/home/waph/Documents/yaz/test2/src/pages/profile
/home/waph/Documents/yaz/test2/src/pages/profile/profile.scss
/home/waph/Documents/yaz/test2/src/pages/profile/profile.tsx
/home/waph/Documents/yaz/test2/src/pages/Reservas
/home/waph/Documents/yaz/test2/src/pages/Reservas/Reservas.scss --- em uso
/home/waph/Documents/yaz/test2/src/pages/Reservas/Reservas.tsx --- em uso
/home/waph/Documents/yaz/test2/src/pages/Reviews/detalhes
/home/waph/Documents/yaz/test2/src/pages/ServicosManutencao
/home/waph/Documents/yaz/test2/src/pages/ServicosManutencao/ServicosManutencao.scss --- em uso
/home/waph/Documents/yaz/test2/src/pages/ServicosManutencao/ServicosManutencao.tsx --- em uso
/home/waph/Documents/yaz/test2/src/pages/tasks
/home/waph/Documents/yaz/test2/src/pages/tasks/tasks.tsx
/home/waph/Documents/yaz/test2/src/pages/TesteChatbot
/home/waph/Documents/yaz/test2/src/pages/TesteChatbot/TesteChatbot.scss --- em uso
/home/waph/Documents/yaz/test2/src/pages/TesteChatbot/TesteChatbot.tsx --- em uso
/home/waph/Documents/yaz/test2/src/pages/TransacoesFinanceiras
/home/waph/Documents/yaz/test2/src/pages/TransacoesFinanceiras/TransacoesFinanceiras.scss --- em uso
/home/waph/Documents/yaz/test2/src/pages/TransacoesFinanceiras/TransacoesFinanceiras.tsx --- em uso
/home/waph/Documents/yaz/test2/src/pages/index.tsx 
/home/waph/Documents/yaz/test2/src/themes
/home/waph/Documents/yaz/test2/src/themes/generated
/home/waph/Documents/yaz/test2/src/themes/metadata.additional.json
/home/waph/Documents/yaz/test2/src/themes/metadata.base.json
/home/waph/Documents/yaz/test2/src/utils
/home/waph/Documents/yaz/test2/src/utils/default-user.tsx
/home/waph/Documents/yaz/test2/src/utils/media-query.tsx
/home/waph/Documents/yaz/test2/src/utils/patches.scss
/home/waph/Documents/yaz/test2/src/utils/patches.tsx
/home/waph/Documents/yaz/test2/src/app-info.tsx
/home/waph/Documents/yaz/test2/src/app-navigation.tsx
/home/waph/Documents/yaz/test2/src/app-routes.tsx
/home/waph/Documents/yaz/test2/src/App.test.tsx
/home/waph/Documents/yaz/test2/src/App.tsx
/home/waph/Documents/yaz/test2/src/Content.tsx
/home/waph/Documents/yaz/test2/src/dx-styles.scss
/home/waph/Documents/yaz/test2/src/firebaseConfig.js
/home/waph/Documents/yaz/test2/src/index.css
/home/waph/Documents/yaz/test2/src/index.tsx
/home/waph/Documents/yaz/test2/src/logo.svg
/home/waph/Documents/yaz/test2/src/matchMediaMock.tsx
/home/waph/Documents/yaz/test2/src/polyfills.tsx
/home/waph/Documents/yaz/test2/src/react-app-env.d.ts
/home/waph/Documents/yaz/test2/src/reportWebVitals.ts
/home/waph/Documents/yaz/test2/src/setupTests.ts
/home/waph/Documents/yaz/test2/src/types.tsx
/home/waph/Documents/yaz/test2/src/UnauthenticatedContent.tsx
/home/waph/Documents/yaz/test2/.gitignore
/home/waph/Documents/yaz/test2/del.js
/home/waph/Documents/yaz/test2/devextreme.json
/home/waph/Documents/yaz/test2/export.js
/home/waph/Documents/yaz/test2/firebaseConfig.js --- config firebase
/home/waph/Documents/yaz/test2/import.js
/home/waph/Documents/yaz/test2/importall.js --- ficheiro de criacao e para popular os dados gerados na firebase
/home/waph/Documents/yaz/test2/keyfire.json --- chave para firebase
/home/waph/Documents/yaz/test2/package-lock.json
/home/waph/Documents/yaz/test2/package.json
/home/waph/Documents/yaz/test2/README.md --- readme
/home/waph/Documents/yaz/test2/tsconfig.json
/home/waph/Documents/yaz/README.md

---------------------------------------------------------------------------
Estrutura da base de dados utilizada:

Tipos de Alojamento (tiposAlojamento):Cada documento representa um tipo diferente de alojamento, como "Apartamento", "Villa", "Penthouse", etc.Campos: IDTipoAlojamento (Main), Descrição.

Comodidades (comodidades):Contém uma lista de comodidades disponíveis, como "Wifi", "Jacuzzi", "Piscina", etc.Campos: IDComodidade (Main), Nome.

Funcionários (funcionarios):Armazena informações sobre os funcionários, como nome, tipo de horário, folgas e status (ativo/inativo).Campos: IDFuncionario (Main), Nome, HorarioTipo, Folgas, Status (On/Off)

Usuários (usuarios):Detalha os usuários do sistema, incluindo administradores, usuários de reservas e de limpeza.Campos: IDUsuario (Main), Nome, Email, NivelAcesso.

Canais (canais):Lista os canais de comunicação ou venda, como "Airbnb", "Booking", "WhatsApp", etc.Campos: IDCanal (Main), Nome.

Plataformas (plataformas):Semelhante aos canais, mas pode ser mais específico para plataformas de reservas como "Airbnb", "Booking".Campos: IDPlataforma (Main), Nome.

Clientes (clientes):Armazena informações sobre os clientes, incluindo nome, contatos, morada, nacionalidade e os canais pelos quais se comunicam.Campos: IDCliente (Main), Nome, Email1, Email2, Telefone1, Telefone2, Notas, Morada, Nacionalidade, Canais (IDCanal.canais, possibilidade de multiplos IDs).

Reservas (reservas):Registra detalhes de cada reserva, incluindo informações do cliente, alojamento, datas, valor, etc.Campos: IDReserva (Main), Plataforma (IDPlataforma.plataformas, o 1 ID), IDCliente (IDCliente.clientes, o 1 ID), IDAlojamento (IDAlojamento.alojamentos, o 1 ID), NumHospedes, CheckIn, CheckOut, Valor, Notas, Status (On/Off).

Alojamentos (alojamentos):Contém detalhes sobre os alojamentos disponíveis, como tipo, localização, capacidade, preço, etc.Campos: IDAlojamento (Main), Nome, Morada, Descrição, Quartos, Camas, MaxHospedes, CasasBanho, PreçoVerao, PrecoInverno, Comodidades (IDComodidade.comodidades, possibilidade de multiplos IDs), Regras, Notas, Fotos, TempoLimpeza, Plataformas (IDPlataforma.plataformas, possibilidade de multiplos IDs), Tipo (IDTipoAlojamento,tiposAlojamento, so 1 ID), PoliticaCancelamento, Fumador, Status (On/Off).

Reviews (reviews):Armazena avaliações feitas pelos clientes sobre as estadias, incluindo comentários e classificações.Campos: IDReview (Main), Data, IDReserva (IDReserva.reservas, unico), IDCliente (IDCliente.clientes, so 1 ID), Rating, Comentário, Plataformas (IDPlataforma.plataformas, so 1 ID), Status (On/Off).

Mensagens (mensagens):Registra mensagens trocadas entre clientes e usuários do sistema, relacionadas ou não a reservas.Campos: IDMensagem (Main), Data, Remetente (IDCliente.clientes, so 1 ID, ou, IDUsuario.usuarios, so 1 ID), Destinatario (IDCliente.clientes, so 1 ID, ou, IDUsuario.usuarios, so 1 ID), Mensagem, Canal (IDCanal.canais,  so 1 ID), Status (On/Off)


Há correlação entre as lista vias os ID de cada tabela.
Exemplo:
Reviews (reviews): IDReserva - refere-se a IDReserva presente na tabela Reservas (reservas); Remetente/Destinatário - tem ou IDCliente da tabela Clientes (clientes) ou IDUsuario - da tabela Usuários (usuarios); Canal - refere-se ao IDCanal presente em Canais (canais), etc; o mesmo acontece nas outras tabelas.



A BD esta em FireBase.


Ficheiro de Modelos da DB:
test2/src/models/Alojamentos.ts
test2/src/models/Canais.ts
test2/src/models/Clientes.ts
test2/src/models/Comodidades.ts
test2/src/models/Funcionarios.ts
test2/src/models/Mensagens.ts
test2/src/models/Plataformas.ts
test2/src/models/Reservas.ts
test2/src/models/Reviews.ts
test2/src/models/TiposAlojamento.ts
test2/src/models/Usuarios.ts


----------------------------------------------------------