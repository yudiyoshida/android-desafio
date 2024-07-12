import PasswordHelper from '@helpers/password';
import { z } from 'zod';


export const CreateUserInput = z.object({
  name: z.string().trim().min(1),
  imageUrl: z.string().trim().url().optional().nullable(),
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
  confirmPassword: z.string().trim(),
})
.refine((body) => {
  if (body.password !== body.confirmPassword) return false;
  else return true;
}, {
  message: 'Senhas informadas estão diferentes.',
});

export type CreateUserOutputDto = z.output<typeof CreateUser>
export const CreateUser = CreateUserInput.transform((body) => {
  return {
    ...body,
    password: PasswordHelper.hash(body.password),
  };
});
