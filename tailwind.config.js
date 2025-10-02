/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx}', // Ensuring Tailwind scans your components
    ],
    theme: {
        extend: {
            fontSize: {
                10: ['10px'],
            },
        },
    },
    plugins: [],
};
