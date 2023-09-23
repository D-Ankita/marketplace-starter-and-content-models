import { Icon, Info, OutlineTag } from "@contentstack/venus-components";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";

import "./styles.scss";

interface Conflict {
  type: string;
  title: string;
  uid: string;
  path: string;
  idConflict: string;
  nameConflict: string;
}

function checkAllTitlesValidity(arr) {
  return arr.filter((obj) => obj.field === "title").every((obj) => obj.doesNameConflicts === false);
}

const ConflictTable = (props) => {
  let { allDataArray, correctionsArray, setCorrectionsArray } = props;
  const [conflictsArray, setConflictsArray] = useState(props.conflicts);

  const handleSelectChange = (selectedOption, index) => {
    //check if selectedOption is present in alldAtaArray
    const isPresent = allDataArray.some((data) => data.title === selectedOption.label);
    const operation = isPresent ? "replace" : "rename";
    const newCorrections = [...correctionsArray];
    const conflict = conflictsArray[index];
    if (operation === "replace") {
      newCorrections[index] = {
        ...correctionsArray[index],
        subject: { old: conflict.uid, new: selectedOption.uid },
        operation: operation,
        field: "uid",
      };
    } else {
      newCorrections[index] = {
        ...correctionsArray[index],
        subject: { old: conflict.subject, new: selectedOption.label },
        operation: operation,
      };
    }
    conflict["doesNameConflicts"] = false;

    setCorrectionsArray(newCorrections);

    props.setIsAllTitlesValid(checkAllTitlesValidity(props.conflicts));
    setConflictsArray((prev) => {
      return { ...prev, [index]: conflict };
    });
  };

  // Function to get the list of objects with the same type from allDataArray
  const getDropdownOptions = (type) => {
    let options = allDataArray.filter((data) => data.type === type).map((data) => ({ ...data, label: data.title })); // Add a new property called 'label' with the value of 'title'
    return options;
  };

  const count = props.conflicts.filter((obj) => obj.field === "title").length;

  return (
    <div>
      <div className="form-container">
        <Info
          content={
            <>
              The names of the content models listed below are already in use in the existing stack, thus they cannot be
              imported under those names. To import, please select an existing content model item from the dropdown or
              enter a new name in the <em>Select existing/Create new </em> field.
            </>
          }
          icon={<Icon icon="InfoInvertedWhite" size="medium" />}
          type="attention"
        />
      </div>
      <table>
        <tr className="table-header-row">
          <th className="table-col-">
            Content Model
            <span className="count">{count}</span>
          </th>
          <th className="table-col-2">Type</th>
          <th className="table-col-3">Select Existing/Enter New Name</th>
        </tr>
        <tr style={{ height: "20px" }}> </tr>
        {props.conflicts.map((conflict, index) => {
          const temperoryVar = conflict.type.replace(/([A-Z])/g, " $1");
          const contentTypeValue = temperoryVar[0].toUpperCase() + temperoryVar.substring(1);
          return (
            conflict.field === "title" && (
              <tr key={index}>
                <td className="table-col-1">{conflict.subject}</td>
                <td className="table-col-2">
                  <OutlineTag content={contentTypeValue} />
                </td>
                <td className="table-col-3">
                  <div className="table-col-3-row-1">
                    <CreatableSelect
                      options={getDropdownOptions(conflict.type)}
                      onChange={(selectedOption) => handleSelectChange(selectedOption, index)}
                      placeholder="Select existing/Create new"
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          padding: "0px 0px 0px 0px",
                          width: "275px",
                          cursor: "pointer",
                          borderColor: state.isFocused ? "#6c5ce7" : "gray",
                          ":active": {
                            borderColor: "#6c5ce7 !important",
                            boxShadow: "0 0 0 1px #6c5ce7 !important",
                          },
                        }),
                        menu: (baseStyles) => ({ ...baseStyles, width: "275px", marginTop: "-6px", cursor: "pointer" }),

                        option: (baseStyles, { data, isDisabled, isFocused, isSelected }) => ({
                          ...baseStyles,
                          cursor: "pointer",
                          backgroundColor: "#fff",
                          color: "#000",
                          ":active": {
                            backgroundColor: "#fff",
                          },
                          ":hover": {
                            backgroundColor: isFocused
                              ? "#EDF1F7"
                              : "" /* Change the background color on hover only when focused */,
                          },
                        }),
                      }}
                    />

                    <td className="table-col-">
                      <div className="acceptance-icons">
                        {conflict.hasOwnProperty("doesNameConflicts") ? (
                          conflict.doesNameConflicts === false ? (
                            <Icon icon="SuccessInverted" />
                          ) : (
                            <Icon icon="ErrorInverted" />
                          )
                        ) : (
                          " "
                        )}
                      </div>
                    </td>
                  </div>
                </td>
              </tr>
            )
          );
        })}
      </table>
    </div>
  );
};

export default ConflictTable;
