/* ============================================================
   MOBILIZA — script.js
   Protótipo em HTML + CSS + JS puro (Nível 1 do planejamento).
   Os dados ficam em memória e são persistidos no localStorage
   apenas para simular continuidade entre a página inicial e o
   painel administrativo — não há back-end nesta etapa.

   Tudo roda dentro de uma IIFE para não expor variáveis no
   escopo global, evitando qualquer conflito caso o arquivo
   seja incluído em mais de uma página ou recarregado.
   ============================================================ */

(function () {
    "use strict";

    const STORAGE_KEY = "mobiliza_problemas";

    const TIPOS = {
        "calçada": "Calçada",
        "onibus": "Ponto de ônibus",
        "travessia": "Travessia",
        "acessibilidade": "Acessibilidade"
    };

    /* dados iniciais simulados, usados apenas na primeira visita */

    const problemasIniciais = [
        {
            id: 1,
            tipo: "calçada",
            titulo: "Calçada danificada",
            local: "Rua das Palmeiras, 45",
            descricao: "Piso quebrado e com desnível, dificultando a passagem de cadeirantes e carrinhos de bebê.",
            relatos: 17,
            gravidade: 4,
            top: 110,
            left: 130
        },
        {
            id: 2,
            tipo: "onibus",
            titulo: "Ponto de ônibus sem cobertura",
            local: "Avenida Central, 890",
            descricao: "Ponto sem cobertura contra chuva e sem banco para espera dos passageiros.",
            relatos: 8,
            gravidade: 2,
            top: 200,
            left: 360
        },
        {
            id: 3,
            tipo: "travessia",
            titulo: "Travessia perigosa",
            local: "Cruzamento com a Rua 7 de Setembro",
            descricao: "Travessia sem faixa de pedestre e com grande fluxo de veículos em alta velocidade.",
            relatos: 13,
            gravidade: 5,
            top: 330,
            left: 520
        },
        {
            id: 4,
            tipo: "calçada",
            titulo: "Calçada acessível",
            local: "Praça da Matriz",
            descricao: "Calçada recém-reformada, com piso tátil e rampas de acesso em bom estado.",
            relatos: 3,
            gravidade: 1,
            top: 390,
            left: 230
        }
    ];


    /* ============ PRIORIDADE ============ */

    /* pontuação simples = relatos ponderados + gravidade percebida,
       conforme a lógica descrita no planejamento do projeto */

    function calcularPrioridade(relatos, gravidade) {

        const pontuacao = (relatos * 0.4) + (gravidade * 2);

        if (pontuacao >= 14) return "alta";
        if (pontuacao >= 7) return "media";

        return "baixa";
    }

    function labelPrioridade(prioridade) {
        if (prioridade === "alta") return "Alta";
        if (prioridade === "media") return "Média";
        return "Baixa";
    }


    /* ============ PERSISTÊNCIA (localStorage) ============ */

    function carregarProblemas() {

        try {
            const salvos = localStorage.getItem(STORAGE_KEY);

            if (salvos) {
                return JSON.parse(salvos);
            }
        } catch (e) {
            console.warn("Não foi possível ler o localStorage:", e);
        }

        salvarProblemas(problemasIniciais);
        return problemasIniciais.slice();
    }

    function salvarProblemas(lista) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
        } catch (e) {
            console.warn("Não foi possível gravar no localStorage:", e);
        }
    }

    let problemas = carregarProblemas();


    /* ============ ESTATÍSTICAS ============ */

    function atualizarEstatisticas() {

        const totalEl = document.getElementById("statTotal");
        if (!totalEl) return;

        totalEl.textContent = problemas.length;

        document.getElementById("statCalcada").textContent =
            problemas.filter(p => p.tipo === "calçada").length;

        document.getElementById("statOnibus").textContent =
            problemas.filter(p => p.tipo === "onibus").length;

        document.getElementById("statTravessia").textContent =
            problemas.filter(p => p.tipo === "travessia").length;
    }


    /* ============ MAPA (index.html) ============ */

    function renderizarMapa() {

        const map = document.getElementById("map");
        if (!map) return;

        // remove marcadores antigos, mantém as ruas
        const antigos = map.querySelectorAll(".marker");
        for (let i = 0; i < antigos.length; i++) {
            antigos[i].remove();
        }

        problemas.forEach(problema => {

            const prioridade = calcularPrioridade(problema.relatos, problema.gravidade);
            const cor = prioridade === "alta" ? "red" : (prioridade === "media" ? "yellow" : "green");
            const icone = prioridade === "baixa" ? "✓" : "!";

            const marcador = document.createElement("div");

            marcador.className = "marker " + cor + " problem";
            marcador.dataset.tipo = problema.tipo;
            marcador.style.top = problema.top + "px";
            marcador.style.left = problema.left + "px";
            marcador.textContent = icone;

            marcador.addEventListener("click", () => mostrarProblema(problema.id));

            map.appendChild(marcador);
        });
    }


    /* ============ FILTRO ============ */

    function filtrarProblemas() {

        const filtro = document.getElementById("filtro").value;
        const marcadores = document.querySelectorAll(".problem");

        for (let i = 0; i < marcadores.length; i++) {
            const marcador = marcadores[i];
            const tipo = marcador.dataset.tipo;

            marcador.style.display =
                (filtro === "todos" || tipo === filtro) ? "flex" : "none";
        }
    }


    /* ============ MODAL: REGISTRAR PROBLEMA ============ */

    function abrirModal() {
        document.getElementById("modal").style.display = "flex";
    }

    function fecharModal() {
        document.getElementById("modal").style.display = "none";
    }

    function registrarProblema() {

        const tipo = document.getElementById("tipoProblema").value;
        const local = document.getElementById("localProblema").value.trim();
        const grau = parseInt(document.getElementById("grauProblema").value, 10);
        const descricao = document.getElementById("descricaoProblema").value.trim();

        if (!tipo || !local || !descricao) {
            alert("Preencha todos os campos.");
            return;
        }

        const novoProblema = {
            id: Date.now(),
            tipo: tipo,
            titulo: TIPOS[tipo] || "Problema relatado",
            local: local,
            descricao: descricao,
            relatos: 1,
            gravidade: grau,
            // posição aleatória dentro da área visível do croqui
            top: 60 + Math.floor(Math.random() * 380),
            left: 60 + Math.floor(Math.random() * 600)
        };

        problemas.push(novoProblema);
        salvarProblemas(problemas);

        renderizarMapa();
        filtrarProblemas();
        atualizarEstatisticas();

        fecharModal();

        document.getElementById("tipoProblema").value = "";
        document.getElementById("localProblema").value = "";
        document.getElementById("descricaoProblema").value = "";
        document.getElementById("grauProblema").value = "3";

        alert("Problema registrado com sucesso! Obrigado por contribuir com a sua cidade.");
    }


    /* ============ MODAL: DETALHE DO PROBLEMA ============ */

    function mostrarProblema(id) {

        const problema = problemas.find(p => p.id === id);
        if (!problema) return;

        const prioridade = calcularPrioridade(problema.relatos, problema.gravidade);

        document.getElementById("detalheTipo").textContent =
            (TIPOS[problema.tipo] || problema.tipo).toUpperCase();

        document.getElementById("detalheTitulo").textContent = problema.titulo;
        document.getElementById("detalheLocal").textContent = problema.local;
        document.getElementById("detalheDescricao").textContent = problema.descricao;
        document.getElementById("detalheRelatos").textContent = problema.relatos;

        const badge = document.getElementById("detalhePrioridade");
        badge.textContent = "Prioridade " + labelPrioridade(prioridade);
        badge.className = "badge " + prioridade;

        document.getElementById("modalDetalhe").style.display = "flex";
    }

    function fecharDetalhe() {
        document.getElementById("modalDetalhe").style.display = "none";
    }


    /* ============ PAINEL ADMINISTRATIVO (admin.html) ============ */

    function renderizarPainel() {

        const lista = document.getElementById("listaPrioritarios");
        if (!lista) return;

        const peso = { alta: 3, media: 2, baixa: 1 };

        const ordenados = problemas.slice().sort((a, b) => {
            const pa = calcularPrioridade(a.relatos, a.gravidade);
            const pb = calcularPrioridade(b.relatos, b.gravidade);

            if (peso[pb] !== peso[pa]) return peso[pb] - peso[pa];
            return b.relatos - a.relatos;
        });

        lista.innerHTML = "";

        ordenados.forEach(problema => {

            const prioridade = calcularPrioridade(problema.relatos, problema.gravidade);
            const corDot = prioridade === "alta" ? "red" : (prioridade === "media" ? "yellow" : "green");

            const linha = document.createElement("div");
            linha.className = "admin-row " + prioridade;

            linha.innerHTML =
                '<div class="admin-row-dot dot ' + corDot + '"></div>' +
                '<div class="admin-row-info">' +
                    '<strong>' + problema.titulo + '</strong>' +
                    '<span>' + problema.local + ' · ' + (TIPOS[problema.tipo] || problema.tipo) + '</span>' +
                '</div>' +
                '<div class="admin-row-relatos">' + problema.relatos + ' relatos</div>';

            lista.appendChild(linha);
        });
    }


    /* ============ INICIALIZAÇÃO ============ */

    function iniciarMobiliza() {
        atualizarEstatisticas();
        renderizarMapa();
        renderizarPainel();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarMobiliza);
    } else {
        iniciarMobiliza();
    }


    /* ============ EXPOSIÇÃO PARA OS ATRIBUTOS onclick DO HTML ============ */

    window.abrirModal = abrirModal;
    window.fecharModal = fecharModal;
    window.registrarProblema = registrarProblema;
    window.mostrarProblema = mostrarProblema;
    window.fecharDetalhe = fecharDetalhe;
    window.filtrarProblemas = filtrarProblemas;

})();
