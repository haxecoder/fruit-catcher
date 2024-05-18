import { tween } from "cc";

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => {
        tween({}).delay(ms / 1000).call(() => resolve()).start();
    });
}