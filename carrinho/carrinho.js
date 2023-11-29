document.addEventListener('DOMContentLoaded', function () {
    const botoesMinus = document.querySelectorAll('.qtd button[data-action="minus"]');
    const botoesPlus = document.querySelectorAll('.qtd button[data-action="plus"]');
    const spansQuantidade = document.querySelectorAll('.qtd span');
    const precos = document.querySelectorAll('.preco');
    const totalElements = document.querySelectorAll('.total');
    const subTotalElement = document.querySelector('.subTotalValor');
    const totalFinal =  this.getElementById('totalFinal')
    const finalizarBtn = document.getElementById('finalizar');

    let cartItems = [];
    let total = 0;

    function atualizarQuantidade(produtoIndex, quantidade) {
        let qtd = parseInt(spansQuantidade[produtoIndex].textContent);
        let preco = parseFloat(precos[produtoIndex].textContent.replace('R$ ', ''));
        let itemTotal = qtd * preco;

        // Atualizar a quantidade
        qtd = Math.max(1, qtd + quantidade);

        spansQuantidade[produtoIndex].textContent = qtd;

        // Atualizar o total do item
        itemTotal = qtd * preco;
        totalElements[produtoIndex].textContent = `R$ ${itemTotal.toFixed(2)}`;

        // Atualizar subtotal e total geral
        atualizarSubTotalETotal();
    }

    function atualizarSubTotalETotal() {
        let subTotal = 0;

        totalElements.forEach(element => {
            subTotal += parseFloat(element.textContent.replace('R$ ', ''));
        });

        subTotalElement.textContent = `R$ ${subTotal.toFixed(2)}`;
        totalFinal.textContent = `R$ ${subTotal.toFixed(2)}`;
        total = subTotal;

        // Atualizar total geral
        finalizarBtn.disabled = (parseFloat(total.toFixed(2)) === 0);
    }

    // Adicionar evento de clique aos botões de "+" e "-"
    botoesMinus.forEach(button => {
        button.addEventListener('click', function () {
            const produtoIndex = this.parentElement.getAttribute('data-index');
            atualizarQuantidade(produtoIndex, -1);
        });
    });

    botoesPlus.forEach(button => {
        button.addEventListener('click', function () {
            const produtoIndex = this.parentElement.getAttribute('data-index');
            atualizarQuantidade(produtoIndex, 1);
        });
    });

    // Adicionar evento de clique ao botão "Finalizar Compra"
    finalizarBtn.addEventListener('click', function () {
        alert('Compra finalizada! Total: R$' + total.toFixed(2));
    });
    
    // Restante do seu código, se houver...
});