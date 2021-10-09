import { AppStorage } from "@src/types/storage";

export const getStorage = (): Promise<AppStorage> => {
    return new Promise((resolve) => {
        chrome.storage.sync.get((obj: AppStorage) => {
            resolve(obj)
        });
    })
}

export const setStorage = (obj: AppStorage) => {
    return new Promise((resolve) => {
        chrome.storage.sync.set(obj, resolve);
    })
}