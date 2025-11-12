Feature: Login functionality

  @login
  Scenario: Successful login
    Given I am on the "login" page
    When I enter valid credentials
    Then I should see that the user is logged in successfully

  @login
  Scenario: Successful logout 
    Given I am on the "templates" page
    When I logout
    Then I am redirected to trello landing page
