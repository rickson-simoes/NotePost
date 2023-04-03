import { GetAllUsersAction, IUserInformation } from "../../@Types"

export function GetAllUsersReducer(state: IUserInformation[], action: GetAllUsersAction): IUserInformation[] {
  switch (action.type) {
    case 'UPDATE_USER': {
      state.map(user => {
        if (user.id === action.payload.id) {
          // Update followers and following from user
        } else {
          return user;
        }
      })
    }

    default: {
      return { ...state }
    }
  }
}

export function GetAllUsersInitializer(state: IUserInformation[]) {
  const storedGetAllUsers = localStorage.getItem("@NotePost:AllUsers");

  if (storedGetAllUsers) {
    return JSON.parse(storedGetAllUsers);
  }

  return state;
}