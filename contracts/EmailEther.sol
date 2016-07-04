
contract EmailEther {


    // VARIABLES:
    //--------------------------------------

    // Address structures
	  struct Addr {
        address addr;
        bool exists;
    }

    // The creator of the contract and the only address that can update the table.
    address admin;

    // Hash table mapping emails --> addresses
	  mapping (string => Addr) lookup;

    // Default function will set the admin of the contract to the message sender.
    // After this, the admin will be the only address that can add/remove emails
    // from the lookup table.
    function EmailEther(){
        admin = msg.sender;
    }


    // MODIFIERS:
    //--------------------------------------

    // Make sure the message sender is the admin.
    modifier is_admin() { if (msg.sender == admin) _ }

    // Make sure the admin has been declared
    modifier admin_exists() { if (admin!=0) _ }

    // Make sure the email address is in the lookup table
    modifier email_exists(string _email) { if (lookup[_email].exists == true) _ }

    // Make sure the email is NOT in the lookup table
    modifier email_not_exists(string _email) { if (lookup[_email].exists == false) _ }


    // ADMIN FUNCTIONS:
    //--------------------------------------

    // Admin adds email --> address mapping to the table
    function AddAddress(string email, address ethereum_address) admin_exists is_admin email_not_exists(email) returns (bool) {
        lookup[email].addr = ethereum_address;
        lookup[email].exists = true;
        return lookup[email].exists;
    }

    // Admin deletes email --> address mapping from the table
    function DeleteAddress(string email) admin_exists is_admin email_exists(email) returns (bool){
        delete lookup[email];
        return true;
    }


    // GETTERS:
    //--------------------------------------

    // Get a mapping (would love to just make 'lookup' public, but that's not allowed at present.
    function getAddr(string email) email_exists(email) returns (address) {
        return lookup[email].addr;
    }

    // CALLABLE:
    //---------------------------------------

    // Send a transaction to an address given an email
    function sendEther(string email) email_exists(email) returns (bool) {
        lookup[email].addr.send(msg.value);
        return true;
    }

}
