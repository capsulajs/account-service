import { Account } from './Account';

/**
 * Service to get and manage user accounts
 */
interface AccountService {
  /**
   * This method provides the list of all accounts of the current user.
   * @return Promise that resolve with an array of Account
   * */
  list: () => Promise<Account[]>;
  /**
   * This method allow to invite another user to collaborate on a specific account.
   * @return Promise that resolve if the invitation was successful
   * */
  invite: ({ userId: string, accountId: string, permission: string }) => Promise<>;
  /**
   * This method allow to revoke access of a user to a specific account.
   * @return Promise that resolve if the revocation was successful
   * */
  revoke: ({ userId: string, accountId: string }) => Promise<>;
  /**
   * This method allow to add a project to an existing account
   * @return Promise that resolve if the project was successfully added to the account
   * */
  add: ({ accountId: string, projectKey: string }) => Promise<Account>;
  /**
   * This method allow to remove a project from an existing account
   * @return Promise that resolve if the project was successfully removed from the account
   * */
  remove: ({ accountId: string, projectKey: string }) => Promise<Account>;
}

export default AccountService;
