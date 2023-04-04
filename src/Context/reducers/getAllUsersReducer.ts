import { GetAllUsersAction, IUserInformation } from "../../@Types"

export function GetAllUsersReducer(state: IUserInformation[], action: GetAllUsersAction): IUserInformation[] {
  switch (action.type) {
    case 'ADD_FOLLOWER': {
      return state.map(user => {
        if (user.id === action.payload.user_followed_id) {
          return {
            ...user,
            followers: [...user.followers, action.payload.follower],
            totalFollowers: user.totalFollowers + 1
          }
        } else {
          return user;
        }
      })
    }

    case 'REMOVE_FOLLOWER': {
      return state.map(user => {
        if (user.id === action.payload.user_unfollowed_id) {
          return {
            ...user,
            followers: user.followers.filter(follower => follower.id !== action.payload.follower.id),
            totalFollowers: user.totalFollowers - 1
          }
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