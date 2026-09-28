// config-nuvem.js - Configuração de Sincronização em Nuvem (JSONBin.io)
const JSONBIN_BIN_ID = "6ab72633ac6210605af66386";
const JSONBIN_API_KEY = "$2a$10$ZJ.4ymRIXZcZ3I7H1iMUzuK9AwmhmMoe68GeilrfF24kAIvjUiV9C";

// Função para salvar dados na nuvem
async function salvarDadosNaNuvem(dadosObjeto) {
    try {
        let resposta = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify(dadosObjeto)
        });
        let resultado = await resposta.json();
        console.log("Dados salvos na nuvem com sucesso!", resultado);
    } catch (erro) {
        console.error("Erro ao salvar na nuvem:", erro);
    }
}

// Função para carregar dados da nuvem
async function carregarDadosDaNuvem() {
    try {
        let resposta = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            method: 'GET',
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'Cache-Control': 'no-cache'
            }
        });
        let resultado = await resposta.json();
        
        // Verifica se os dados vêm no formato de backup do localStorage
        if (resultado && resultado.record) {
            return resultado.record;
        }
        return resultado;
    } catch (erro) {
        console.error("Erro ao carregar da nuvem:", erro);
        return null;
    }
}
