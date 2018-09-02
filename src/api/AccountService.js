import { Account } from './Account';

interface AccountService {
  list: () => Promise<Account[]>;
  invite: ({ userId, accountId, permission }) => Promise<>;
  revoke: ({ userId, accountId }) => Promise<>;
  add: ({ accountId, projectKey: string }) => Promise<Account>;
  remove: ({ accountId, projectKey: string }) => Promise<Account>;
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
