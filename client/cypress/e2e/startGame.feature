Feature: Start Game
  Scenario: Start Wordle Game
    Given go to wordle page
    When click button to fill username
    And fill username with "javier"
    And click play button
    Then redirected to game page