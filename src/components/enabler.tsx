import React, { useState, useEffect } from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { AppStorage } from '@src/types/storage'
import { getStorage, setStorage } from '@src/util/getStorage'

export const Enabler = () => {

    const defaultValue = true
    const [enabled, setEnabled] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        async function run() {
            const obj = await getStorage()
            if (obj.translateOnHighlight === undefined) {
                setEnabled(defaultValue)
            } else {
                setEnabled(Boolean(obj.translateOnHighlight))
            }
        }
        run()
    }, [])

    const onChange = (checked: boolean) => {
        setEnabled(checked)
        setStorage({
            'translateOnHighlight': checked,
        });
    }

    if (enabled === undefined) {
        return null
    }

    return (
        <BootstrapSwitchButton
            checked={enabled}
            onlabel='On'
            offlabel='Off'
            onChange={onChange}
        />
    )
}