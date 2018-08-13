import { User, Member } from './User';
import { Organization } from './Organization';

interface AccountService {
  authenticate: () => Promise<string>; // TODO not clear yet

  getUser: () => Promise<User>;
  searchUser: ({ search: string }) => Promise<User[]>

  createOrganization: ({ name: string, email: string }) => Promise<Organization>;
  updateOrganization: ({ organizationId: string, name: string, email: string }) => Promise<Organization>;
  deleteOrganization: ({ organizationId: string }) => Promise<>;
  getMyOrganizations: () => Promise<Organization[]>;
  getOrganization: ({ organizationId: string }) => Promise<Organization>;

  getOrganizationMembers: ({ organizationId: string }) => Promise<Member[]>;
  addMember: ({ organizationId: string, userId: string }) => Promise<>;
  removeMember: ({ organizationId: string, userId: string  }) => Promise<>;
  leaveOrganization: ({ organizationId: string }) => Promise<>;
}

export default AccountService;