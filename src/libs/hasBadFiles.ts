import { md5 } from "js-md5";

export async function hasBadFiles(bodyJson: any, badHashes: string[]) {
  if (bodyJson && bodyJson.object && bodyJson.object.attachment) {
    const result = (bodyJson.object.attachment as any[]).map(async (file) => {
      if (file.url) {
        const responce = await fetch(file.url);
        const hash = md5(await responce.arrayBuffer());
        if (badHashes.includes(hash)) {
          return true;
        }
      }
      return false;
    });
    for (let i = 0; i < result.length; i++) {
      if (await result[i]) return true;
    }
  }
  return false;
}
