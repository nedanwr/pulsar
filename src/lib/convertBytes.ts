import { maxUploadSize } from "@lib/constants";

export const convertBytes = (bytes: number = maxUploadSize) => {
    return Math.floor(bytes / 1000000);
}