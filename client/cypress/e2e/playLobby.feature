Feature: Play Lobby
  Scenario: Play Lobby
    Given go to wordle page
    When click button to fill username
    And fill username with "javier"
    And click play button
    And type wrong word
    Then redirected to game page 
    #fix line 8 and the playLobby section too