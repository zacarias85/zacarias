document.addEventListener('DOMContentLoaded', () => {
    const alunoForm = document.getElementById('alunoForm');
    const alunoTable = document.getElementById('alunoTable').querySelector('tbody');
    const professorForm = document.getElementById('professorForm');
    const professorTable = document.getElementById('professorTable').querySelector('tbody');
    const cursoForm = document.getElementById('cursoForm');
    const cursoTable = document.getElementById('cursoTable').querySelector('tbody');

    const alunos = [];
    const professores = [];
    const cursos = [];

    // Função para adicionar aluno
    alunoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nome = document.getElementById('nomeAluno').value;
        const idade = document.getElementById('idadeAluno').value;
        const curso = document.getElementById('cursoAluno').value;
        const classe = document.getElementById('classeAluno').value;

        const aluno = { nome, idade, curso, classe, notas: [] };
        alunos.push(aluno);
        renderAlunos();
        alunoForm.reset();
    });

    // Função para renderizar alunos na tabela
    function renderAlunos() {
        alunoTable.innerHTML = '';
        alunos.forEach((aluno, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.classe}</td>
                <td>${aluno.notas.join(', ')}</td>
                <td>
                    <button onclick="addNota(${index})">Adicionar Nota</button>
                    <button onclick="removerAluno(${index})">Remover</button>
                </td>
            `;
            alunoTable.appendChild(row);
        });
    }

    // Função para adicionar professor
    professorForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nome = document.getElementById('nomeProfessor').value;
        const curso = document.getElementById('cursoProfessor').value;

        const professor = { nome, curso };
        professores.push(professor);
        renderProfessores();
        professorForm.reset();
    });

    // Função para renderizar professores na tabela
    function renderProfessores() {
        professorTable.innerHTML = '';
        professores.forEach((professor, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${professor.nome}</td>
                <td>${professor.curso}</td>
                <td>
                    <button onclick="removerProfessor(${index})">Remover</button>
                </td>
            `;
            professorTable.appendChild(row);
        });
    }

    // Função para adicionar curso
    cursoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nomeCurso = document.getElementById('nomeCurso').value;

        const curso = { nomeCurso };
        cursos.push(curso);
        renderCursos();
        cursoForm.reset();
    });

    // Função para renderizar cursos na tabela
    function renderCursos() {
        cursoTable.innerHTML = '';
        cursos.forEach((curso, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${curso.nomeCurso}</td>
                <td>
                    <button onclick="removerCurso(${index})">Remover</button>
                </td>
            `;
            cursoTable.appendChild(row);
        });
    }

    // Função para adicionar notas
    window.addNota = function (index) {
        const nota = prompt('Digite a nota do aluno:');
        if (nota) {
            alunos[index].notas.push(nota);
            renderAlunos();
        }
    };

    // Função para remover aluno
    window.removerAluno = function (index) {
        alunos.splice(index, 1);
        renderAlunos();
    };

    // Função para remover professor
    window.removerProfessor = function (index) {
        professores.splice(index, 1);
        renderProfessores();
    };

    // Função para remover curso
    window.removerCurso = function (index) {
        cursos.splice(index, 1);
        renderCursos();
    };
});
