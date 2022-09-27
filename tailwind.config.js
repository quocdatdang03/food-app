/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            maxWidth: {
                primary: '1200px',
            },
            colors: {
                primary: '#ff514e',
            },
            boxShadow: {
                btn: '0 2px 2px 0px rgb(0 0 0 / 30%);',
                box: '0 3px 20px rgb(0 0 0 / 10%);',
                buttonCart: '0 3px 8px rgba(0,0,0,.2)',
                hoverBtnCart: '0 5px 13px rgba(0,0,0,.25)',
                boxCheckout: '0 0px 10px -1px rgba(0,0,0,0.3)',
                btnSignIn: '0 3px 8px rgb(0 0 0 / 15%)',
                boxSignIn: '0 4px 25px rgb(0 0 0 / 7%)',
            },
            backgroundImage: {
                homeBg: "url('../src/assets/home_bg.jpg')",
                homeBg2: "url('../src/assets/home_bg2.jpg')",
                homeBg3: "url('../src/assets/home_bg3.jpg')",
                bgFood: "url('../src/assets/order-bg.jpg')",
                signup: "url('../src/assets/signup_bg.svg')",
            },
            backgroundPosition: {
                half: '50%',
            },
            zIndex: {
                100: '100',
            },
            fontFamily: {
                pangolin: ['Pangolin', 'cursive'],
            },
        },
    },
    plugins: [],
};
