# Email Ether
A simple contract to map email addresses to Ethereum addresses.

# Sending a transaction

1. A transaction is sent to Email Ether with
    * An email address
    * A value (in the message)
2. Email Ether looks up the email address. If the email is mapped to an Ethereum address, it `send`s the value in the message to that address. Otherwise, it `sends` the ether back.
3. If the transaction is successful, an oraclize request is made that sends the notification to your email address.

# Registerring your email address
To register your email with Email Ether, register an address on http://emailether.info and then verify your email address. 

At this point, you will be prompted to add an existing wallet address or generate a new one. 
    * If you generate a new address, it will be done on the page and you will be asked to download the wallet keys. You **must** download the keys at this point. If you don't, they will be lost forever. 
    * If you provide your wallet address, it will 

Your email address is now mapped to an Ethereum address. Now if you want someone to send you ether, they can send a request to the Email Ether contract with your email address and an amount.




