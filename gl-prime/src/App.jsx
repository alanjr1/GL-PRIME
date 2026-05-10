import logo from './assets/Logo.png'
import { useState } from 'react'

export default function GLPrimeGroupSite() {
  const [mensagemEnviada, setMensagemEnviada] = useState(false)
  const [logado, setLogado] = useState(false)

  return (
    <div className="font-sans bg-white text-gray-800 scroll-smooth">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-[#071B3B]/95 backdrop-blur-md z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div>
         <img
            src={logo}
            alt="GL Prime Group"
           className="h-16 md:h-20 object-contain"
/>
          </div>

          <nav className="hidden md:flex gap-8 text-white font-medium">
            <a href="#home" className="hover:text-yellow-400 transition">Home</a>
            <a href="#sobre" className="hover:text-yellow-400 transition">Sobre</a>
            <a href="#servicos" className="hover:text-yellow-400 transition">Serviços</a>
            <a href="#produtos" className="hover:text-yellow-400 transition">Produtos</a>
            <a href="#portifolio" className="hover:text-yellow-400 transition">Portifólio</a>
            <a href="#contato" className="hover:text-yellow-400 transition">Contato</a>
            <a href="#cliente" className="hover:text-yellow-400 transition">Área do Cliente</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="min-h-screen bg-gradient-to-r from-[#071B3B] to-[#0F2D5C] flex items-center pt-28"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">
          <div>
            <span className="bg-yellow-400 text-[#071B3B] px-4 py-2 rounded-full font-semibold text-sm">
              Tecnologia • Sofisticação • Economia
            </span>

            <h2 className="text-5xl md:text-6xl font-bold text-white mt-6 leading-tight">
              Economize energia com soluções solares premium
            </h2>

            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              A GL Prime Group oferece projetos modernos de energia solar para
              residências, propriedades rurais e empresas que desejam reduzir
              custos e contribuir para um futuro sustentável.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#contato"
                className="bg-yellow-400 hover:bg-yellow-300 transition text-[#071B3B] px-8 py-4 rounded-xl font-bold shadow-lg"
              >
                Solicitar Orçamento
              </a>

              <a
                href="https://wa.me/5511945922714"
                target="_blank"
                className="border border-white text-white hover:bg-white hover:text-[#071B3B] transition px-8 py-4 rounded-xl font-semibold"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1400&auto=format&fit=crop"
              alt="Energia Solar"
              className="rounded-3xl shadow-2xl object-cover h-[550px] w-full"
            />

            <div className="absolute bottom-6 left-6 bg-white/90 p-6 rounded-2xl shadow-xl">
              <p className="text-3xl font-bold text-[#071B3B]">Até 95%</p>
              <p className="text-gray-700">de economia na conta de energia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center px-6">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1200&auto=format&fit=crop"
            alt="Equipe Solar"
            className="rounded-3xl shadow-xl"
          />

          <div>
            <span className="text-yellow-500 font-bold uppercase tracking-[3px]">
              Sobre Nós
            </span>

            <h3 className="text-4xl font-bold text-[#071B3B] mt-4">
              Soluções inteligentes para um futuro sustentável
            </h3>

            <p className="text-gray-600 leading-relaxed mt-6 text-lg">
              A GL Prime Group nasceu com o propósito de transformar o consumo
              energético através da energia solar. Atuamos em Suzano e cidades
              vizinhas oferecendo projetos personalizados, instalação completa
              e suporte especializado.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-3xl font-bold text-[#071B3B]">+100</h4>
                <p className="text-gray-600 mt-2">Projetos planejados</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-3xl font-bold text-[#071B3B]">24h</h4>
                <p className="text-gray-600 mt-2">Atendimento especializado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-yellow-500 font-bold uppercase tracking-[3px]">
              Serviços
            </span>

            <h3 className="text-4xl font-bold text-[#071B3B] mt-4">
              Soluções completas em energia solar
            </h3>

            <p className="text-gray-600 mt-6 text-lg">
              Projetos desenvolvidos para famílias, empresas e produtores rurais.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: 'Projetos Residenciais',
                desc: 'Economia e valorização do imóvel com tecnologia solar moderna.',
              },
              {
                title: 'Energia Solar Rural',
                desc: 'Soluções eficientes para fazendas, sítios e produtores rurais.',
              },
              {
                title: 'Empresas e Comércios',
                desc: 'Redução de custos operacionais com máxima eficiência energética.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 hover:-translate-y-2 transition rounded-3xl p-8 shadow-lg border border-gray-100"
              >
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-2xl font-bold text-[#071B3B]">
                  {index + 1}
                </div>

                <h4 className="text-2xl font-bold text-[#071B3B] mt-6">
                  {item.title}
                </h4>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section id="produtos" className="py-24 bg-[#071B3B] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-yellow-400 font-bold uppercase tracking-[3px]">
              Produtos
            </span>

            <h3 className="text-4xl font-bold mt-4">
              Equipamentos de alta performance
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              'Painéis Solares Premium',
              'Inversores Inteligentes',
              'Kits Solares Completos',
            ].map((produto, index) => (
              <div
                key={index}
                className="bg-white text-gray-800 rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1200&auto=format&fit=crop"
                  alt={produto}
                  className="h-56 w-full object-cover"
                />

                <div className="p-8">
                  <h4 className="text-2xl font-bold text-[#071B3B]">
                    {produto}
                  </h4>

                  <p className="text-gray-600 mt-4">
                    Tecnologia de última geração para máxima eficiência e durabilidade.
                  </p>

                  <button className="mt-6 bg-yellow-400 hover:bg-yellow-300 transition px-6 py-3 rounded-xl font-bold text-[#071B3B]">
                    Solicitar Informações
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfólio */}
      <section id="portifolio" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-yellow-500 font-bold uppercase tracking-[3px]">
              Portfólio
            </span>

            <h3 className="text-4xl font-bold text-[#071B3B] mt-4">
              Projetos realizados
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl shadow-xl group"
              >
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1400&auto=format&fit=crop"
                  alt="Projeto Solar"
                  className="h-80 w-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Área do Cliente */}
<section id="cliente" className="py-24 bg-white">

{!logado ? (

<div className="max-w-5xl mx-auto px-6">
  <div className="bg-[#071B3B] rounded-3xl p-12 shadow-2xl text-white">

    <div className="grid md:grid-cols-2 gap-10 items-center">

      <div>
        <span className="text-yellow-400 font-bold uppercase tracking-[3px]">
          Área do Cliente
        </span>

        <h3 className="text-4xl font-bold mt-4">
          Faça login ou crie sua conta
        </h3>

        <p className="text-gray-300 mt-6 leading-relaxed">
          Acompanhe projetos, documentos, suporte e informações do seu sistema solar.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 text-gray-800">

        <h4 className="text-2xl font-bold text-[#071B3B] mb-6">
          Entrar
        </h4>

        <form className="space-y-4">

          <input
            type="email"
            placeholder="Seu e-mail"
            className="w-full border border-gray-300 rounded-xl px-4 py-4"
          />

          <input
            type="password"
            placeholder="Sua senha"
            className="w-full border border-gray-300 rounded-xl px-4 py-4"
          />

          <button
            type="button"
            onClick={() => setLogado(true)}
            className="w-full bg-yellow-400 hover:bg-yellow-300 transition py-4 rounded-xl font-bold text-[#071B3B]"
          >
            Entrar
          </button>
        </form>

        <div className="my-8 border-t"></div>

        <h4 className="text-2xl font-bold text-[#071B3B] mb-6">
          Criar Conta
        </h4>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Nome completo"
            className="w-full border border-gray-300 rounded-xl px-4 py-4"
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            className="w-full border border-gray-300 rounded-xl px-4 py-4"
          />

          <input
            type="password"
            placeholder="Crie uma senha"
            className="w-full border border-gray-300 rounded-xl px-4 py-4"
          />

          <button
            type="button"
            onClick={() => setLogado(true)}
            className="w-full bg-[#071B3B] hover:bg-[#0d2b57] transition text-white py-4 rounded-xl font-bold"
          >
            Criar Conta
          </button>

        </form>

      </div>

    </div>

  </div>
</div>

) : (

<div className="min-h-screen bg-[#08172F] text-white flex rounded-3xl overflow-hidden">

  {/* Sidebar */}
  <aside className="w-72 bg-[#071B3B] border-r border-white/10 p-6 hidden md:flex flex-col">

    <div className="mb-10 text-center">

      <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4"></div>

      <h1 className="text-2xl font-bold text-yellow-400">
        Cliente GL Prime
      </h1>

      <p className="text-gray-400 mt-2 text-sm">
        Área Premium
      </p>
    </div>

    <nav className="space-y-3 flex-1">

      <button className="w-full text-left px-5 py-4 rounded-2xl bg-yellow-400 text-[#071B3B] font-bold">
        Dashboard
      </button>

      <button className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10">
        Projetos
      </button>

      <button className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10">
        Financeiro
      </button>

      <button className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10">
        Suporte
      </button>

    </nav>

    <button
      onClick={() => setLogado(false)}
      className="bg-red-500 hover:bg-red-600 transition py-4 rounded-2xl font-bold mt-8"
    >
      Sair
    </button>

  </aside>

  {/* Conteúdo */}
  <main className="flex-1 p-10">

    <h2 className="text-4xl font-bold">
      Dashboard
    </h2>

    <p className="text-gray-400 mt-3">
      Bem-vindo à área premium da GL Prime Group.
    </p>

    <div className="grid md:grid-cols-3 gap-6 mt-10">

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <p className="text-gray-400">
          Últimas Faturas
        </p>

        <h3 className="text-2xl font-bold text-yellow-400 mt-4">
          Disponíveis
        </h3>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <p className="text-gray-400">
          Economia Total
        </p>

        <h3 className="text-2xl font-bold text-yellow-400 mt-4">
          Em análise
        </h3>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <p className="text-gray-400">
          Energia Acumulada
        </p>

        <h3 className="text-2xl font-bold text-yellow-400 mt-4">
          Atualizando
        </h3>
      </div>

    </div>

  </main>

</div>

)}

</section>
      {/* Contato */}
      <section id="contato" className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-6 items-start">
          <div>
            <span className="text-yellow-500 font-bold uppercase tracking-[3px]">
              Contato
            </span>

            <h3 className="text-4xl font-bold text-[#071B3B] mt-4">
              Solicite um orçamento personalizado
            </h3>

            <p className="text-gray-600 mt-6 leading-relaxed text-lg">
              Nossa equipe está pronta para encontrar a melhor solução de energia
              solar para sua residência, empresa ou propriedade rural.
            </p>

            <div className="mt-10 space-y-6 text-lg">
              <div>
                <strong className="text-[#071B3B]">Telefone:</strong>
                <p>(11) 94592-2714</p>
              </div>

              <div>
                <strong className="text-[#071B3B]">E-mail:</strong>
                <p>contato@glprimegroup.com</p>
              </div>

              <div>
                <strong className="text-[#071B3B]">Endereço:</strong>
                <p>Rua Portugal Freixo, 101</p>
              </div>

              <div>
                <strong className="text-[#071B3B]">Instagram:</strong>
                <p>@glprimegroup</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <h4 className="text-3xl font-bold text-[#071B3B]">
              Formulário de Contato
            </h4>

            <form className="space-y-5 mt-8"
            onSubmit={(e) => {
            e.preventDefault()
           setMensagemEnviada(true) }}
            >
              <input
                type="text"
                placeholder="Nome completo"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-yellow-400"
              />

              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-yellow-400"
              />

              <input
                type="tel"
                placeholder="Telefone"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-yellow-400"
              />

              <select className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-yellow-400">
                <option>Selecione o tipo de projeto</option>
                <option>Residencial</option>
                <option>Rural</option>
                <option>Comercial</option>
              </select>

              <textarea
                rows="5"
                placeholder="Descreva sua necessidade"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-yellow-400"
              ></textarea>

              <button className="w-full bg-[#071B3B] hover:bg-[#0d2b57] transition text-white py-4 rounded-xl font-bold text-lg">
                Enviar Solicitação
              </button>
              {mensagemEnviada && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-4 rounded-xl mt-4 text-center font-semibold">
             ✅ Obrigado pelo contato! Nossa equipe retornará em breve.
             </div>
                 )}
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-yellow-400">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h3 className="text-4xl md:text-5xl font-bold text-[#071B3B] leading-tight">
            Comece hoje a economizar com energia solar
          </h3>

          <p className="text-[#071B3B] text-lg mt-6 max-w-3xl mx-auto">
            Transforme sua conta de energia em investimento sustentável.
          </p>

          <a
            href="https://wa.me/5511945922714"
            target="_blank"
            className="inline-block mt-8 bg-[#071B3B] hover:bg-[#0d2b57] transition text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg"
          >
            Falar com Especialista
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#041022] text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10">
          <div>
            <h4 className="text-2xl font-bold text-white">GL PRIME GROUP</h4>
            <p className="mt-4 max-w-md leading-relaxed">
              Soluções premium em energia solar para residências, empresas e propriedades rurais.
            </p>
          </div>

          <div>
            <h5 className="text-white font-bold text-lg">Links Rápidos</h5>
            <div className="flex flex-col gap-2 mt-4">
              <a href="#home" className="hover:text-yellow-400 transition">Home</a>
              <a href="#sobre" className="hover:text-yellow-400 transition">Sobre</a>
              <a href="#servicos" className="hover:text-yellow-400 transition">Serviços</a>
              <a href="#contato" className="hover:text-yellow-400 transition">Contato</a>
            </div>
          </div>

          <div>
            <h5 className="text-white font-bold text-lg">Contato</h5>
            <div className="mt-4 space-y-2">
              <p>(11) 94592-2714</p>
              <p>contato@glprimegroup.com</p>
              <p>Suzano - SP</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500 px-6">
          © 2026 GL Prime Group — Todos os direitos reservados.
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5511945922714"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 transition w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl shadow-2xl z-50"
      >
        💬
      </a>

      {/* Fake Chat Bot */}
      <div className="fixed bottom-28 right-6 bg-white shadow-2xl rounded-3xl w-80 overflow-hidden hidden md:block z-40">
        <div className="bg-[#071B3B] text-white p-4 font-bold">
          Atendimento Online
        </div>

        <div className="p-4 space-y-3 text-sm">
          <div className="bg-gray-100 rounded-2xl p-3 w-fit max-w-[80%]">
            Olá 👋 Como podemos ajudar?
          </div>

          <div className="bg-yellow-100 rounded-2xl p-3 ml-auto w-fit max-w-[80%]">
            Quero solicitar um orçamento.
          </div>
        </div>

        <div className="border-t p-3 flex gap-2">
          <input
            type="text"
            placeholder="Digite sua mensagem"
            className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none"
          />

          <button className="bg-yellow-400 px-4 rounded-xl font-bold text-[#071B3B]">
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
