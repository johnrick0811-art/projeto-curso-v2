// config-nuvem.js - Configuração de Sincronização em Nuvem (Supabase)
const SUPABASE_URL = "https://ayclwucigtoufybvmtll.supabase.co";
const SUPABASE_KEY = "sb_publishable_uXpJrC1SkAXsyqLqxqdFZw_RvEsxLXy";

// Inicializa o cliente do Supabase globalmente se a biblioteca estiver carregada
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// Função para salvar dados na nuvem
async function salvarDadosNaNuvem(dadosObjeto) {
    if (!supabaseClient) {
        console.error("Cliente Supabase não inicializado.");
        return;
    }
    try {
        let { error } = await supabaseClient
            .from('dados_sistema')
            .upsert({ id: 'estado_geral', conteudo: dadosObjeto });

        if (error) throw error;
        console.log("Dados salvos na nuvem com sucesso!");
    } catch (erro) {
        console.error("Erro ao salvar na nuvem:", erro);
    }
}

// Função para carregar dados da nuvem
async function carregarDadosDaNuvem() {
    if (!supabaseClient) {
        console.error("Cliente Supabase não inicializado.");
        return null;
    }
    try {
        let { data, error } = await supabaseClient
            .from('dados_sistema')
            .select('*')
            .eq('id', 'estado_geral')
            .single();

        if (error) throw error;

        if (data && data.conteudo) {
            return data.conteudo;
        }
        return null;
    } catch (erro) {
        console.error("Erro ao carregar da nuvem:", erro);
        return null;
    }
}
