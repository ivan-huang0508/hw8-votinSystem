import { ConnectWallet, Web3Button, useContract, useContractRead} from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {

  const CONTRACT = "0x0FfC9a3f6235f4081e9A5AF3c3A7f564d331E2ab"
  const {contract} = useContract(CONTRACT)
  const {data} = useContractRead(contract, 'getHighestVoteProposol')
  return (
    <main className="main">
      <div className="container">
        <div className="header">
          <h1 className="title">
            Welcome to{" "}
            <span className="gradient-text-0">
              Hw8-Voting System
            </span>
          </h1>
          <div className="connect">
            <ConnectWallet />
          </div>


        </div>

        <div className="row">
            <div className="col-sm-4">
                <div className="box">
                  <div className="state-transfer">
                    State transfer for Contract owner
                    <Web3Button
                      contractAddress={CONTRACT}
                      action={async () => {
                        await contract.call('startProposol', [], {})
                      }}
                      onSuccess={() => {
                        alert('StartProposol')
                      }}
                      onError={(error) => {
                        alert(error)
                      }}
                    >
                    StartProposol
                    </Web3Button>
                    <Web3Button
                      contractAddress={CONTRACT}
                      action={async () => {
                        await contract.call('startVoting', [], {})
                      }}
                      onSuccess={() => {
                        alert('StartVoting')
                      }}
                      onError={(error) => {
                        alert(error)
                      }}
                    >
                    StartVoting
                    </Web3Button>
                    <Web3Button
                      contractAddress={CONTRACT}
                      action={async () => {
                        await contract.call('endVoting', [], {})
                      }}
                      onSuccess={() => {
                        alert('EndVoting')
                      }}
                      onError={(error) => {
                        alert(error)
                      }}
                    >
                    EndProposol
                    </Web3Button>
                  </div>
                  <div>
                  </div>
                </div>
            </div>

            <div className="col-sm-4">
              <div className="box">
                Create Proposol
                <input type="text" id="textProposol" placeholder="..."></input>
                <Web3Button
                  contractAddress={CONTRACT}
                  action={async () => {
                    let newProposol = document.getElementById('textProposol').value;
                    await contract.call('createProposol',[newProposol]);
                  }}
                  onSuccess={() => {
                    alert('CreateProposol')
                  }}
                  onError={(error) => {
                    alert(error)
                  }}
                >
                  CreateProposol
                </Web3Button>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="box">
              Vote
              <input type="text" id="textVote" placeholder="..."></input>
              <Web3Button
                contractAddress={CONTRACT}
                action={async () => {
                  let newVoting = document.getElementById('textVote').value;
                  await contract.call('vote',[newVoting]);
                }}
                onSuccess={() => {
                  alert('Vote')
                }}
                onError={(error) => {
                  alert(error)
                }}
              >
                Vote
              </Web3Button>
              </div>
            </div>

            <div className="col-sm-12">
              <div className="box">
                HighestVoteProposol
                <div>
                  {data}
                </div>
              </div>
            </div>
        </div>
      </div>
    </main>
  );
}
