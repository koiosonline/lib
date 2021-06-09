// SPDX-License-Identifier: MIT
// Gas limit: 6000000
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract Koios721Attendee is ERC721PresetMinterPauserAutoId {

    constructor() ERC721PresetMinterPauserAutoId("Koios attendeeNFT Blockchain week 2021", "KoiosA", "") {}
    
    string private _fixeduri;

    function tokenURI(uint256) public view override returns (string memory) {
       return _fixeduri; // all tokens the same uri
    }

    function SetbaseURI(string memory newfixeduri) public  {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Must have admin role to set uri");
        _fixeduri = newfixeduri;
    }

    function mintBulk(address[] memory recipients) public {      
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
        for(uint256 i=0; i<recipients.length; i++) {
            if (balanceOf(recipients[i]) == 0 )
                mint(recipients[i]);    // only mint when you don't have the NFT yet
        }
    }
}