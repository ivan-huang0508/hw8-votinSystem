// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Task1_Voting {
    address public owner;
    address[] public users;

    enum State { ProposolStartTime, VotingStartTime, VotingEndTime }
    State public state;
    struct Proposol {
        string title;
        uint voteCount;
    }
    
    Proposol[] public proposol_list;

    constructor(){
        owner = msg.sender;
        state = State.ProposolStartTime;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function startProposol() external onlyOwner{
        state = State.ProposolStartTime;
        delete proposol_list;
    }

    function startVoting() external  onlyOwner{
        state = State.VotingStartTime;
    }

    function endVoting() external onlyOwner{
        state = State.VotingEndTime;
    }

    function createProposol(string memory newProposol) public {
        require(state == State.ProposolStartTime, "It's not Proposol Time now.");
        proposol_list.push(Proposol({title: newProposol, voteCount:0}));
    }

    function vote(uint  proposol_index) public {
        require(state == State.VotingStartTime, "It's not Voting Time now.");
        users.push(msg.sender);
        proposol_list[proposol_index].voteCount += 1;
    }

    function getHighestVoteProposol() public view returns (string memory){
        require(state == State.VotingEndTime, "The voting is not yet end.");
        uint highVoteCount = 0;
        uint highVoteIndex = 0;
        for(uint i = 0; i < proposol_list.length; i++){
            if(proposol_list[i].voteCount > highVoteCount){
                highVoteIndex = i;
                highVoteCount = proposol_list[i].voteCount;
            }
        }
        return (proposol_list[highVoteIndex].title);
    }
}