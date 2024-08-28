import { toast } from 'sonner';
import http from '../../api/http';
import { UserLocal } from '../../types/user';

function defaultError() {
  toast.error('Um erro aconteceu, peça ajuda para o suporte');
}

export async function getUserProfile() {
  try {
    const user = localStorage.getItem('user');

    if (user) {
      const parsedUser: UserLocal = JSON.parse(user);

      const { data } = await http.get(`user/${parsedUser.id}`);

      return data.content;
    } else {
      defaultError();
    }
  } catch (err) {
    defaultError();
  }
}
