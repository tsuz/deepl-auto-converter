import * as React from "react";
import { Popup } from "../popup";
import { render } from "@testing-library/react";

describe('Popup', () => {
    it("component renders", () => {
        const { getByTestId } = render(<Popup />)
        const container = getByTestId('popup-container')
        expect(container).toBeInTheDocument()
        expect(container).toHaveClass(`popup-container`)
    });
})

