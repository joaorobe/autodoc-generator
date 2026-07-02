import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 3000;

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "openai/gpt-oss-120b:free";

if (!API_KEY) {
    console.error("Erro: configure OPENROUTER_API_KEY no arquivo .env.");
    process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/status", (req, res) => {
    res.json({ status: "API local funcionando", model: MODEL });
});

app.post("/api/llm", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || prompt.trim().length === 0) {
            return res.status(400).json({ erro: "O campo prompt é obrigatório." });
        }

        if (prompt.length > 2000) {
            return res.status(400).json({ erro: "Limite: 2000 caracteres." });
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-OpenRouter-Title": "Projeto Gerador de Documentacao"
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { 
                        role: "system", 
                        content: "Você é um Engenheiro de Software especialista em documentação técnica. Sua tarefa é analisar um trecho de código e gerar sua documentação de forma clara e padronizada. Você deve estruturar sua resposta EXATAMENTE nestes 4 tópicos: 1. Descrição (o que o código faz), 2. Parâmetros (nome, tipo e descrição), 3. Retorno (tipo e o que retorna), 4. Exemplo de uso (um bloco de código demonstrando a execução)." 
                    },
                    { role: "user", content: prompt }
                ],
                temperature: 0.3,
                max_completion_tokens: 800
            })
        });

        if (!response.ok) {
            const detalhe = await response.text();
            return res.status(502).json({ erro: "Erro ao consultar o OpenRouter.", status: response.status, detalhe });
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;

        if (!text) {
            return res.status(502).json({ erro: "Resposta vazia ou inesperada." });
        }

        res.json({ modelo: MODEL, resposta: text, uso: data.usage ?? null });

    } catch (error) {
        res.status(500).json({ erro: "Erro interno no servidor.", detalhe: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});