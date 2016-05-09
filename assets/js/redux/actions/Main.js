import * as Main from '../constants/Main';

export function regeneratePassword() {
  return {
    type: Main.REGENERATE,
  };
}

