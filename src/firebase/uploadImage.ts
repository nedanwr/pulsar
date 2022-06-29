import {firebase} from "./initFirebase";
import type {FirebaseStorage, StorageReference,} from "firebase/storage";
import {getStorage, ref, uploadBytesResumable,} from "firebase/storage";

export const uploadImage = async (dir: string, fileName: string, file: Express.Multer.File) => {
    const storage: FirebaseStorage = getStorage(firebase, "gs://pulsar-api.appspot.com");
    const storageRef: StorageReference = ref(storage, `${dir}/${fileName}.${file.mimetype.split("/")[1]}`);

    return uploadBytesResumable(storageRef, file.buffer, {
        cacheControl: "public",
        contentType: file.mimetype
    }).snapshot.ref;
}