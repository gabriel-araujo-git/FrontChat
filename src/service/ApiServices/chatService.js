import Endpoint from "../Endpoint";

export class ChatApis {
  /**
   * Envia um arquivo para o endpoint de upload.
   * @param {FormData} formData - Objeto FormData contendo o arquivo para upload.
   * @returns {Promise<Object>} - Resposta da API.
   * @throws {Error} - Lança um erro caso a requisição falhe.
   */
  async notebook(formData) {
    if (!(formData instanceof FormData)) {
      throw new Error("O parâmetro fornecido deve ser uma instância de FormData.");
    }

    try {
      const response = await Endpoint.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Axios lida automaticamente com FormData
        },
      });

      return response.data; // Retorna os dados da resposta
    } catch (error) {
      console.error("Falha no upload do arquivo:", error.message);
      throw error;
    }
  }

  /**
   * Envia uma mensagem ao endpoint de chat.
   * @param {string} input - Mensagem do usuário.
   * @param {string} token - Token de autenticação.
   * @returns {Promise<Object>} - Resposta da API.
   * @throws {Error} - Lança um erro caso a requisição falhe.
   */
  async chat(input, token) {
    if (!input || typeof input !== "string") {
      throw new Error("A mensagem de entrada deve ser uma string válida.");
    }

    if (!token || typeof token !== "string") {
      throw new Error("O token deve ser uma string válida.");
    }

    try {
      const response = await Endpoint.post(
        "/chat",
        { question: input }, // Corpo da requisição
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // Retorna os dados da resposta
    } catch (error) {
      console.error("Erro ao chamar o endpoint de chat:", error.message);
      throw error;
    }
  }
}
