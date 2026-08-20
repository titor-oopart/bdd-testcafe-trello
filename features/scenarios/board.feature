Feature: Board Page validations

  Scenario: Create boards by category
    Given I am on the home page
    When I click on the board button
    And I select "<category>" board
    And I click on the create button
    Then I see the "<Template>" board created

    Examples:
      | Category       | Template                  |
      | Small business | Company Overview          |
      | Design         | Design Sprint             |
      | Education      | Lesson Planning           |
      | Engineering-IT | Trello Agile Sprint Board |
      | Marketing      | Editorial Calendar        |
      | Human resources| Project Management        |
      | Operations     | Decision Tracking Board   |
      | Sales CRM      | Sales Pipeline            |


  Scenario: Delete a board
    Given I am on the home page
    When I look for the board
    And I click on the gear button
    And I click on the delete button
    Then I see the board deleted confirmation
    And I verify the board is no longer displayed


  Scenario: Update a board
    Given I am on the home page
    When I look for the board
    And I click on the board
    And I update the board information
    Then I verify the board was updated


  Scenario: Get a board
    Given I am on the home page
    When I look for the board
    And I click on the board
    Then I verify the board data
