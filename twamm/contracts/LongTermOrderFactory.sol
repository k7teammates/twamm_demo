// SPDX-License-Identifier: BUSL-1.1
pragma solidity =0.7.6;

import "./VirtualOrderPool.sol";

contract LongTermOrderFactory {
    uint112 internal constant FEE_PRECISION_RATE = 100000000;
    address public constant factory =
        address(0x1F98431c8aD98523631AE4a59f267346ea31F984);
    address public tokenA;
    address public tokenB;
    mapping(address => mapping(address => address)) virtualOrderPools;

    constructor() {}

    event CreatePool(
        address _owner,
        address _tokenA,
        address _tokenB,
        uint24 _fee
    );

    event PlaceVirtualOrderPool(
        address tokenA,
        address tokenB,
        uint24 amount,
        uint24 expiryNumberOfBlocks
    );

    function createPool(
        address _tokenA,
        address _tokenB,
        uint24 _fee
    ) external returns (address pool) {
        require(virtualOrderPools[_tokenA][_tokenB] != address(0));
        pool = address(
            new VirtualOrderPool(
                msg.sender,
                address(this),
                _tokenA,
                _tokenB,
                _fee
            )
        );
        virtualOrderPools[_tokenA][_tokenB] = pool;
        emit CreatePool(msg.sender, _tokenA, _tokenB, _fee);
    }

    function getVirutalOrderPool(address _tokenA, address _tokenB)
        external
        view
        returns (address pool)
    {
        return virtualOrderPools[_tokenA][_tokenB];
    }

    function placeLongTermOrder(
        address virutalOrderPool,
        uint24 amount,
        uint24 expiryNumberOfBlocks
    ) external returns (uint120 orderId) {
        require(virutalOrderPool != address(0));
        orderId = VirtualOrderPool(virutalOrderPool).depositeOrder(
            amount,
            expiryNumberOfBlocks
        );
    }

    function updateExchangeRate(address virutalOrderPool, uint24 amount)
        external
        returns (uint120 rate)
    {
        rate = 28912892;
    }
}
