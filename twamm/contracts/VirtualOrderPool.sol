// SPDX-License-Identifier: BUSL-1.1
pragma solidity =0.7.6;

contract VirtualOrderPool {
    address public owner;
    address public factory;
    address public tokenA;
    address public tokenB;
    uint24 public fee;
    uint256 public lastUpdateBlockNumber;
    mapping(address => Order[]) public pendingOrders;

    constructor(
        address _owner,
        address _factory,
        address _tokenA,
        address _tokenB,
        uint24 _fee
    ) {
        owner = _owner;
        factory = _factory;
        tokenA = _tokenA;
        tokenB = _tokenB;
        fee = _fee;
        lastUpdateBlockNumber = block.number;
    }

    struct Order {
        uint256 orderId;
        uint256 amountA;
        uint256 lastUpdateBlockNumber;
        uint256 expiryBlock;
        uint256 sellRate;
    }

    function updateFee(uint24 _fee) external {
        require(owner == msg.sender);
        fee = _fee;
    }

    function depositeOrder(uint120 _amountA, uint120 expiryNumberOfBlocks)
        external
        returns (uint120 newOrderId)
    {
        require(_amountA > 0);
        executeAllPendingOrders();

        newOrderId = 1;
        uint120 _sellRate = _amountA / expiryNumberOfBlocks;
        Order memory order = Order({
            orderId: newOrderId,
            amountA: _amountA,
            lastUpdateBlockNumber: block.number,
            expiryBlock: block.number + expiryNumberOfBlocks,
            sellRate: _sellRate
        });
        pendingOrders[msg.sender].push(order);
    }

    function executeAllPendingOrders() internal {}
}
