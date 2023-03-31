import { IUserInformation, MainUserAction } from "../../@Types"

export function MainUserInfoReducer(state: IUserInformation, action: MainUserAction) {
  switch (action.type) {
    case 'UPDATE': {
      return { ...action.payload }
    }

    default: {
      return { ...state }
    }
  }
}

export function MainUserInfoInitializer(state: IUserInformation) {
  const storedMainUser = localStorage.getItem("@NotePost:MainUserInformation");

  if (storedMainUser) {
    return JSON.parse(storedMainUser);
  }

  return state;
}