# OPEL_stream_server


## Setup and dependencies

```bash
pnpm init
pnpm install express axios cors dotenv fix-webm-duration socket.io openai hound zod cloudinary @aws-sdk/client-s3 @aws-sdk/lib-storage aws-sdk

pnpm install -D typescript @types/node @types/express @types/cors ts-node

npx tsc --init
```


#### What is fix-webm-duration

navigator.mediaDevices.getUserMedia + MediaRecorder create WEBM files without duration metadata.
This library appends missing metadata section right to the file blob.

#### What is hound
Cross platform directory tree watcher that works, even on Windows