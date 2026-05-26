// =============================================
// PORTFÓLIO – JOÃO PAULO VERES
// script.js
// Funcionalidades: menu responsivo, tema claro/escuro,
//                  link ativo no scroll e validação do formulário
// =============================================

// Aguarda o DOM estar completamente carregado antes de executar
document.addEventListener('DOMContentLoaded', function () {

    // -----------------------------------------------
    // 1. MENU RESPONSIVO (HAMBURGUER)
    //    Abre e fecha o menu em telas pequenas
    // -----------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const navLinks   = document.getElementById('navLinks');

    menuToggle.addEventListener('click', function () {
        // Alterna a classe 'open' que exibe/oculta o menu via CSS
        navLinks.classList.toggle('open');
    });

    // Fecha o menu ao clicar em qualquer link (experiência mobile melhor)
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
        });
    });


    // -----------------------------------------------
    // 2. ALTERNÂNCIA DE TEMA (CLARO / ESCURO)
    //    Salva a preferência no localStorage para
    //    persistir entre recarregamentos da página
    // -----------------------------------------------
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon   = document.getElementById('themeIcon');
    const body        = document.body;

    // Lê preferência salva ou usa 'dark' como padrão
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Clique no botão alterna entre dark e light
    themeToggle.addEventListener('click', function () {
        const current = body.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = current === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme); // persiste escolha
    });

    // Função auxiliar: aplica o tema ao body e atualiza o ícone
    function applyTheme(theme) {
        body.classList.remove('dark', 'light');
        body.classList.add(theme);
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }


    // -----------------------------------------------
    // 3. LINK ATIVO NO MENU CONFORME SCROLL
    //    Destaca o item do menu correspondente à
    //    seção visível na tela
    // -----------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    // Usa IntersectionObserver para detectar qual seção está visível
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Remove 'active' de todos os links
                navItems.forEach(function (item) {
                    item.classList.remove('active');
                });
                // Adiciona 'active' ao link correspondente à seção visível
                const activeLink = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-40% 0px -55% 0px' // considera seção ativa quando está no centro da tela
    });

    sections.forEach(function (section) {
        observer.observe(section);
    });


    // -----------------------------------------------
    // 4. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
    //    Verifica campos obrigatórios e formato de
    //    e-mail antes de "enviar" (simulação de envio)
    // -----------------------------------------------
    const form           = document.getElementById('contactForm');
    const inputNome      = document.getElementById('nome');
    const inputEmail     = document.getElementById('email');
    const inputMensagem  = document.getElementById('mensagem');
    const erroNome       = document.getElementById('erroNome');
    const erroEmail      = document.getElementById('erroEmail');
    const erroMensagem   = document.getElementById('erroMensagem');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function (event) {
        // Previne o envio padrão do formulário (recarregar página)
        event.preventDefault();

        // Limpa erros anteriores antes de revalidar
        clearErrors();

        // Valida todos os campos e coleta se houve erros
        const isValid = validateForm();

        if (isValid) {
            // Simulação de envio: exibe mensagem de sucesso e limpa campos
            simulateSubmit();
        }
    });

    // Função principal de validação dos campos
    function validateForm() {
        let valid = true;

        // Validação do campo Nome
        const nomeValor = inputNome.value.trim();
        if (nomeValor === '') {
            showError(inputNome, erroNome, 'Por favor, informe seu nome.');
            valid = false;
        } else if (nomeValor.length < 3) {
            showError(inputNome, erroNome, 'O nome deve ter ao menos 3 caracteres.');
            valid = false;
        }

        // Validação do campo E-mail
        const emailValor = inputEmail.value.trim();
        if (emailValor === '') {
            showError(inputEmail, erroEmail, 'Por favor, informe seu e-mail.');
            valid = false;
        } else if (!isEmailValido(emailValor)) {
            // Verifica formato usuario@dominio.com
            showError(inputEmail, erroEmail, 'Informe um e-mail válido (ex: usuario@dominio.com).');
            valid = false;
        }

        // Validação do campo Mensagem
        const mensagemValor = inputMensagem.value.trim();
        if (mensagemValor === '') {
            showError(inputMensagem, erroMensagem, 'Por favor, escreva sua mensagem.');
            valid = false;
        } else if (mensagemValor.length < 10) {
            showError(inputMensagem, erroMensagem, 'A mensagem deve ter ao menos 10 caracteres.');
            valid = false;
        }

        return valid;
    }

    // Verifica formato de e-mail com expressão regular
    function isEmailValido(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Exibe mensagem de erro em um campo específico
    function showError(input, errorElement, message) {
        input.classList.add('error');          // borda vermelha no campo
        errorElement.textContent = message;   // texto de erro abaixo do campo
    }

    // Remove todos os erros visuais do formulário
    function clearErrors() {
        [inputNome, inputEmail, inputMensagem].forEach(function (input) {
            input.classList.remove('error');
        });
        [erroNome, erroEmail, erroMensagem].forEach(function (el) {
            el.textContent = '';
        });
        successMessage.classList.add('hidden');
    }

    // Simulação do envio: limpa campos e exibe confirmação
    function simulateSubmit() {
        // Limpa todos os campos após "envio"
        inputNome.value     = '';
        inputEmail.value    = '';
        inputMensagem.value = '';

        // Exibe a mensagem de sucesso (remove a classe 'hidden')
        successMessage.classList.remove('hidden');

        // Oculta a mensagem automaticamente após 5 segundos
        setTimeout(function () {
            successMessage.classList.add('hidden');
        }, 5000);
    }

    // Remove borda de erro ao usuário começar a digitar novamente
    [inputNome, inputEmail, inputMensagem].forEach(function (input) {
        input.addEventListener('input', function () {
            this.classList.remove('error');
        });
    });

});
