import { IUserInformation, MainUserAction } from "../../@Types"

export function MainUserInfoReducer(state: IUserInformation, action: MainUserAction): IUserInformation {
  switch (action.type) {
    case 'ADDPOST': {
      return {
        ...action.payload,
        totalPosts: state.totalPosts + 1
      }
    }

    case 'NEWFOLLOW': {
      return {
        ...state,
        follows: [...state.follows, { ...action.payload.newUserFollowed }],
        totalFollows: state.totalFollows + 1
      }
    }

    case 'REMOVEFOLLOW': {
      return {
        ...state,
        follows: state.follows.filter(user => {
          user.id !== action.payload.newUserUnfollowed.id
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