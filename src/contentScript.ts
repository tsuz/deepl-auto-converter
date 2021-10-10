
import { getStorage } from "./util/storage";

interface DeepLResponse {
    translations: DeepLTranslation[]
}

interface DeepLTranslation {
    detectedSourceLanguage: string
    text: string
}

function getSelectionCursor(): Selection | null {
    if (typeof window.getSelection === 'function') {
        return window.getSelection()
    } else if (typeof document.getSelection === 'function') {
        return document.getSelection()
    }
    return null
}

function showSuccess(text: string, sel: Selection) {
    const html = `<p><strong>${text}</strong></p>`
    insertTextAtSelection(html, sel)
}

function showError(sel: Selection) {
    const html = `<strong style='color:red;'>Error has occurred</strong>`
    insertTextAtSelection(html, sel)
}

function insertTextAtSelection(html: string, sel: Selection) {
    if (sel.getRangeAt && sel.rangeCount) {
        const range = sel.getRangeAt(0);
        range.collapse(false);

        var el = document.createElement("div");
        el.innerHTML = html;
        var frag = document.createDocumentFragment(), node, lastNode;
        while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
    }
}

async function doSomethingWithSelectedText() {
    const obj = await getStorage()
    if (obj.translateOnHighlight === false || !obj.deeplApiKey) {
        return
    }
    const cursor = getSelectionCursor()
    var selectedText = cursor?.toString()
    if (cursor && selectedText) {
        try {
            const data = await callDeeplAPI(selectedText, obj.deeplApiKey)
            if (data.translations.length < 1 || !data.translations[0].text) {
                showError(cursor)
                return
            }
            showSuccess(data.translations[0].text, cursor)
        } catch (err) {
            // report error via sentry?
            showError(cursor)
        }
    }
}

async function callDeeplAPI(text: string, deeplApiKey: string): Promise<DeepLResponse> {
    const authKey = deeplApiKey
    const response = await fetch(`https://api-free.deepl.com/v2/translate?auth_key=${authKey}&text=${text}&target_lang=JA`)
    const json = await response.json()
    return camelCase(json) as DeepLResponse
}

document.onmouseup = doSomethingWithSelectedText;
document.onkeyup = doSomethingWithSelectedText;


function camelCase(obj: { [id: string]: any }) {
    let newObj: { [id: string]: any } = {};
    for (const d in obj) {
        if (obj.hasOwnProperty(d)) {
            newObj[d.replace(/(\_\w)/g, function (k) {
                return k[1].toUpperCase();
            })] = obj[d];
        }
    }
    return newObj;
}
