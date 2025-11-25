const { isValidEmail } = require('../../src/utils');

describe('Cenário de Teste: Validação de E-mail', () => {

    test('Caso 1: Deve retornar TRUE para um email válido', () => {
        expect(isValidEmail('aluno@senac.com')).toBe(true);
    });

    test('Caso 2: Deve retornar FALSE se o email não tiver o @', () => {
        expect(isValidEmail('aluno-senac.com')).toBe(false);
    });

    test('Caso 3: Deve retornar FALSE para uma string vazia', () => {
        expect(isValidEmail('')).toBe(false);
    });
});