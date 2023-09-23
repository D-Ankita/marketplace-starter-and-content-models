import { ContentModelLayout } from "app/components/PageLayout";
import { useEffect } from "react";

const CMCallback = () => {
  useEffect(() => {
    document.title = "Content Models";
  }, []);
  return <ContentModelLayout />;
};
export default CMCallback;
