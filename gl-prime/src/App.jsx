import logo from './assets/logo.png'
import imgEmpresa from './assets/solucao.png'
import imgInversor from './assets/inversores.jpeg'
import imgKitSolar from './assets/kitssolares.jpeg'
import imgPainelPremium from './assets/paineissolares.jpeg'
import imgRural from './assets/rural.png'
import imgSlogam from './assets/slogam.png'
import imgSolucao from './assets/casa.jpeg'

import { useState, useEffect } from 'react'
// Importa a conexão com o banco e as funções do Firebase
import { db } from './firebase'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'

export default function GLPrimeGroupSite() {
  const [mensagemEnviada, setMensagemEnviada] = useState(false)
  const [logado, setLogado] = useState(false)
  const [carregando, setCarregando] = useState(false)

  // Estados para capturar os dados do formulário
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [tipoProjeto, setTipoProjeto] = useState('Residencial')
  const [valorConta, setValorConta] = useState('')

  // --- ESTADOS PARA LINK ÚNICO E CONTROLE DE TELA ---
  const [linkOrcamento, setLinkOrcamento] = useState('')
  const [idOrcamentoUrl, setIdOrcamentoUrl] = useState(null)
  const [orcamentoCarregado, setOrcamentoCarregado] = useState(null)
  const [erroCarregamento, setErroCarregamento] = useState(false)
  const [carregandoOrcamento, setCarregandoOrcamento] = useState(false)

  // --- ESTADOS DO CHAT BOT INTERATIVO ---
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Olá 👋 Como podemos ajudr?' },
    { id: 2, sender: 'user', text: 'Quero solicitar um orçamento.' }
  ])
  const [chatInput, setChatInput] = useState('')

  // EFFECT: Monitora se o cliente entrou por um link de orçamento (?id=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const idParam = params.get('id')
    if (idParam) {
      setIdOrcamentoUrl(idParam)
      setCarregandoOrcamento(true)
      
      const docRef = doc(db, 'orcamentos', idParam)
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setOrcamentoCarregado(docSnap.data())
        } else {
          setErroCarregamento(true)
        }
      }).catch((err) => {
        console.error("Erro ao buscar orçamento do link:", err)
        setErroCarregamento(true)
      }).finally(() => {
        setCarregandoOrcamento(false)
      })
    }
  }, [])

  const handleEnviarOrcamento = async (e) => {
    e.preventDefault()
    
    if (!nome || !email || !telefone || !valorConta) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    setCarregando(true)

    try {
      const precoKwh = 0.85
      const potenciaPlacaWp = 0.55
      const eficienciaSistema = 0.75
      const irradiacaoDiaria = 4.8

      const valorContaNum = parseFloat(valorConta)
      const consumoKwhEstimado = valorContaNum / precoKwh
      const potenciaSistemaKWp = consumoKwhEstimado / (irradiacaoDiaria * 30 * eficienciaSistema)
      const quantidadePlacas = Math.ceil(potenciaSistemaKWp / potenciaPlacaWp)

      let precoInstalacaoPorKWp = 4400

      if (potenciaSistemaKWp > 4 && potenciaSistemaKWp <= 8) {
        precoInstalacaoPorKWp = 3800
      } else if (potenciaSistemaKWp > 8 && potenciaSistemaKWp <= 15) {
        precoInstalacaoPorKWp = 3400
      } else if (potenciaSistemaKWp > 15 && potenciaSistemaKWp <= 30) {
        precoInstalacaoPorKWp = 2900
      } else if (potenciaSistemaKWp > 30) {
        precoInstalacaoPorKWp = 2500
      }

      const valorTotalEstimado = potenciaSistemaKWp * precoInstalacaoPorKWp
      const economiaMensal = valorContaNum * 0.95
      const paybackMeses = valorTotalEstimado / economiaMensal
      const paybackAnos = parseFloat((paybackMeses / 12).toFixed(1))

      const novoOrcamento = {
        dadosCliente: {
          nome,
          email,
          telefone,
          tipoProjeto,
          criadoEm: new Date()
        },
        dadosEntrada: {
          valorContaOriginal: valorContaNum,
          consumoKwhEstimado: parseFloat(consumoKwhEstimado.toFixed(2))
        },
        resultadoOrcamento: {
          potenciaSistemaKWp: parseFloat(potenciaSistemaKWp.toFixed(2)),
          quantidadePlacas: quantidadePlacas,
          valorTotalEstimado: parseFloat(valorTotalEstimado.toFixed(2)),
          paybackMeses: Math.ceil(paybackMeses),
          paybackAnos: paybackAnos
        },
        status: 'pendente'
      }

      const docRef = await addDoc(collection(db, 'orcamentos'), novoOrcamento)
      console.log('Orçamento saved with ID: ', docRef.id)

      const urlGerada = `${window.location.origin}${window.location.pathname}?id=${docRef.id}`
      setLinkOrcamento(urlGerada)

      setMensagemEnviada(true)
      setNome('')
      setEmail('')
      setTelefone('')
      setValorConta('')
      
    } catch (error) {
      console.error('Erro ao salvar no Firebase:', error)
      alert('Houve um erro ao processar o seu orçamento. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  const handleSendChatMessage = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = { id: Date.now(), sender: 'user', text: chatInput }
    setMessages((prev) => [...prev, userMessage])
    setChatInput('')

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Entendido! Deixe seus dados no formulário de contato ao lado para gerar sua estimativa na hora, ou use o botão do WhatsApp se preferir falar direto com um consultor! ☀️'
        }
      ])
    }, 1000)
  }

  // --- TELA DE ORÇAMENTO PELO LINK ---
  if (idOrcamentoUrl) {
    return (
      <div className="font-sans bg-[#071B3B] min-h-screen text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white text-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-yellow-400"></div>
          
          <div className="text-center mb-8">
            <img src={logo} alt="GL Prime Group" className="h-16 mx-auto object-contain bg-[#071B3B] p-2 rounded-xl mb-4" />
            <h2 className="text-3xl font-bold text-[#071B3B]">Seu Orçamento Personalizado</h2>
            <p className="text-gray-500 mt-2">Chave de acesso: <span className="font-mono text-xs bg-gray-100 p-1 rounded text-yellow-600">{idOrcamentoUrl}</span></p>
          </div>

          {carregandoOrcamento && (
            <div className="text-center py-12">
              <p className="text-xl font-semibold animate-pulse text-[#071B3B]">Buscando seus dados de economia solar...</p>
            </div>
          )}

          {erroCarregamento && (
            <div className="text-center py-12 text-red-600">
              <p className="text-xl font-bold">Orçamento não encontrado.</p>
              <p className="text-gray-500 mt-2">Verifique se o link está correto ou solicite um novo na nossa página principal.</p>
              <a href={window.location.origin} className="inline-block mt-6 bg-[#071B3B] text-white px-6 py-3 rounded-xl font-bold">Voltar ao Início</a>
            </div>
          )}

          {orcamentoCarregado && (
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-[#071B3B] border-b pb-2 mb-4">Olá, {orcamentoCarregado.dadosCliente.nome}!</h3>
                <p className="text-gray-600">Com base no valor da sua conta de luz atual de <strong>R$ {orcamentoCarregado.dadosEntrada.valorContaOriginal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong>, preparamos uma estimativa inicial para o seu projeto.</p>
                <p className="text-sm text-amber-600 font-medium mt-2">⚠️ Atenção: Os valores abaixo são estimados. O projeto final e as condições comerciais serão validados com o nosso consultor.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#071B3B] text-white rounded-2xl p-6 text-center shadow-md">
                  <p className="text-xs uppercase font-semibold text-yellow-400">Painéis Necessários</p>
                  <h4 className="text-4xl font-extrabold mt-2">{orcamentoCarregado.resultadoOrcamento.quantidadePlacas}</h4>
                  <p className="text-xs text-gray-300 mt-1">Placas Premium de 550Wp</p>
                </div>

                <div className="bg-yellow-400 text-[#071B3B] rounded-2xl p-6 text-center shadow-md">
                  <p className="text-xs uppercase font-bold">Investimento Estimado</p>
                  <h4 className="text-2xl font-extrabold mt-2">R$ {orcamentoCarregado.resultadoOrcamento.valorTotalEstimado.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h4>
                  <p className="text-xs font-medium mt-1">Kit + Engenharia + Instalação</p>
                </div>

                <div className="bg-green-100 text-green-800 rounded-2xl p-6 text-center shadow-md border border-green-200">
                  <p className="text-xs uppercase font-bold">Retorno do Investimento</p>
                  <h4 className="text-2xl font-extrabold mt-2">{orcamentoCarregado.resultadoOrcamento.paybackAnos} Anos</h4>
                  <p className="text-xs text-green-600 mt-1">Prazo estimado de Payback</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h4 className="font-bold text-[#071B3B] mb-2">⚡ Resumo Técnico do Sistema</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Potência total do sistema: <strong>{orcamentoCarregado.resultadoOrcamento.potenciaSistemaKWp} kWp</strong></li>
                  <li>• Consumo mensal estimado: <strong>{orcamentoCarregado.dadosEntrada.consumoKwhEstimado} kWh</strong></li>
                  <li>• Economia estimada na sua conta de luz: <strong className="text-green-600">Até 95% de redução</strong></li>
                </ul>
              </div>

              <div className="text-center pt-4">
                <a 
                  href={`https://wa.me/5511945922714?text=${encodeURIComponent(`Olá! Fiz a simulação no site e vi meu orçamento estimado (Código: ${idOrcamentoUrl}). Gostaria de falar com um consultor para negociar e dar andamento ao projeto! Link: ${window.location.href}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-lg transition duration-300 transform hover:scale-105"
                >
                  💬 Negociar Projeto com Consultor no WhatsApp
                </a>
                <br />
                <a href={window.location.origin} className="text-sm text-gray-400 hover:text-[#071B3B] underline inline-block mt-4">Solicitar outro orçamento</a>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // --- SITE INSTITUCIONAL ---
  return (
    <div className="font-sans bg-white text-gray-800 scroll-smooth relative min-h-screen">
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
                rel="noreferrer"
                className="border border-white text-white hover:bg-white hover:text-[#071B3B] transition px-8 py-4 rounded-xl font-semibold"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div className="relative">
            {/* ✅ SUBSTITUÍDO: foto residencial com painéis solares */}
            <img
              src={imgRural}
              alt="Energia Solar Residencial"
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
          {/* ✅ SUBSTITUÍDO: fachada da empresa GL Prime */}
          <img
            src={imgEmpresa}
            alt="GL Prime Group - Empresa"
            className="rounded-3xl shadow-xl object-cover h-[450px] w-full"
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
            {/* ✅ SUBSTITUÍDO: cada produto com sua imagem própria */}
            {[
              { nome: 'Painéis Solares Premium', img: imgPainelPremium },
              { nome: 'Inversores Inteligentes', img: imgInversor },
              { nome: 'Kits Solares Completos', img: imgKitSolar },
            ].map((produto, index) => (
              <div
                key={index}
                className="bg-white text-gray-800 rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={produto.img}
                  alt={produto.nome}
                  className="h-56 w-full object-cover"
                />

                <div className="p-8">
                  <h4 className="text-2xl font-bold text-[#071B3B]">
                    {produto.nome}
                  </h4>

                  <p className="text-gray-600 mt-4">
                    Tecnologia de última geração para máxima eficiência e durabilidade.
                  </p>

                  <a href="#contato" className="inline-block text-center mt-6 bg-yellow-400 hover:bg-yellow-300 transition px-6 py-3 rounded-xl font-bold text-[#071B3B]">
                    Solicitar Informações
                  </a>
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

          {/* ✅ SUBSTITUÍDO: 3 imagens diferentes no portfólio */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[imgRural, imgEmpresa, imgSolucao].map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl shadow-xl group"
              >
                <img
                  src={img}
                  alt={`Projeto Solar ${index + 1}`}
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
            <aside className="w-72 bg-[#071B3B] border-r border-white/10 p-6 hidden md:flex flex-col">
              <div className="mb-10 text-center">
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4"></div>
                <h1 className="text-2xl font-bold text-yellow-400">Cliente GL Prime</h1>
                <p className="text-gray-400 mt-2 text-sm">Área Premium</p>
              </div>

              <nav className="space-y-3 flex-1">
                <button className="w-full text-left px-5 py-4 rounded-2xl bg-yellow-400 text-[#071B3B] font-bold">Dashboard</button>
                <button className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10">Projetos</button>
                <button className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10">Financeiro</button>
                <button className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10">Suporte</button>
              </nav>
          
              <button
                onClick={() => setLogado(false)}
                className="bg-red-500 hover:bg-red-600 transition py-4 rounded-2xl font-bold mt-8"
              >
                Sair
              </button>
            </aside>

            <main className="flex-1 p-10">
              <h2 className="text-4xl font-bold">Dashboard</h2>
              <p className="text-gray-400 mt-3">Bem-vindo à área premium da GL Prime Group.</p>

              <div className="grid md:grid-cols-3 gap-6 mt-10">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <p className="text-gray-400">Últimas Faturas</p>
                  <h3 className="text-2xl font-bold text-yellow-400 mt-4">Disponíveis</h3>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <p className="text-gray-400">Economia Total</p>
                  <h3 className="text-2xl font-bold text-yellow-400 mt-4">Em análise</h3>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <p className="text-gray-400">Energia Acumulada</p>
                  <h3 className="text-2xl font-bold text-yellow-400 mt-4">Atualizando</h3>
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

            <form className="space-y-5 mt-8" onSubmit={handleEnviarOrcamento}>
              <input
                type="text"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-yellow-400"
              />

              <input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-yellow-400"
              />

              <input
                type="tel"
                placeholder="Telefone / WhatsApp"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-yellow-400"
              />

              <select 
                value={tipoProjeto}
                onChange={(e) => setTipoProjeto(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-yellow-400 bg-white"
              >
                <option value="Residencial">Residencial</option>
                <option value="Rural">Rural</option>
                <option value="Comercial">Comercial</option>
              </select>

              <input
                type="number"
                placeholder="Valor médio da sua conta de luz (R$)"
                value={valorConta}
                onChange={(e) => setValorConta(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-yellow-400"
              />

              <button 
                type="submit"
                disabled={carregando}
                className="w-full bg-[#071B3B] hover:bg-[#0d2b57] disabled:bg-gray-400 transition text-white py-4 rounded-xl font-bold text-lg"
              >
                {carregando ? 'Processando Orçamento...' : 'Enviar Solicitação'}
              </button>

              {mensagemEnviada && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-5 rounded-xl mt-4 text-center space-y-3">
                  <p className="font-bold">✅ Orçamento calculado com sucesso!</p>
                  <p className="text-xs text-gray-600">Seu painel exclusivo de economia já está disponível.</p>
                  
                  <a 
                    href={linkOrcamento}
                    className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-sm shadow-md"
                  >
                    ☀️ Acessar Meu Orçamento Agora
                  </a>

                  <p className="text-[10px] text-gray-500">Se preferir, salve o link de acesso direto: <br/> <span className="font-mono bg-white p-1 rounded inline-block mt-1 select-all">{linkOrcamento}</span></p>
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
            rel="noreferrer"
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
            <p className="mt-4 max-w-md leading-relaxed text-gray-400">
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
            <div className="mt-4 space-y-2 text-gray-400">
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
        href={`https://wa.me/5511945922714?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento de energia solar.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className="fixed bottom-6 left-6 bg-[#25D366] hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl z-50"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 448 512" 
          className="w-9 h-9 fill-current"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </a>
      
      {/* Chat Bot */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col items-end">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="mb-2 bg-white text-gray-800 font-medium px-4 py-2 rounded-2xl shadow-xl text-xs border border-gray-100 animate-bounce flex items-center gap-2"
          >
            <span>Dúvidas? Fale conosco! ☀️</span>
          </button>
        )}

        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            aria-label="Abrir Chat de Atendimento"
            className="bg-[#071B3B] hover:bg-[#0d2b57] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition duration-300 hover:scale-110"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        ) : (
          <div className="bg-white shadow-2xl rounded-3xl w-80 overflow-hidden flex flex-col h-96 border border-gray-100 transition-all duration-300">
            <div className="bg-[#071B3B] text-white p-4 font-bold flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm">Atendimento Online</span>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors text-sm font-semibold p-1"
                title="Fechar Chat"
              >
                ✕
              </button>
            </div>  

            <div className="flex-1 p-4 space-y-3 text-sm overflow-y-auto bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-2xl p-3 max-w-[85%] break-words shadow-sm ${
                    msg.sender === 'bot'
                      ? 'bg-white text-gray-800 border border-gray-100'
                      : 'bg-yellow-100 text-gray-900 ml-auto'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChatMessage} className="border-t p-3 flex gap-2 bg-white">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none focus:border-[#071B3B] transition-all"
              />
              <button 
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 transition-colors px-4 rounded-xl font-bold text-[#071B3B]"
              >
                Enviar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}