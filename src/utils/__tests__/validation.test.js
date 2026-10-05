import { validateTask } from '../validation';

// 'describe' agrupa tests relacionados en una suite
describe('Logica de validacion de tareas', () => {

  // 'it' define un caso de prueba individual
  it('deberia retornar false si el texto esta vacio', () => {
    const result = validateTask('');
    // 'expect' afirma el valor resultante
    expect(result).toBe(false);
  });

  it('deberia retornar true si el texto tiene contenido valido', () => {
    const result = validateTask('Comprar leche');
    expect(result).toBe(true);
  });
});