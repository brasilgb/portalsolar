import type {Config} from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['var(--font-roboto)'],
            },
            colors: {
                // Cor principal da marca (dourado/solar) com sua rampa de tons.
                // Texto sobre 'solar-500' (a cor base #fdc300) deve ser preto.
                solar: {
                    50: '#fffaeb',
                    100: '#fff4d1',
                    200: '#ffeaa3',
                    300: '#ffde70',
                    400: '#ffd138',
                    500: '#fdc300',
                    600: '#d6a400',
                    700: '#ad8500',
                    800: '#8a6a00',
                    900: '#664e00',
                    950: '#3d2f00',
                },
                'blue-primary': '#154295',
                'blue-secundary': '#1452bc',
                'blue-light': '#00AEEF',
                'gray-dark': '#F1F1F1',
                'gray-middle': '#F8F8F8',
                'gray-light': '#FAFAFA',
                'orange-middle': '#F5B025',
                'orange-dark': '#EC6608',
                "solar-green-light": "#A7C414",
                "green-primary": '#bccf00',
            },
            
        },
    },
    plugins: [],
};
export default config;
