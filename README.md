Estrutura da base de dados utilizada:

Tipos de Alojamento (tiposAlojamento):Cada documento representa um tipo diferente de alojamento, como "Apartamento", "Villa", "Penthouse", etc.Campos: IDTipoAlojamento, Descrição.

Comodidades (comodidades):Contém uma lista de comodidades disponíveis, como "Wifi", "Jacuzzi", "Piscina", etc.Campos: IDComodidade, Nome.

Funcionários (funcionarios):Armazena informações sobre os funcionários, como nome, tipo de horário, folgas e status (ativo/inativo).Campos: IDFuncionario, Nome, HorarioTipo, Folgas, Status.

Usuários (usuarios):Detalha os usuários do sistema, incluindo administradores, usuários de reservas e de limpeza.Campos: IDUsuario, Nome, Email, NivelAcesso.

Canais (canais):Lista os canais de comunicação ou venda, como "Airbnb", "Booking", "WhatsApp", etc.Campos: IDCanal, Nome.

Plataformas (plataformas):Semelhante aos canais, mas pode ser mais específico para plataformas de reservas como "Airbnb", "Booking".Campos: IDPlataforma, Nome.

Clientes (clientes):Armazena informações sobre os clientes, incluindo nome, contatos, morada, nacionalidade e os canais pelos quais se comunicam.Campos: IDCliente, Nome, Email1, Email2, Telefone1, Telefone2, Notas, Morada, Nacionalidade, Canais.

Reservas (reservas):Registra detalhes de cada reserva, incluindo informações do cliente, alojamento, datas, valor, etc.Campos: IDReserva, Plataforma, IDCliente, IDAlojamento, NumHospedes, CheckIn, CheckOut, Valor, Notas, Status.

Alojamentos (alojamentos):Contém detalhes sobre os alojamentos disponíveis, como tipo, localização, capacidade, preço, etc.Campos: IDAlojamento, Nome, Morada, Descrição, Quartos, Camas, MaxHospedes, CasasBanho, PreçoVerao, PrecoInverno, Comodidades, Regras, Notas, Fotos, TempoLimpeza, Plataformas, Tipo, PoliticaCancelamento, Fumador, Status.

Reviews (reviews):Armazena avaliações feitas pelos clientes sobre as estadias, incluindo comentários e classificações.Campos: IDReview, Data, IDReserva, IDCliente, Rating, Comentário, Plataformas, Status.

Mensagens (mensagens):Registra mensagens trocadas entre clientes e usuários do sistema, relacionadas ou não a reservas.Campos: IDMensagem, Data, Remetente, Destinatario, Mensagem, Canal, Status.


Há correlação entre as lista vias os ID de cada tabela.
Exemplo:
Reviews (reviews): IDReserva - refere-se a IDReserva presente na tabela Reservas (reservas); Remetente/Destinatário - tem ou IDCliente da tabela Clientes (clientes) ou IDUsuario - da tabela Usuários (usuarios); Canal - refere-se ao IDCanal presente em Canais (canais), etc; o mesmo acontece nas outras tabelas.



A BD esta em FireBase.