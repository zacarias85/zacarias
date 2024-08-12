document.addEventListener("DOMContentLoaded", () => {
    // Elementos do DOM
    const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    const registerModal = new bootstrap.Modal(document.getElementById("registerModal"));
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const alunoForm = document.getElementById("alunoForm");
    const professorForm = document.getElementById("professorForm");
    const cursoForm = document.getElementById("cursoForm");

    // Dados de usuários
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const adminUser = { username: "admin", password: "admin123" };

    // Verifica se o usuário administrador já está na lista de usuários
    if (!users.some(user => user.username === adminUser.username)) {
        users.push(adminUser);
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Função de login
    const login = (username, password) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
            showContent();
        } else {
            alert("Usuário ou senha incorretos!");
        }
    };

    // Função de logout
    const logout = () => {
        sessionStorage.removeItem("loggedInUser");
        hideContent();
    };

    // Função de registro
    const register = (username, password) => {
        if (users.some(u => u.username === username)) {
            alert("Nome de usuário já existe!");
            return;
        }
        const newUser = { username, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Usuário registrado com sucesso!");
        registerModal.hide();
    };

    // Mostrar conteúdo após login
    const showContent = () => {
        loginBtn.classList.add("d-none");
        registerBtn.classList.add("d-none");
        logoutBtn.classList.remove("d-none");
        alunoForm.classList.remove("d-none");
        professorForm.classList.remove("d-none");
        cursoForm.classList.remove("d-none");
    };

    // Esconder conteúdo ao deslogar
    const hideContent = () => {
        loginBtn.classList.remove("d-none");
        registerBtn.classList.remove("d-none");
        logoutBtn.classList.add("d-none");
        alunoForm.classList.add("d-none");
        professorForm.classList.add("d-none");
        cursoForm.classList.add("d-none");
    };

    // Verificar se o usuário está logado
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        showContent();
    } else {
        hideContent();
    }

    // Cursos e suas disciplinas
    const cursos = {
        CB: ["Matemática", "Biologia", "Física", "Química", "Inglês", "Geografia", "História"],
        AM: ["Matemática", "Português", "Física", "Arte", "Música", "Educação Física", "Sociologia"],
        LB: ["Matemática", "Biologia", "Educação Física", "História", "Geografia", "Inglês", "Literatura"],
        CG: ["Matemática", "Português", "Computação", "Lógica", "Inglês", "Física", "Programação"],
        CD: ["Matemática", "Design Gráfico", "História da Arte", "Fotografia", "Inglês", "Web Design", "Multimídia"]
    };

    // Função para gerar inputs de notas para disciplinas baseadas no curso selecionado
    const generateDisciplinasInputs = (curso) => {
        const disciplinas = cursos[curso];
        let html = "";
        disciplinas.forEach((disciplina) => {
            html += `
                <div class="col">
                    <label for="${disciplina.replace(/\s+/g, '')}" class="form-label">${disciplina}</label>
                    <input type="number" id="${disciplina.replace(/\s+/g, '')}" class="form-control" placeholder="Nota em ${disciplina}" required>
                </div>
            `;
        });
        return html;
    };

    // Event listener para alterar disciplinas ao escolher um curso
    document.getElementById("cursoAluno").addEventListener("change", (e) => {
        const selectedCurso = e.target.value;
        const disciplinasContainer = document.getElementById("disciplinasContainer");
        disciplinasContainer.innerHTML = generateDisciplinasInputs(selectedCurso);
    });

    // Event listeners para login, logout e registro
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
        login(username, password);
        loginModal.hide();
    });

    document.getElementById("registerForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("registerUsername").value;
        const password = document.getElementById("registerPassword").value;
        register(username, password);
    });

    logoutBtn.addEventListener("click", logout);

    // Adiciona aluno ao clicar em adicionar
    alunoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = document.getElementById("nomeAluno").value;
        const idade = document.getElementById("idadeAluno").value;
        const curso = document.getElementById("cursoAluno").value;

        const notas = {};
        cursos[curso].forEach((disciplina) => {
            const nota = document.getElementById(disciplina.replace(/\s+/g, '')).value;
            notas[disciplina] = nota;
        });

        const aluno = {
            nome,
            idade,
            curso,
            notas
        };

        const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
        alunos.push(aluno);
        localStorage.setItem("alunos", JSON.stringify(alunos));

        alert("Aluno adicionado com sucesso!");
        alunoForm.reset();
        document.getElementById("disciplinasContainer").innerHTML = "";
    });
});
