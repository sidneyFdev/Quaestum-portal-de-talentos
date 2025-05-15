export const GetAddressFromViaCEP = async (cep) => {
    let cleanCEP = cep.replace(/[^a-zA-Z0-9]/g, '');

    return fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar o CEP");
        }
        return response.json();
      })
}
