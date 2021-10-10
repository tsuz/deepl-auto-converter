import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Hello } from "../components/title";
import { Story } from "@src/dev";

storiesOf("Hello", module).add("renders", () => {
    return (
        <Story>
            <Hello />
        </Story>
    );
});
