function inserirMensagem(obj) {
    var inserir = $.ajax({
        url: 'https://app-uniesp-p2-43622fe4ead4.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(obj),
        dataType: 'json',
        contentType: 'application/json'
    });

    inserir.done(function(data) {
        console.log('Mensagem inserida:', data);
        // Você pode realizar alguma ação com a resposta da API aqui, se necessário
    });

    inserir.fail(function(xhr, status, error) {
        console.error('Erro ao inserir mensagem:', error);
    });
}

// Função para salvar os dados localmente
function salvarLocalmente(dados) {
    localStorage.setItem('mensagens', JSON.stringify(dados));
}

// Função para carregar os dados salvos localmente
function carregarLocalmente() {
    let mensagens = localStorage.getItem('mensagens');
    if (mensagens) {
        return JSON.parse(mensagens);
    }
    return [];
}

// Ao carregar a página, carregar as mensagens salvas localmente
document.addEventListener('DOMContentLoaded', function() {
    let mensagensSalvas = carregarLocalmente();
    let toDoList = document.getElementById('toDoList');

    mensagensSalvas.forEach(function(mensagem) {
        let newItem = document.createElement('li');
        newItem.innerHTML = `
            <strong>Nome:</strong> ${mensagem.name}<br>
            <strong>E-mail:</strong> ${mensagem.email}<br>
            <strong>Assunto:</strong> ${mensagem.subject}<br>
            <strong>Mensagem:</strong> ${mensagem.message}<br><br>
        `;
        toDoList.appendChild(newItem);
    });
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que o formulário seja enviado normalmente

    let name = document.querySelector('input[name="name"]').value;
    let email = document.querySelector('input[name="email"]').value;
    let subject = document.querySelector('input[name="subject"]').value;
    let message = document.querySelector('textarea[name="message"]').value;

    let obj = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    inserirMensagem(obj);

    // Adiciona a mensagem à lista e salva localmente
    let newItem = document.createElement('li');
    newItem.innerHTML = `
        <strong>Nome:</strong> ${name}<br>
        <strong>E-mail:</strong> ${email}<br>
        <strong>Assunto:</strong> ${subject}<br>
        <strong>Mensagem:</strong> ${message}<br><br>
    `;
    let toDoList = document.getElementById('toDoList');
    toDoList.appendChild(newItem);

    // Salva os dados localmente
    let mensagensSalvas = carregarLocalmente();
    mensagensSalvas.push(obj);
    salvarLocalmente(mensagensSalvas);

    // Limpa os campos do formulário após adicionar à lista
    document.getElementById('contactForm').reset();
});