import { firebase } from "./initFirebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import type {
    FirebaseStorage,
    StorageReference,
    UploadTaskSnapshot,
    StorageError
} from "firebase/storage";

export const uploadImage = async (dir: string, fileName: string, file: Express.Multer.File) => {
    const storage: FirebaseStorage = getStorage(firebase, "gs://pulsar-api.appspot.com");
    const storageRef: StorageReference = ref(storage, `${dir}/${fileName}.${file.mimetype.split("/")[1]}`);

    const uploadTask = uploadBytesResumable(storageRef, file.buffer, {
        cacheControl: "public",
        contentType: file.mimetype
    });

    uploadTask.on("state_changed", (snapshot: UploadTaskSnapshot) => {
        console.log(snapshot);
    }, (error: StorageError) => {
        throw error;
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
            return downloadURL;
        });
    });
}