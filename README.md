# Email Ether
A simple contract to map email addresses to Ethereum addresses. No more copy and pasting SHA hashes!

This is in preliminary development, so it doesn't work yet!

# General idea:

## Registerring your email address
1. Go to http://emailether.info and add your email. This will generate a link and send it to your email address. Click on the link to get redirected.
2. At this point, you will be prompted to add an existing wallet address or generate a new keypair. 
    * If you generate a new address, it will be done on the page and you will be asked to download the wallet keys. You **must** download the keys at this point. If you don't, they will be lost forever. 
3. Once you have an address ready, submit it to the blockchain! Your email address is now mapped to an Ethereum address. Now if you want someone to send you ether, they can send a request to the Email Ether contract with your email address and an amount.

## Sending a transaction

1. A transaction is sent to Email Ether with
    * An email address
    * A value (in the message)
2. Email Ether looks up the email address. If the email is mapped to an Ethereum address, it `send`s the value in the message to that address. Otherwise, the transaction will fail.
3. If the transaction is successful, an oraclize request is made that sends the notification to your email address.
