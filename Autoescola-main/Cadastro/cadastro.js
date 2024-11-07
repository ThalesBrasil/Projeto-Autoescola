function showError(message) {
    const existingModal = document.querySelector('.modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(modal);

    document.querySelector('.close-btn').onclick = () => {
        modal.remove();
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    };
}

function formatCPF(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatRG(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1})$/, '$1-$2');
}

function formatCEP(value) {
    return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}

function validarRG(rg) {
    rg = rg.replace(/\D/g, '');
    return rg.length === 9;
}

async function validarCEP(cep) {
    cep = cep.replace(/\D/g, '');
    if (cep.length !== 8) {
        showError('CEP inválido. Digite um CEP com 8 dígitos.');
        return;
    }
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) {
            showError('CEP não encontrado.');
        } else {
            document.getElementById('endereco').value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        }
    } catch (error) {
        showError('Erro ao consultar o CEP. Verifique sua conexão.');
    }
}

document.getElementById('cpf').addEventListener('input', (event) => {
    event.target.value = formatCPF(event.target.value);
});

document.getElementById('rg').addEventListener('input', (event) => {
    event.target.value = formatRG(event.target.value);
});

document.getElementById('cep').addEventListener('input', (event) => {
    event.target.value = formatCEP(event.target.value);
});

document.getElementById('cep').addEventListener('blur', (event) => {
    validarCEP(event.target.value);
});

document.getElementById('cpf').addEventListener('blur', (event) => {
    if (!validarCPF(event.target.value)) {
        showError('CPF inválido.');
    }
});

document.getElementById('rg').addEventListener('blur', (event) => {
    if (!validarRG(event.target.value)) {
        showError('RG inválido. O RG deve conter 9 dígitos.');
    }
});

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); 
    const nome = document.getElementById('nome').value;
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const dataNascimento = document.getElementById('data_nascimento').value;
    const telefone = document.getElementById('telefone').value;
    const categoria = document.getElementById('categoria').value;

    if (!nome || nome.length < 15) {
        showError('Nome inválido. Deve conter entre 15 e 80 caracteres.');
        return;
    }
    if (login.length !== 6) {
        showError('Login deve ter exatamente 6 caracteres.');
        return;
    }
    if (senha.length !== 8) {
        showError('Senha deve ter exatamente 8 caracteres.');
        return;
    }
    if (!validarCPF(cpf)) {
        showError('CPF inválido.');
        return;
    }
    if (!validarRG(rg)) {
        showError('RG inválido. O RG deve conter 9 dígitos.');
        return;
    }
    if (!dataNascimento) {
        showError('Data de Nascimento é obrigatória.');
        return;
    }
    if (!telefone) {
        showError('Telefone é obrigatório.');
        return;
    }
    if (!categoria) {
        showError('Categoria Pretendida é obrigatória.');
        return;
    }

    window.location.href = "../Login/login.html";
});
