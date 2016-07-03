contract('EmailEther', function(accounts) {
  var empty_addr = "0x0000000000000000000000000000000000000000"

  it("Should create the contract and add an email as admin.", function(done) {
    // Deploy contract, setup the email and address to map to
    var ee = EmailEther.deployed();
    var email = "test@test.test";
    var addr = accounts[1];

    // Add the email address
    ee.AddAddress.sendTransaction(email, addr).then(function(success) {})

    // Overwrite the email address with another eth address. Should fail.
    ee.AddAddress.sendTransaction(email, accounts[2]).then(function(success2) {})

    // Make sure the email address is mapped to the original address
    ee.getAddr.call(email).then(function(response){
      assert.equal(response, addr, "Mapping got overwritten and should not have!")
    })

    .then(done).catch(done);
  });


  it("Should fail to add email as NOT admin.", function(done) {
    // ee is the same as before and has the original addr mapped already.
    var ee = EmailEther.deployed();
    var email2 = "test2@test.test";
    var addr2 = accounts[2];

    // Lookup email2 to make sure it is not yet mapped
    ee.getAddr.call(email2).then(function(response){
      assert.equal(response, empty_addr, "Address already exists and should not.");
    })

    // Map email2 from an account that is not the admin. This should fail.
    ee.AddAddress.sendTransaction(email2, addr2, {from: accounts[1]})
    .then(function(success) {})

    // Check email2 again. Should not be there
    ee.getAddr.call(email2).then(function(response){
      assert.equal(response, empty_addr, "Address already exists and should not.")
    })

    // Now send the transaction from the admin
    ee.AddAddress.sendTransaction(email2, addr2).then(function(success) {})

    // email2 should be there now.
    ee.getAddr.call(email2).then(function(response){
      assert.equal(response, addr2, "Address was not added and should have been.")
    })

    .then(done).catch(done);
  });


  it("Should add and delete keys as admin.", function(done) {
    // Deploy contract, setup the email and address to map to
    var ee = EmailEther.deployed();
    var email = "test@test.test";
    var addr = accounts[1];

    // Add the email address
    ee.AddAddress.sendTransaction(email, addr).then(function(success) {})

    // Make sure the email address is there
    ee.getAddr.call(email).then(function(response){
      assert.equal(response, addr, "Email address not added to mapping.")
    })

    // Delete the mapping
    ee.DeleteAddress.sendTransaction(email).then(function(success2) {})

    // Now it should NOT be there
    ee.getAddr.call(email).then(function(response){
      assert.equal(response, empty_addr, "Email should have been deleted but wasn't.")
    })

    .then(done).catch(done);
  });


  it("Should fail to delete keys as non-admin.", function(done) {
    // Deploy contract, setup the email and address to map to
    var ee = EmailEther.deployed();
    var email = "test@test.test";
    var addr = accounts[1];

    // Add the email address
    ee.AddAddress.sendTransaction(email, addr).then(function(success) {})

    // Make sure the email address is there
    ee.getAddr.call(email).then(function(response){
      assert.equal(response, addr, "Email address not added to mapping.")
    })

    // Delete the mapping
    ee.DeleteAddress.sendTransaction(email, {from: accounts[1]}).then(function(success2) {})

    // Now it should NOT be there
    ee.getAddr.call(email).then(function(response){
      assert.equal(response, addr, "Email should NOT have been deleted, but was.")
    })

    .then(done).catch(done);
  });

});
