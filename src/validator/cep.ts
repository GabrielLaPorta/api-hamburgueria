import axios from 'axios';

const CepValidator = async (cep: string) => {
    return await axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
            if (response.data.erro) return false;
            return true;
        })
        .catch((error) => {
            return false;
        });
};

export = CepValidator;
