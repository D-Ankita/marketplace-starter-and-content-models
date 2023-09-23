import { useState, useCallback } from "react";
import {
  Field,
  FieldLabel,
  TextInput,
  Line,
  Button,
  ValidationMessage,
  Info,
  Icon,
} from "@contentstack/venus-components";
import { Form as FinalForm, Field as ReactFinalField } from "react-final-form";
import { trackEvent } from "app/helper/analytics";
import { Logger } from "../Logger";

export const StackForm = ({ onSubmit, logger, error, setStatus, channelId, setNextStep, searchParams }) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const proceed = useCallback(() => {
    setIsLoading(false);
    setDisabled(true);
    setStatus(true);
    setNextStep(true);
    trackEvent("Import Stack Success");
    console.info("proceed to next step");
  }, [setIsLoading, setDisabled, setStatus, setNextStep]);

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={(values) => {
        const errors: any = {};
        if (!values.stack || values.stack === "") {
          errors.stack = "Stack name required";
        }
        return errors;
      }}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className="form-wrapper">
            <Field className={logger ? "input-form-diabled" : ""}>
              <ReactFinalField name="stack" type="input">
                {({ input, meta }) => {
                  return (
                    <>
                      {error && (
                        <div className="import-error-notification">
                          <Info
                            icon={<Icon icon="Error" />}
                            content="Something went wrong. Please try again."
                            contentClassName="flex-v-center"
                            topSpacing={-8}
                            bottomSpacing={16}
                            leftSpacing={8}
                            contentStyles={{padding: "0 8px"}}
                            enableHover
                            type="warning"
                          />
                        </div>
                      )}
                      <FieldLabel error={meta.error && meta.touched && true} htmlFor="stack">
                        Stack Name
                      </FieldLabel>
                      {meta.error && meta.touched && <ValidationMessage>{meta.error}</ValidationMessage>}
                      <TextInput
                        {...input}
                        onChange={(event: any) => {
                          input.onChange(event);
                          if (event.target.value.length > 0) setDisabled(false);
                        }}
                        name="stack"
                        autoComplete="off"
                        disabled={logger}
                        autoFocus
                        type="text"
                        placeholder={searchParams.starterName ? searchParams.starterName + " Starter" : "Stack starter"}
                        value={input.value}
                        error={(meta.error || meta.submitError) && meta.touched}
                      />
                    </>
                  );
                }}
              </ReactFinalField>
            </Field>
            {logger ? (
              <Field>
                {!disabled && (
                  <div className="form log-section">
                    <Info
                      icon={<Icon icon="InfoCircleWhite" />}
                      borderColor="#A9B6CB"
                      backgroundColor="#ffff"
                      content="The stack is being created. This process is running in the background, and you can check the progress in the log below:"
                      type="success"
                    />
                  </div>
                )}
                <FieldLabel htmlFor="log">Log</FieldLabel>
                <Logger onSubmit={proceed} channelId={channelId} searchParams={searchParams} />
              </Field>
            ) : (
              ""
            )}

            <Line type="solid" />

            <div className="right">
              <Button
                icon="Stacks"
                iconProps={{
                  size: "medium",
                  stroke: "#ffffff",
                  fill: "#ffffff",
                }}
                disabled={disabled}
                isLoading={isLoading}
                onClick={() => {
                  setIsLoading(true);
                  trackEvent("Start Import Stack");
                }}
                name="submit"
                type="submit">
                Import Starter
              </Button>
            </div>
          </form>
        );
      }}></FinalForm>
  );
};
