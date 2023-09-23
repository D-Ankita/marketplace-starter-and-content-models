import {
  Button,
  Field,
  FieldLabel,
  Icon,
  Info,
  Line,
  Select,
  ValidationMessage,
} from "@contentstack/venus-components";
import { importContentModel, validate } from "app/helper/api";
import { fetchStacks } from "app/helper/vercel";
import { useChannelId, useEnvironment, useLogger, useStackDetails, useStackList } from "app/hooks/useStackDetails";
import { useCallback, useEffect, useState } from "react";
import { Form as FinalForm, Field as ReactFinalField } from "react-final-form";
import ConflictTable from "../ConflictTable/ConflictTable";
import { Logger } from "../Logger";
import { UnauthorizedCard } from "../UnauthorizedCard";
import "./style.scss";
import { ReactComponent as Stacks } from "../../assets/Stacks.svg";
import loader from "../../assets/loader.gif";

export const ContentModelForm = ({ activeStep, setStatus, setNextStep, searchParams }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [stackName, setStackName] = useState(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conflictsArray, setConflictArray] = useState<any>(null);
  const [correctionsArray, setCorrectionsArray] = useState<any>([]);
  const [allDataArray, setAllDataArray] = useState<any>(null);
  const [stackDetails, setStackDetails] = useStackDetails();
  const [disableSelect, setDisableSelect] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [isAllTitlesValid, setIsAllTitlesValid] = useState<boolean | null>(null);
  const [validateSuccess, setValidateSuccess] = useState(false);
  const [pusherData, setPusherData] = useState(null);
  const [logger, setLogger] = useLogger();
  const [channelId, setChannelId] = useChannelId();
  const [environment, setEnvironment] = useEnvironment();

  const [unauthorizedUserError, setUnauthorizedUserError] = useState(false);
  const [stackList, setStackList] = useStackList();
  const [isApiResponseLoading, setIsApiResponseLoading] = useState(true);

  useEffect(() => {
    if (searchParams.state) {
      fetchStacks(searchParams.state, { roles: ["Admin", "Developer", "Owner"] })
        .then((stackItems: any) => {
          setStackList(
            stackItems.map((stack) => {
              return {
                ...stack,
                label: stack.name,
              };
            })
          );
          setIsApiResponseLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchParams.state, setStackList]);

  const handleStackNameUpdate = (selectedStack) => {
    setStackName(selectedStack);
    setDisabled(false);
    setStackDetails(selectedStack);
  };

  // This function will autocomplete the logger functionality after 4000ms
  // This mocking of the data is enabled ony when REACT_APP_NODE_ENVIRONMENT is set as local_development.
  useEffect(() => {
    if (process.env.REACT_APP_NODE_ENVIRONMENT === "local_development") {
      if (logger === true) {
        const timer = setTimeout(() => {
          setLogger(false);
          setIsLoading(false);
          setDisabled(true);
          setStatus(true);
          setNextStep(true);
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [logger]);

  const validateCall = () => {
    setIsLoading(true);
    validate(stackDetails, searchParams).then((res: any) => {
      if (res.status === 201) {
        switch (res.data.status) {
          case "Success": {
            setIsLoading(false);
            setValidated(true);
            setValidateSuccess(true);
            importCall();
            break;
          }
          case "Failure": {
            setConflictArray(res.data.conflicts);
            setValidated(true);
            setAllDataArray(res.data.allData);
            setIsLoading(false);
            setDisableSelect(true);
            setCorrectionsArray(
              res.data.conflicts.map((conflict) => ({
                type: conflict.type,
                field: conflict.field,
                subject: { old: conflict.subject, new: "" },
                path: conflict.path,
              }))
            );
            setIsAllTitlesValid(false);
            break;
          }
          default:
            setIsLoading(false);
            break;
        }
      } else {
        setUnauthorizedUserError(true);
        setIsLoading(false);
        setStackName(null);
      }
    });
  };

  useEffect(() => {
    if (stackName !== null) {
      setUnauthorizedUserError(false);
      setDisabled(false);
      setConflictArray(null);
      setCorrectionsArray([]);
    }
  }, [stackName]);

  // importCall
  const importCall = () => {
    setIsLoading(true);

    importContentModel(stackDetails, correctionsArray, allDataArray, searchParams).then((res: any) => {
      if (res.status === 201) {
        if (res.data.id !== null) {
          setIsLoading(false);
          setValidated(true);
          setEnvironment(res.data.environment);
          setChannelId(res.data.id);
          stackDetails["stackUrl"] = res.data.stackUrl;
          setLogger(true);
        } else if (res.data.status === "Failure") {
          setValidateSuccess(true);
          setConflictArray(res.data.conflicts);
          setCorrectionsArray(
            res.data.conflicts.map((conflict) => ({
              type: conflict.type,
              field: conflict.field,
              subject: { old: conflict.subject, new: "" },
              path: conflict.path,
            }))
          );
          setIsAllTitlesValid(false);
          setIsLoading(false);
        } else {
          console.error("SOMETHING UNEXPECTED HAPPENED! ", res);
        }
      } else {
        setDisableSelect(false);
        setUnauthorizedUserError(true);
        setIsLoading(false);
        setStackName(null);
        setValidated(false);
      }
    });
  };

  const proceed = useCallback(() => {
    setIsLoading(false);
    setDisabled(true);
    setStatus(true);
    setNextStep(true);
  }, [setIsLoading, setDisabled, setStatus, setNextStep]);

  const isValid = (object) => {
    let val = true;
    if (object.field === "title") {
      val = object.hasOwnProperty("doesNameConflicts") && object.doesNameConflicts === false;
    }
    return val;
  };

  useEffect(() => {
    let status = conflictsArray?.every(isValid);
    setDisableBtn(status);
  }, [conflictsArray]);

  return (
    <FinalForm
      onSubmit={() => {}}
      validate={(values) => {
        const errors: any = {};
        if (!stackName || values.stack === "") {
          errors.stack = "Stack select required";
        }
        return errors;
      }}
      render={({ handleSubmit }) => {
        return (
          <>
            {isApiResponseLoading ? (
              <div className="async-loader">
                <img src={loader} alt="fetching-stacks-loader" className="img-loader" />
                <p className="loader-text">Fetching Stacks...</p>
              </div>
            ) : (
              <>
                {stackList.length !== 0 ? (
                  <form onSubmit={handleSubmit} className="contentmodel-form-wrapper">
                    <Field className={logger ? "input-form-disabled StackNameField" : "StackNameField"}>
                      <ReactFinalField name="stack" type="input">
                        {({ input, meta }) => {
                          return (
                            <>
                              <FieldLabel
                                disabled={disableSelect}
                                error={meta.error && meta.touched && true}
                                htmlFor="stack">
                                Stack Name
                              </FieldLabel>
                              {meta.error && meta.touched && <ValidationMessage>{meta.error}</ValidationMessage>}
                              <Select
                                onChange={handleStackNameUpdate}
                                options={stackList}
                                value={stackName}
                                placeholder="Select Stack"
                                isDisabled={logger || disableSelect}
                                error={(meta.error || meta.submitError) && meta.touched}
                                className={"classMenu"}
                                width="350px"
                                version="v2"
                                isSearchable={true}
                              />
                            </>
                          );
                        }}
                      </ReactFinalField>
                    </Field>
                    {conflictsArray !== null &&
                      !unauthorizedUserError &&
                      !logger &&
                      conflictsArray.length > 0 &&
                      activeStep === 0 && (
                        <Field className="ImportField">
                          <ConflictTable
                            conflicts={conflictsArray}
                            correctionsArray={correctionsArray}
                            setCorrectionsArray={setCorrectionsArray}
                            allDataArray={allDataArray}
                            setIsAllTitlesValid={setIsAllTitlesValid}
                            isDisabled={activeStep === 1}
                          />
                        </Field>
                      )}
                    {logger || activeStep === 1 ? (
                      <Field className="ImportField">
                        {!disabled && (
                          <div className="form log-section">
                            <Info
                              icon={<Icon icon="InfoCircleWhite" />}
                              borderColor="#A9B6CB"
                              backgroundColor="#ffff"
                              content="The Content model is being imported to the stack. This process is running in the background, and you can check the progress in the log below:"
                              type="success"
                            />
                          </div>
                        )}
                        <FieldLabel htmlFor="log">Logs</FieldLabel>
                        {<Logger onSubmit={proceed} channelId={channelId} searchParams={searchParams} />}
                      </Field>
                    ) : (
                      ""
                    )}
                    {unauthorizedUserError ? (
                      <Field>
                        <UnauthorizedCard />
                      </Field>
                    ) : null}
                    <Line type="solid" />
                    <div className="right">
                      <Button
                        icon="Stacks"
                        iconProps={{
                          size: "medium",
                          stroke: "#ffffff",
                          fill: "#ffffff",
                        }}
                        disabled={disabled || isAllTitlesValid === false || unauthorizedUserError || logger}
                        isLoading={isLoading}
                        onClick={validated ? importCall : validateCall}
                        name="submit"
                        type="submit">
                        Import Content Model
                      </Button>
                    </div>
                  </form>
                ) : stackList.length === 0 ? (
                  <div className="contentmodel-form-wrapper no-stacks">
                    <Field className="no-stacks-content">
                      <Stacks />
                      <h3>No stacks found!</h3>
                      <p>Please create a stack first.</p>
                      <Button
                        icon="AddPlus"
                        onClick={() => {
                          window.open(`${document.referrer}#!/stacks`, "_blank");
                        }}
                        name="createStack">
                        New Stack
                      </Button>
                    </Field>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        );
      }}
    />
  );
};
