/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                seagull: {
                    50: "#f1f9fe",
                    100: "#e2f3fc",
                    200: "#bfe6f8",
                    300: "#87d2f2",
                    400: "#55c1ea",
                    500: "#20a4d7",
                    600: "#1284b7",
                    700: "#106994",
                    800: "#11597b",
                    900: "#144b66",
                    950: "#0d3044",
                },
            },
            fontFamily: {
                'raleway': ['Raleway', 'sans-serif'],
            }
        },
    },
    plugins: [],
};

