document.addEventListener('DOMContentLoaded', () => {
    const alunoForm = document.getElementById('alunoForm');
    const professorForm = document.getElementById('professorForm');
    const cursoForm = document.getElementById('cursoForm');

    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    let professores = JSON.parse(localStorage.getItem('professores')) || [];
    let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    const alunoTable = document.getElementById('alunoTable').querySelector('tbody');
    const professorTable = document.getElementById('professorTable').querySelector('tbody');
    const cursoTable = document.getElementById('cursoTable').querySelector('tbody');

    // Renderizar tabelas
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
                    <button class="btn btn-warning btn-sm me-2" onclick="editarAluno(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="removerAluno(${index})">Remover</button>
                    <button class="btn btn-info btn-sm ms-2" onclick="addNota(${index})">Adicionar Nota</button>
                </td>
            `;
            alunoTable.appendChild(row);
        });
        localStorage.setItem('alunos', JSON.stringify(alunos));
    }

    function renderProfessores() {
        professorTable.innerHTML = '';
        professores.forEach((professor, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${professor.nome}</td>
                <td>${professor.curso}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick="editarProfessor(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="removerProfessor(${index})">Remover</button>
                </td>
            `;
            professorTable.appendChild(row);
        });
        localStorage.setItem('professores', JSON.stringify(professores));
    }

    function renderCursos() {
        cursoTable.innerHTML = '';
        cursos.forEach((curso, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${curso.nomeCurso}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick="editarCurso(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="removerCurso(${index})">Remover</button>
                </td>
            `;
            cursoTable.appendChild(row);
        });
        localStorage.setItem('cursos', JSON.stringify(cursos));
    }

    // Adicionar aluno
    alunoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nomeAluno').value.trim();
        const idade = document.getElementById('idadeAluno').value.trim();
        const curso = document.getElementById('cursoAluno').value.trim();
        const classe = document.getElementById('classeAluno').value.trim();

        if (nome && idade && curso && classe) {
            alunos.push({ nome, idade, curso, classe, notas: [] });
            renderAlunos();
            alunoForm.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Adicionar professor
    professorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nomeProfessor').value.trim();
        const curso = document.getElementById('cursoProfessor').value.trim();

        if (nome && curso) {
            professores.push({ nome, curso });
            renderProfessores();
            professorForm.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Adicionar curso
    cursoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nomeCurso = document.getElementById('nomeCurso').value.trim();

        if (nomeCurso) {
            cursos.push({ nomeCurso });
            renderCursos();
            cursoForm.reset();
        } else {
            alert('Por favor, preencha o nome do curso.');
        }
    });

    // Função para editar aluno
    window.editarAluno = function (index) {
        const aluno = alunos[index];
        document.getElementById('editNomeAluno').value = aluno.nome;
        document.getElementById('editIdadeAluno').value = aluno.idade;
        document.getElementById('editCursoAluno').value = aluno.curso;
        document.getElementById('editClasseAluno').value = aluno.classe;

        const modal = new bootstrap.Modal(document.getElementById('editAlunoModal'));
        modal.show();

        document.getElementById('editAlunoForm').onsubmit = function (e) {
            e.preventDefault();
            aluno.nome = document.getElementById('editNomeAluno').value.trim();
            aluno.idade = document.getElementById('editIdadeAluno').value.trim();
            aluno.curso = document.getElementById('editCursoAluno').value.trim();
            aluno.classe = document.getElementById('editClasseAluno').value.trim();
            renderAlunos();
            modal.hide();
        };
    };

    // Função para editar professor
    window.editarProfessor = function (index) {
        const professor = professores[index];
        document.getElementById('editNomeProfessor').value = professor.nome;
        document.getElementById('editCursoProfessor').value = professor.curso;

        const modal = new bootstrap.Modal(document.getElementById('editProfessorModal'));
        modal.show();

        document.getElementById('editProfessorForm').onsubmit = function (e) {
            e.preventDefault();
            professor.nome = document.getElementById('editNomeProfessor').value.trim();
            professor.curso = document.getElementById('editCursoProfessor').value.trim();
            renderProfessores();
            modal.hide();
        };
    };

    // Função para editar curso
    window.editarCurso = function (index) {
        const curso = cursos[index];
        document.getElementById('editNomeCurso').value = curso.nomeCurso;

        const modal = new bootstrap.Modal(document.getElementById('editCursoModal'));
        modal.show();

        document.getElementById('editCursoForm').onsubmit = function (e) {
            e.preventDefault();
            curso.nomeCurso = document.getElementById('editNomeCurso').value.trim();
            renderCursos();
            modal.hide();
        };
    };

    // Função para adicionar nota
    window.addNota = function (index) {
        const nota = prompt('Digite a nota do aluno:');
        if (nota) {
            alunos[index].notas.push(nota);
            renderAlunos();
        }
    };

    // Função para remover aluno
    window.removerAluno = function (index) {
        if (confirm('Deseja realmente remover este aluno?')) {
            alunos.splice(index, 1);
            renderAlunos();
        }
    };

    // Função para remover professor
    window.removerProfessor = function (index) {
        if (confirm('Deseja realmente remover este professor?')) {
            professores.splice(index, 1);
            renderProfessores();
        }
    };

    // Função para remover curso
    window.removerCurso = function (index) {
        if (confirm('Deseja realmente remover este curso?')) {
            cursos.splice(index, 1);
            renderCursos();
        }
    };

    // Função de busca
    document.getElementById('searchAluno').addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredAlunos = alunos.filter(aluno => aluno.nome.toLowerCase().includes(searchTerm));
        renderAlunos(filteredAlunos);
    });

    document.getElementById('searchProfessor').addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredProfessores = professores.filter(professor => professor.nome.toLowerCase().includes(searchTerm));
        renderProfessores(filteredProfessores);
    });

    document.getElementById('searchCurso').addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredCursos = cursos.filter(curso => curso.nomeCurso.toLowerCase().includes(searchTerm));
        renderCursos(filteredCursos);
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function () {
        if (confirm('Deseja realmente sair?')) {
            window.location.href = 'login.html';
        }
    });

    // Inicializar
    renderAlunos();
    renderProfessores();
    renderCursos();
});