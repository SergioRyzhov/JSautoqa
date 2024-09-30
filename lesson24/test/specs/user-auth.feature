Feature: User Authentication

  Scenario: User Login
    Given I am on the https://studio.cucumber.io/users/sign_in page
    When I input valid username "<USERNAME>" in input "Username Input" and password "<PASSWORD>" in input "Password Input"
    Then I click on "Submit Button" button
    Then I should be redirected to the url contains "/projects"
    And I should see an element "Left Nav Menu"

  Scenario: Open User Profile
    When I click on "User Preferences Button" button
    And I click on "Profile Button" button
    Then I should be redirected to the url contains "/profile"
    And I should see an element "Profile Header"

  Scenario: User Logout
    When I click on "User Preferences Button" button
    And I click on "Sign Out Button" button
    Then I should be redirected to the url contains "/sign_in"
    And I should see an element "Sign In Button"