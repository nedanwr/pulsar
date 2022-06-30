export const validateUUID = (uuid: string): boolean => {
    return new RegExp(/^[\da-fA-F]{8}\b-[\da-fA-F]{4}\b-[\da-fA-F]{4}\b-[\da-fA-F]{4}\b-[\da-fA-F]{12}$/gi).test(uuid);
}