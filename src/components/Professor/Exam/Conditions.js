import react, { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import Condition from "./Condition";

const Conditions = (props) => {
  const { conditions, setConditions } = props;

  const [conditionState, setConditionState] = useState({
    stateChange: false,
    type: null,
    id: null,
  });

  const editCondition = (e) => {
    const id = e.currentTarget.id;
    setConditionState({ stateChange: true, type: "edit", id });
  };

  const deleteCondition = (e) => {
    const id = e.currentTarget.id;
    setConditionState({ stateChange: true, type: "delete", id });
  };

  const confirmDeleteCondition = (e) => {
    const name = e.currentTarget.name;

    if (name === "cancel-delete") {
      setConditionState({ stateChange: false, type: null });
    } else if (name === "confirm-delete") {
      const newConditions = conditions;
      const index = newConditions.indexOf(conditionState.id);
      newConditions.splice(index, 1);
      setConditions(newConditions);
      setConditionState({ stateChange: false, type: null });
    }
  };

  return (
    <Grid>
      {conditionState.stateChange && conditionState.type === "delete" && (
        <>
          Condition will be removed
          <Button name="cancel-delete" onClick={confirmDeleteCondition}>
            Cancel
          </Button>
          <Button name="confirm-delete" onClick={confirmDeleteCondition}>
            Delete
          </Button>
        </>
      )}
      Add Condition
      <Condition conditions={conditions} setConditions={setConditions} />
      Conditions
      {conditions.map((condition, index) => {
        if (conditionState.stateChange && conditionState.type === "edit" && index === parseInt(conditionState.id)) {
          return (
            <Condition
              conditions={conditions}
              setConditions={setConditions}
              conditionIndex={conditionState.id}
              setConditionState={setConditionState}
            />
          );
        } else {
          return (
            <Grid key={index}>
              {condition.numberOfQuestions} Questions of type {condition.type}{" "}
              from Chapter {condition.chapter} of difficulty{" "}
              {condition.difficulty}
              <Button id={index} onClick={editCondition}>
                Edit Condition
              </Button>
              <Button id={index} onClick={deleteCondition}>
                Delete Condition
              </Button>
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default Conditions;
