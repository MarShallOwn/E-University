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
import { BiPencil } from 'react-icons/bi';
import { GrClose } from "react-icons/gr";

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
    <Grid style={{width: '100%'}}>
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
      <Condition conditions={conditions} setConditions={setConditions} />
      <p style={{font: 'normal normal normal 20px/30px Poppins', color: '#1C60B3', width: '100%', marginTop: '3rem'}}>Conditions</p>
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
            <Grid key={index} style={{display: 'flex', position: 'relative', alignItems: 'center'}}>
              <p style={{width: 'calc(100% - 7%)', font: 'normal normal normal 16px/27px Poppins'}}>
              {condition.numberOfQuestions} Questions of type {condition.type}{" "}
              from Chapter {condition.chapter} of difficulty{" "}
              {condition.difficulty}
              </p>
              <Grid style={{display: 'flex', position: 'absolute', right: '0', justifyContent: 'space-between', width: '7%'}}>
                <Grid id={index} onClick={editCondition} style={{cursor: 'pointer'}}>
                  <BiPencil />
                </Grid>
                <Grid id={index} onClick={deleteCondition} style={{cursor: 'pointer'}}>
                  <GrClose />
                </Grid>
              </Grid>
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default Conditions;
