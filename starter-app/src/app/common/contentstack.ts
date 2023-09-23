import { error } from "console";
import * as contentstack from "contentstack";

const Stack = contentstack.Stack({
  api_key: process.env.REACT_APP_CONTENTSTACK_API_KEY as string,
  delivery_token: process.env.REACT_APP_CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.REACT_APP_CONTENTSTACK_ENVIRONMENT as string,
  //@ts-ignore
  region: process.env.REACT_APP_CONTENTSTACK_REGION || "us",
});

const defaultExportObject = {
  getEntry(contentTypeUid, entryUID) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Entry(entryUID);
      blogQuery.includeReference(["category", "built_by", "technology"]);
      const data = blogQuery.toJSON().fetch();
      data
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default defaultExportObject;
