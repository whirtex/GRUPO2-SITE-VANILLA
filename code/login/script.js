
document.addEventListener('DOMContentLoaded', () => {

    const loginOverlay = document.getElementById('loginOverlay');
    const fecharModalBtn = document.getElementById('fecharModal');
    
    const abrirModalBtns = document.querySelectorAll('.abrirLoginBtn');

    const abrirModal = (event) => {
        event.preventDefault(); 
        loginOverlay.classList.add('visivel');
    };

    const fecharModal = () => {
        loginOverlay.classList.remove('visivel');
    };

    abrirModalBtns.forEach(btn => {
        btn.addEventListener('click', abrirModal);
    });

    fecharModalBtn.addEventListener('click', fecharModal);

    loginOverlay.addEventListener('click', (event) => {
        if (event.target === loginOverlay) {
            fecharModal();
        }
    });

});