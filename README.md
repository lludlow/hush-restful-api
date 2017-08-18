# Hush Restful API 


## Usage

The endpoints follow closely with the cli command list. 
They are structured like so.

/api/:command?args=optional,arguments,seperated,by,comma
`

Here's a non-exhaustive list of the available endpoints.

```
/api/add_multi_sig_address
/api/add_node
/api/backup_wallet
/api/create_multi_sig
/api/create_raw_transaction
/api/decode_raw_transaction
/api/dump_priv_key
/api/encrypt_wallet
/api/get_account
/api/get_account_address
/api/get_added_node_info
/api/get_addresses_by_account
/api/get_balance
/api/get_block
/api/get_block_count
/api/get_block_hash
/api/get_block_template
/api/get_connection_count
/api/get_difficulty
/api/get_generate
/api/get_hashes_per_second
/api/get_hashes_per_sec
/api/get_info
/api/get_mining_info
/api/get_new_address
/api/get_peer_info
/api/get_raw_memo_pool
/api/get_raw_transaction
/api/get_received_by_account
/api/get_received_by_address
/api/get_transaction
/api/get_tx_out
/api/get_txt_out_set_info
/api/get_work
/api/help
/api/import_priv_key
/api/keypool_refill
/api/key_pool_refill
/api/list_accounts
/api/list_address_groupings
/api/list_lock_unspent
/api/list_received_by_account
/api/list_received_by_address
/api/list_since_block
/api/list_transactions
/api/list_unspent
/api/lock_unspent
/api/move
/api/send_from
/api/send_many
/api/send_raw_transaction
/api/send_to_address
/api/set_account
/api/set_generate
/api/set_tx_fee
/api/sign_message
/api/sign_raw_transaction
/api/stop
/api/submit_block
/api/validate_address
/api/verify_message
/api/wallet_lock
/api/wallet_passphrase
/api/wallet_passphrase_change
```

## Installation

### Prerequisites

You need to have a `hushd` installation that the API can talk to. 

### Development or Production Deployment 


```
git clone https://github.com/madbuda/hush-api.git
cd hush-api
npm install
cp .env.example .env
```

Edit the contents of `.env` to match your local Hush install and your application's dedicated IP address

### Start Your Hush Restful API Server
```
node app.js
```

