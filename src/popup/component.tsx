import React, { FunctionComponent } from "react";
import { Hello } from "@src/components/title";
import { browser } from "webextension-polyfill-ts";
import { APIKeyInput } from "@src/components/apiKey";
import "./styles.scss";
import { Enabler } from "@src/components/enabler";

// // // //

export const Popup: FunctionComponent = () => {
    // Sends the `popupMounted` event
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
    }, []);

    // Renders the component tree
    return (
        <div className="popup-container">
            <div className="container mx-4 my-4">
                <Hello />
                <hr />
                <Enabler />
                <APIKeyInput />
            </div>
        </div>
    );
};
