// Generate a random 4 digit number between 1000 and 9999
export const generateDiscriminator = (min:number = 1000, max:number = 9999) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}