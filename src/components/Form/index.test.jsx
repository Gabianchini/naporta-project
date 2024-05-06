
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from ".";
import { MemoryRouter } from "react-router-dom";


test("Add an order", async () => {
    const handleSubmitMock = jest.fn();

    render(<MemoryRouter><Form onAddOrder={handleSubmitMock}/></MemoryRouter>);
    const nameField = screen.getByTestId("nameField");
    const originField = screen.getByTestId("originField");
    const destinationField = screen.getByTestId("destinationField");
    const emailField = screen.getByTestId("emailField");
    const phoneField = screen.getByTestId("phoneField");
    const sentTimeField = screen.getByTestId("sentTimeField");
    const sentDateField = screen.getByTestId("sentDateField");
    const prevArrivalDateField = screen.getByTestId("prevArrivalDateField")
    const prevArrivalTimeField = screen.getByTestId("prevArrivalTimeField")
    await act( async () => {
        await userEvent.type(nameField, 'Britney Spears');
        await userEvent.type(originField, 'Rua Teste 1234');
        await userEvent.type(destinationField, 'Rua Testinho 4321');
        await userEvent.type(emailField, 'britneyspears@gmail.com');
        await userEvent.type(phoneField, '332489873');
        await userEvent.type(sentTimeField, '22:02');
        await userEvent.type(sentDateField,'2001-05-05');
        await userEvent.type(prevArrivalDateField,'2003-04-10');
        await userEvent.type(prevArrivalTimeField,'13:27');
    });
    // check that all fields were properly filled
    expect(originField).toHaveValue('Rua Teste 1234')
    expect(destinationField).toHaveValue('Rua Testinho 4321')
    expect(nameField).toHaveValue('Britney Spears')
    expect(emailField).toHaveValue('britneyspears@gmail.com')
    expect(phoneField).toHaveValue('332489873')
    expect(sentDateField.value).toBe('2001-05-05')
    expect(sentTimeField.value).toBe('22:02')
    expect(prevArrivalDateField.value).toBe('2003-04-10')
    expect(prevArrivalTimeField.value).toBe('13:27')

    // check if the form was correctly submitted
    await act( async () => {
        fireEvent.click(screen.getByTestId("submitButton"))
    });
    expect(handleSubmitMock).toHaveBeenCalledTimes(1);

    // test that the form is now empty after it was submitted (at least one field...)
    expect(nameField).toHaveValue('')
});