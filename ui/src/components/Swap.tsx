import React from 'react';
import { Form, Button, InputGroup, Dropdown } from "react-bootstrap";
import "../bootstrap.css";
import { ethers, providers } from 'ethers';

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}


class UniswapPoolPanel extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            poolName: "ETH/BTC",
            options: ['ETH/BTC', 'ETH/USDT', 'ETH/DAI'],
        }
    }

    itemSelected = (eventKey: any) => {
        console.log(eventKey.target.tabIndex);
        const index = eventKey.target.tabIndex;
        this.setState({ poolName: this.state.options[index] });
    }
    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {this.state.poolName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item tabIndex={0} onClick={this.itemSelected}>{this.state.options[0]}</Dropdown.Item>
                    <Dropdown.Item tabIndex={1} onClick={this.itemSelected}>{this.state.options[1]}</Dropdown.Item>
                    <Dropdown.Item tabIndex={2} onClick={this.itemSelected}>{this.state.options[2]}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

class Swap extends React.Component<any, any> {

    provider = new ethers.providers.JsonRpcProvider("https://nd-516-683-532.p2pify.com/2654f0879133d6fbe07bc000ae5e411c");
    signer = this.provider.getSigner();

    constructor(props: any) {
        super(props);
        this.state = {
            address: '',
            estimatedRate: '0',
        }
    }

    linkWallet = async () => {
        if (this.state.address === '') {
            const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const address = addresses[0];
            this.setState({ address: address });
            console.log(address);
        }
    };

    fetchEstimatedRate = async () => {
        const abi = `[
            {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "_tokenA",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "_tokenB",
                    "type": "address"
                  }
                ],
                "name": "getVirutalOrderPool",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "pool",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              }
          ]`;
        var contract = new ethers.Contract("0xdD14823267E57FA76B45F67103B052571D9fE098", abi, this.provider);
        contract.functions.getVirutalOrderPool("0x65133356D062a5Dc98ED189a56A5aEDe9A980ed6", "0xdD14823267E57FA76B45F67103B052571D9fE098").then((value: any) => {
            this.setState({poolName: "F1CT / S2CT"})
            this.setState({estimatedRate: (value + 1) * 100});
        })
    }

    render() {
        return (
            <Form>
                <InputGroup className="mb-3">
                    <Button variant="primary" id="wallet-link" onClick={this.linkWallet}>
                        Wallet
                    </Button>
                    <Form.Control disabled value={this.state.address} />
                </InputGroup>
                <Form.Group className="mb-3" controlId="formBasicPoolList">
                    <UniswapPoolPanel></UniswapPoolPanel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSellToken">
                    <Form.Label className="text-light">ETH</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control type="text" placeholder="amount" onChange={this.fetchEstimatedRate} />
                        <InputGroup.Text id="rate">Rate {this.state.poolName} {this.state.estimatedRate}</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="twapDuration">
                    <Form.Label className="text-light">Time-Weighted Duration (No. Blocks)</Form.Label>
                    <Form.Control type="text" placeholder="number of blocks" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Swap
                </Button>
            </Form>
        )
    }
}

export default Swap;