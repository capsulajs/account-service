import { Account } from './Account';

interface AccountService {
  list: () => Promise<Account[]>;
  invite: ({ userId: string, accountId: string, permission: string }) => Promise<>;
  revoke: ({ userId: string, accountId: string }) => Promise<>;
  add: ({ accountId: string, projectKey: string }) => Promise<Account>;
  remove: ({ accountId: string, projectKey: string }) => Promise<Account>;
}

export default AccountService;

/*
interface ProjectService {
  create;
  update;
  read;
  delete;
  share: ({ permission: any }) => Promise<string>; // link
}

interface Auth {
  login;
  logout;
}

interface UserService {
  searchUser: ({ search: string }) => Promise<User[]>
}
*/
