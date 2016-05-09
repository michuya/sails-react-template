import * as Main from '../constants/Main';

const initialState = {
  sample: { password: '1-2-3-4-5' },
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case Main.REGENERATE: {
      const num = Math.floor(Math.random() * 8 + 4);
      const newPassword = [];

      for (let i = num; i >= 0; i--) {
        newPassword.push(Math.floor(Math.random() * 99).toString());
      }

      return Object.assign({}, state, {
        sample: { password: newPassword.join('-') },
      });
    }
    default: {
      return state;
    }
  }
}
