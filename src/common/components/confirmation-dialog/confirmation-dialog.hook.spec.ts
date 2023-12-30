import { renderHook, act } from "@testing-library/react";
import { Lookup } from "common/models";
import { useConfirmationDialog } from "./confirmation-dialog.hook";
import * as LookupModels from "../../models/lookup"

describe('useConfirmationDialog specs', () => {
  it('should return the default isOpen value (false)', () => {
    // Arrange
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBe(false);
  });

  it('should return an onClose method when it executed, calls to setIsOpen and updates its value to false', () => {
    // Arrange
    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.isOpen).toBe(false);
  });

  it('should return itemToDelete object with the default values', () => {
    // Arrange
    const defaultValues: Lookup = {
      id: '',
      name: '',
    };

    // Spy
    const createEmptyLookupSpyFn = jest.spyOn(LookupModels, 'createEmptyLookup');

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.itemToDelete).toEqual(defaultValues);
    expect(createEmptyLookupSpyFn).toHaveBeenCalled();
  });

  it('should return an onAccept method when it executed, update itemToDelete default value and isOpen = false', () => {
    // Arrange
    const defaultValues: Lookup = {
      id: '',
      name: '',
    };

    // Spy
    const createEmptyLookupSpyFn = jest.spyOn(LookupModels, 'createEmptyLookup');

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.itemToDelete).toEqual(defaultValues);
    expect(createEmptyLookupSpyFn).toHaveBeenCalled();
    expect(result.current.isOpen).toBe(false);
  });

  it('should return an onOpenDialog method when it executed, calls to setIsOpen(true) and setItemToDelete(with onOpenDialog param) ', () => {
    // Arrange
    const item: Lookup = {
      id: 'abc',
      name: 'Example'
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('should return itemToDelete object with the default values and isOpen = false, when call to onOpenDialog and then to call to onAccept', () => {
    // Arrange
    const defaultValues: Lookup = { id: '', name: ''};
    const item: Lookup = {
      id: 'abc',
      name: 'Example'
    };

    // Spy
    const createEmptyLookupSpyFn = jest.spyOn(LookupModels, 'createEmptyLookup');

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(item);
    expect(result.current.isOpen).toBe(true);

    // Act
    act(() => {
       result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(defaultValues);
    expect(createEmptyLookupSpyFn).toHaveBeenCalled();
    expect(result.current.isOpen).toBe(false);
  });

});
