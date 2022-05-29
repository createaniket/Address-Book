# AddressBook


The software to be designed is a program that can be used to maintain an address book. An address book holds a collection of entries, each recording a person's name and contact number.

# Features:

- Add new contact.
- Add bulk of contacts at a time.
- Fetch details of single contact.
- Fetch phase matching results also.
- Fetch the list of contacts.
- Update any contact.
- Delete any contact.
- Pagination
- JWT authentication to secure API.
- Implement an endpoint to get the JWT token.


# 
# Hosted Links:
 https://createaniket-address-book.herokuapp.com/

# How to get started:
 Clone the repo: https://github.com/createaniket/Address-Book

 - Install dependencies:
  `npm i`
- Run the server:
  `npm start`


# API Reference

``` POST /AddOne```

|Requset Body|Type |Description|
| --- | --- | --- | 
| `contact`| `phonenumber` | Required Your contact number|


|`name`           | `string`    | Yourname      |

# 


``` POST /Savemany```

|Requset Body|Type |Description|
| --- | --- | --- | 
| | `array of objects` | Required Your contact numbers|

#

## Fetch a contact of User

```GET /readoneContact```
# 

## Fetch all contacts of a User
```GET /readAllContact```
# 

## Update Contact by its id

```PATCH /Update/:id```

``` POST /AddOne```

|Requset Body|Type |Description|
| --- | --- | --- | 
| `contact`| `phonenumber` | Required Your contact number|


|`name`           | `string`    | Yourname      |

# 

# Delete a contact 
```DELETE /Delete/:id```

|Parameter|Type |Description|
| --- | --- | --- | 
| `contact id`| `string` | Required Your contact number|

# 

# Returns the jwt token to the client

```Get /Token/