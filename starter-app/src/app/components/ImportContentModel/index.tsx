import { validate } from "app/helper/api";
import { useState } from "react";
import { ContentModelForm } from "../ContentModelForm";

const ImportContentModel = ({ setNextStep, searchParams, setStatus, activeStep }) => {
  return (
    <div>
      <p>Choose a stack where you want to import the content model.</p>
      <div className="form">
        <ContentModelForm activeStep={activeStep} searchParams={searchParams} setStatus={setStatus} setNextStep={setNextStep} />
      </div>
    </div>
  );
};

export default ImportContentModel;
