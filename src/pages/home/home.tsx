import React from 'react';
import './home.scss';

export default function Home() {
  return (
    <React.Fragment>
      <div className="home-container">
        <header className="home-header">
          <h1>Gestão de Alojamento Local Whome</h1>
          <p>Experiência e Qualidade em Gestão de Propriedades</p>
        </header>

        <section className="home-introduction">
          <h2>Sobre a Whome</h2>
          <p>
            A Whome é especializada em proporcionar experiências únicas em alojamento local. 
            Com foco na qualidade e no conforto, oferecemos serviços de gestão de propriedades 
            que garantem satisfação tanto para proprietários quanto para hóspedes.
          </p>
          <a href="https://whome.pt/pt/inicio" target="_blank" rel="noopener noreferrer">
            Saiba mais
          </a>
        </section>

        <section className="home-services">
          <h2>Nossos Serviços</h2>
          <ul>
            <li>Gestão Completa de Propriedades</li>
            <li>Marketing e Otimização de Reservas</li>
            <li>Manutenção e Limpeza Profissional</li>
            <li>Atendimento Personalizado aos Hóspedes</li>
          </ul>
        </section>

        <section className="home-contact">
          <h2>Entre em Contato</h2>
          <p>Interessado em nossos serviços? Entre em contato para saber mais.</p>
          <a href="mailto:info@whome.pt">info@whome.pt</a>
        </section>

        <footer className="home-footer">
          <p>&copy; {new Date().getFullYear()} Whome - Todos os Direitos Reservados</p>
        </footer>
      </div>
    </React.Fragment>
  );
}
