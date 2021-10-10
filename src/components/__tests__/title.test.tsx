import * as React from "react";
import { Hello } from "../title";
import { render } from "@testing-library/react";

it("Title renders correct title", () => {
    const { getByText } = render(<Hello />)
    expect(getByText('DeepL Auto Converter')).toBeInTheDocument()
});
