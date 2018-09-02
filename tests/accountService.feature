Feature: Account service

  Scenario: List accounts of a user with no accounts
    Given A user without any accounts
    When User requires the list of his accounts
    Then User receives an empty list of accounts

  Scenario: List accounts of a user with several accounts created by him
    Given A user
    And Several accounts created by the user
    When User requires the list of his accounts
    Then User receives a list of all accounts created by him

  Scenario: Invite a user to an account
    Given User A and User B
    And Account 1 created by user A
    When User A invite User B
    Then Account 1 is part of User B account list

  Scenario: Revoke user access to an account
    Given User A and User B
    And Account 1 created by user A
    And User B has been invited to access Account 1
    When User A revoke User B access to Account 1
    Then Account 1 is not part of User B account list

  Scenario: Add a project to an account
    Given A user that owns an account A
    And a project key
    When User add the project key to the account A
    Then Account A includes the project key

  Scenario: Remove a project from an account
    Given A user that owns an account A
    And a project key
    When User remove the project key from the account A
    Then Account A doesn't include the project key
