import React, { FunctionComponent } from "react";
import { Hello } from "@src/components/title";
import { APIKeyInput } from "@src/components/apiKey";
import "./../scss/app.scss";
import "./../scss/popup.scss";
import { Enabler } from "@src/components/enabler";

export const Popup = () => {

    return (
        <div className="popup-container" data-testid="popup-container">
            <div className="container mx-4 my-4">
                <Hello />
                <hr />
                <Enabler />
                <APIKeyInput />
            </div>
        </div>
    );
};
