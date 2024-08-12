document.getElementById('adminLogoutBtn').addEventListener('click', function() {
    localStorage.removeItem('adminAuthenticated');
    window.location.href = 'admin_login.html';
});

// Verificação de autenticação
if (!localStorage.getItem('adminAuthenticated')) {
    window.location.href = 'admin_login.html';
}
