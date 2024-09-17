let produtosSelecionados = {};
let opcao = 'Na Mesa'; // Padrão
let precosProdutos = {
    'Banana': 10.00,
    'Laranja': 5.00,
    'Limão': 5.00,
    'Maça': 5.00,
    'Melancia': 10.00,
    'Pêra': 5.00
};

// Função para alterar a quantidade e atualizar o subtotal
function alterarQuantidade(produto, quantidade) {
    // Verifica se o produto já foi adicionado ao objeto produtosSelecionados, se não, inicializa com 0
    if (!produtosSelecionados[produto]) {
        produtosSelecionados[produto] = 0;
    }

    // Atualiza a quantidade do produto (não permite números negativos)
    produtosSelecionados[produto] += quantidade;
    if (produtosSelecionados[produto] < 0) {
        produtosSelecionados[produto] = 0;
    }

    // Atualiza a visualização da quantidade no span correspondente
    document.getElementById(`quantidade-${produto}`).textContent = produtosSelecionados[produto];

    // Atualiza a lista de produtos no carrinho e o subtotal
    atualizarListaCarrinho();
    atualizarSubtotal();
}

// Função para atualizar a lista de produtos no carrinho
function atualizarListaCarrinho() {
    const listaCarrinho = document.getElementById('listaCarrinho');
    listaCarrinho.innerHTML = '';

    for (const produto in produtosSelecionados) {
        if (produtosSelecionados[produto] > 0) {
            const li = document.createElement('li');
            li.textContent = `${produto} - Quantidade: ${produtosSelecionados[produto]}`;
            listaCarrinho.appendChild(li);
        }
    }
}

// Função para atualizar o subtotal
function atualizarSubtotal() {
    let subtotal = 0;
    for (const produto in produtosSelecionados) {
        subtotal += produtosSelecionados[produto] * precosProdutos[produto];
    }
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
}

// Função para finalizar a compra
function finalizarCompra() {
    const nome = document.getElementById('nome').value;
    let mensagem = `Nome: ${nome}\nOpção: ${opcao}\nProdutos:\n`;
    if (!nome.trim()) {
        alert("Por favor, preencha o campo de nome.");
        return; // Impede o envio se o nome não estiver preenchido
    }

    let temProdutoNoCarrinho = false;
    for (const produto in produtosSelecionados) {
        if (produtosSelecionados[produto] > 0) {
            temProdutoNoCarrinho = true;
            mensagem += `${produto} - Quantidade: ${produtosSelecionados[produto]}\n`;
        }
    }

    if (!temProdutoNoCarrinho) {
        alert("Por favor, adicione pelo menos um produto ao carrinho.");
        return; // Impede o envio se o carrinho estiver vazio
    }

    let subtotal = 0;
    for (const produto in produtosSelecionados) {
        subtotal += produtosSelecionados[produto] * precosProdutos[produto];
    }
    mensagem += `\nSubtotal: R$ ${subtotal.toFixed(2)}\n`;

    if (opcao === 'Para Entregar') {    
        const endereco = document.getElementById('endereco').value;
        if (!endereco.trim()) {
            alert("Por favor, preencha o campo Endereço.");
            return; // Impede o envio se o endereço não estiver preenchido
        }
        
        mensagem += `Endereço: ${endereco}`;
    } else {
        const numeroMesa = document.getElementById('numeroMesa').value;
        if (!numeroMesa.trim()) {
            alert("Por favor, preencha o campo Número da Mesa.");
            return; // Impede o envio se o número da mesa não estiver preenchido
        }
        mensagem += `Número da Mesa: ${numeroMesa}`;
    }

    const numeroWhatsApp = '5534991631322'; // Coloque o número do WhatsApp do restaurante aqui
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
    console.log(mensagem)
    window.open(url);
}

// Função para escolher entre "Na Mesa" ou "Para Entregar"
function escolherOpcao(escolha) {
    opcao = escolha;
    if (opcao === 'Para Entregar') {
        document.getElementById('opcaoMesa').classList.add('d-none');
        document.getElementById('opcaoEntrega').classList.remove('d-none');
    } else {
        document.getElementById('opcaoMesa').classList.remove('d-none');
        document.getElementById('opcaoEntrega').classList.add('d-none');
    }
}
