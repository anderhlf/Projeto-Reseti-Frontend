export const validarEmailBasico = (valor) => {
    const emailLimpo = valor.trim().toLowerCase();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return {
        valido: regex.test(emailLimpo),
        formatado: emailLimpo
    };
    };