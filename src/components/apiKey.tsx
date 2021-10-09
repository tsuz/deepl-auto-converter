import { AppStorage } from '@src/types/storage';
import { getStorage, setStorage } from '@src/util/getStorage';
import React, { useState, useEffect, ChangeEventHandler, ChangeEvent } from 'react'

export const APIKeyInput = () => {

    const [apiKey, setApiKey] = useState<string | undefined>(undefined)

    useEffect(() => {
        async function run() {
            const obj = await getStorage()
            if (obj.deeplApiKey === undefined) {
                setApiKey('')
            } else {
                const str = obj.deeplApiKey.substr(0, 3) +
                    '****' +
                    obj.deeplApiKey.substr(obj.deeplApiKey.length - 3, 3)

                setApiKey(str)
            }
        }
        run()
    }, [])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setApiKey(val)
        setStorage({ deeplApiKey: val });
    }

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                    <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                    <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
            </span>
            <input type="text"
                className="form-control"
                onChange={onChange}
                value={apiKey}
                placeholder="API Key"
                aria-label="apikey"
                aria-describedby="basic-addon1" />
        </div>
    )
}