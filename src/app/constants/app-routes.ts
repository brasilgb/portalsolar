export const APP_ROUTES = {
    private: {
        home: {
            name: '/',
        },
        // paths que sao paginas do PROPRIO portalsolar (usam next/link, SPA).
        // Qualquer outro title do card (ex: "bi3") e uma app separada, servida
        // por outro container via Nginx no mesmo dominio - precisa de <a> comum
        // (navegacao de pagina inteira), senao o router do Next tenta resolver
        // a rota dentro do proprio portalsolar e cai no 404.
        internalApps: ['liberacao'],
    },
    public: {
        login: '/login',
        changepassword: '/changepassword',
        location: '/location',
    },
};
