// ToastService.ts
import EventEmitter from "./EventEmitter";

const toastEmitter = new EventEmitter<string>();

export const ToastService = {
    show: (message: string) => {
        toastEmitter.emit(message);
    },
    subscribe: (callback: (msg: string) => void) => {
        toastEmitter.addListener(callback);
        return () => toastEmitter.removeListener(callback);
    },
};
