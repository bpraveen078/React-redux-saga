import { TaskConstants } from "../constants";

export function TaskReducer(state = {}, action) {
  switch (action.type) {
    case TaskConstants.Get_Request:
      return {
        loading: true
      };
    case TaskConstants.Get_Success:
      return {
        tasks: action.result
      };
    case TaskConstants.Edit_Request:
      return {
        loading: true
      };
    case TaskConstants.Edit_Success:
      return {
        task: action.result
      };

    default:
      return state;
  }
}
