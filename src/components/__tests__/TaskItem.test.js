import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { create, act } from 'react-test-renderer';
import TaskItem from '../TaskItem';

describe('Componente TaskItem', () => {
  it('deberia mostrar el texto de la tarea', () => {
    let renderer;

    // 2. Envolvemos la creacion en act() por reglas de React 19
    act(() => {
      renderer = create(<TaskItem task="Comprar pan" onDelete={() => {}} />);
    });

    // 3. Buscamos por testID usando el motor nativo
    const textElement = renderer.root.findByProps({ testID: 'task-text' });
    expect(textElement.props.children).toBe('Comprar pan');
  });

  it('deberia llamar a la funcion onDelete al presionar el boton X', () => {
    const mockOnDelete = jest.fn();
    let renderer;

    act(() => {
      renderer = create(<TaskItem task="Estudiar React" onDelete={mockOnDelete} />);
    });

    const buttonElement = renderer.root.findByProps({ testID: 'delete-button' });

    // 4. Simulamos el evento de toque también envuelto en act()
    act(() => {
      buttonElement.props.onPress();
    });

    expect(mockOnDelete).toHaveBeenCalled();
  });
});