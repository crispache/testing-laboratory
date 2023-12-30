import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";

const mockProps = {
  isOpen: true,
  onAccept: Function,
  onClose: Function,
  title: 'Eliminar proyecto',
  labels: {
    closeButton: 'Cerrar',
    acceptButton: 'Aceptar',
  },
  children: <h1> ¿Desea eliminar el proyecto? </h1>
}

describe('ConfirmationDialogComponent specs', () => {
  it('should render the Dialog and its props when the Dialog is open (isOpen=true)', () => {
    // Arrange
    const props = {
      ...mockProps,
    }

    // Act
    render(<ConfirmationDialogComponent {...props}/>);

    const dialogElement = screen.getByRole("dialog");
    const titleElement = within(dialogElement).getByRole("heading", {
      level: 2,
      name: 'Eliminar proyecto',
    });
    const closeButtonElement = within(dialogElement).getByRole("button",{
      name: 'Cerrar'
    });
    const acceptButtonElement = within(dialogElement).getByRole("button",{
      name: 'Aceptar'
    });

    const buttonsElement = within(dialogElement).getAllByRole("button");
    const contentElement = within(dialogElement).getByRole("heading",{
      level: 1,
      name: '¿Desea eliminar el proyecto?',
    });

    // Assert
    expect(dialogElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(closeButtonElement).toBeInTheDocument();
    expect(acceptButtonElement).toBeInTheDocument();
    expect(buttonsElement).toHaveLength(2);
    expect(contentElement).toBeInTheDocument();
  });

  it('should do not render the Dialog and its props when the Dialog is not open (isOpen=false)', () => {
    // Arrange
    const props = {
      ...mockProps,
      isOpen: false,
    }

    // Act
    render(<ConfirmationDialogComponent {...props}/>);
    const dialogElement = screen.queryByRole("dialog");
    expect(dialogElement).not.toBeInTheDocument();
    expect(dialogElement).toBe(null);
  });

  it('should call onClose when it clicks on "close" button', async () => {
    // Arrange
    const props = {
      ...mockProps,
      onClose: jest.fn(),
    }

    // Act
    render(<ConfirmationDialogComponent {...props}/>);

    const dialogElement = screen.queryByRole("dialog");
    const closeButtonElement = within(dialogElement).getByRole("button",{
      name: 'Cerrar'
    });

    // Assert
    expect(dialogElement).toBeInTheDocument();
    expect(closeButtonElement).toBeInTheDocument();

    await userEvent.click(closeButtonElement);
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should call onAccept when it clicks on "accept" button', async () => {
    // Arrange
    const props = {
      ...mockProps,
      onAccept: jest.fn(),
    }

    // Act
    render(<ConfirmationDialogComponent {...props}/>);

    const dialogElement = screen.queryByRole("dialog");
    const acceptButtonElement = within(dialogElement).getByRole("button",{
      name: 'Aceptar'
    });

    // Assert
    expect(dialogElement).toBeInTheDocument();
    expect(acceptButtonElement).toBeInTheDocument();

    await userEvent.click(acceptButtonElement);
    expect(props.onAccept).toHaveBeenCalled();
    expect(props.onAccept).toHaveBeenCalledTimes(1);
  });

  it('should render prop title, different a String(React.ReactNode), when the Dialog is open (isOpen=true)', () => {
    // Arrange
    const props = {
      ...mockProps,
      title: <a href="https://example.com">Proyecto</a>,
    }

    // Act
    render(<ConfirmationDialogComponent {...props}/>);

    const dialogElement = screen.getByRole("dialog");
    const titleElement = within(dialogElement).getByRole("link", { name: 'Proyecto'})
    // Assert
    expect(dialogElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveAttribute('href', 'https://example.com')
  });

  it("should should render the Dialog and its props using snapshot testing", () => {
    // Arrange
    const props = {
      ...mockProps
    }

    // Act
    render(<ConfirmationDialogComponent {...props}/>);
    const dialogElement = screen.queryByRole("dialog");

    // Assert
    expect(dialogElement).toMatchSnapshot();
  });

});
