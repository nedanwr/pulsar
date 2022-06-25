import { S3 } from "@aws-sdk/client-s3";
import {
    s3Endpoint,
    s3AccessKeyId,
    s3SecretAccessKey,
} from "@lib/constants";

export const s3Client = new S3({
    endpoint: s3Endpoint,
    region: "us-east-1",
    credentials: {
        accessKeyId: s3AccessKeyId,
        secretAccessKey: s3SecretAccessKey,
    },
});