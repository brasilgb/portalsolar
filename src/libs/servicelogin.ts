import axios from 'axios';
let BASE_URL = '';

let requestCustom: any;
let data: any;


const servicelogin = axios.create({
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
});

servicelogin.interceptors.request.use(async (request) => {
  // Produção
  request.baseURL = `https://services.gruposolar.com.br:8086/servicesgruposolar/servlet/isCobol`;
  BASE_URL = `https://services.gruposolar.com.br:8086/servicesgruposolar/servlet/isCobol`;

    // Testes
  // request.baseURL = `https://172.16.1.67:9091/servicesgruposolar/servlet/isCobol`;
  // BASE_URL = `https://172.16.1.67:9091/servicesgruposolar/servlet/isCobol`;

  requestCustom = request;
  data = request.data;

  return request;
});

servicelogin.interceptors.response.use(
  response => response,
  async _error => {
    console.log('Abrindo sessão com o servidor novamente');

    if (requestCustom.url.includes('(LOG_USU_CLOSE_CONNECTION)')) {
      return;
    }

    const axiosNew = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    });

    let session = await axiosNew
      .get('(loginUsuarios)')
      .then(resp => resp)
      .catch(_err => {
        return {
          status: 404,
          success: false,
          message: 'Não foi possível conectar ao servidor'
        };
      });

    if (session.status !== 200) {
      session = {
        status: 404,
        success: false,
        message: 'Não foi possível conectar ao servidor',
      };

      return session;
    }

    console.log('Refazendo a chamada original...');
    let originalResponse;
    if (requestCustom.method === 'POST' || requestCustom.method === 'post') {
      originalResponse = await servicelogin.post(`${requestCustom.url}`, data);
    } else {
      originalResponse = await servicelogin.get(`${requestCustom.url}`);
    }

    if (originalResponse.status !== 200) {
      session = {
        status: 404,
        success: false,
        message: 'Não foi possível conectar ao servidor'
      };
      return session;
    }
    return originalResponse;
  },
);

export default servicelogin;