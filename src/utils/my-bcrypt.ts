/* istanbul ignore file */
import * as bcrypt from 'bcrypt';

export const MyBcrypt = {
  encrypt: async (value: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const result = await bcrypt.hashSync(value, salt);

    return result;
  },

  check: async (plainValue: string, hashValue: string): Promise<boolean> => {
    const result = await bcrypt.compareSync(plainValue, hashValue);
    return result;
  },
};
