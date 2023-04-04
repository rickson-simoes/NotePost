import { IUserInformation, MainUserAction } from "../../@Types"

export function MainUserInfoReducer(state: IUserInformation, action: MainUserAction): IUserInformation {
  switch (action.type) {
    case 'COUNT_POST': {
      return {
        ...action.payload,
        totalPosts: action.payload.totalPosts + 1
      }
    }

    case 'NEW_FOLLOW': {
      return {
        ...state,
        follows: [...state.follows, { ...action.payload.newUserFollowed }],
        totalFollows: state.totalFollows + 1
      }
    }

    case 'REMOVE_FOLLOW': {
      return {
        ...state,
        follows: state.follows.filter(user => {
          return user.id !== action.payload.newUserUnfollowed.id
        }),
        totalFollows: state.totalFollows - 1
      }
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