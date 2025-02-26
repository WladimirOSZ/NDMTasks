## URL
`/graphql`

## Queries and Mutations

### Create a List
```graphql
mutation {
  createList(input: { name: "List Name"}) {
    id
    name
    token
  }
}
```

Variables:
Name: String

Return: [ListType](#listtype)
```json
{
  "data": {
    "createList": {
      "id": "1",
      "name": "List Name",
      "token": "ABC12"
    }
  }
}
```

### Get a List
```graphql
query {
  getList(token: "ABC12") {
    id
    name
  }
}
```

Variables:
Token: String

Return: [ListType](#listtype)
```json
{
  "data": {
    "getList": {
      "id": "1",
      "name": "List Name"
    }
  }
}
```


### Create Item
```graphql
mutation {
  createItem(input: {
      name: "Item name",
      description: "Item Description",
      status: completed,
      listToken: "ABC12"
    }) {
    id
    name
		status
		description
  }
}
```
Variables:
Name: String
Description: String
Status: [StatusType](#statustype)

Return: [ItemType](#itemtype)
```json
{
  "data": {
    "createItem": {
      "id": "10",
      "name": "test",
      "status": "completed",
      "description": "description"
    }
  }
}
```

### Update Item
```graphql
mutation {
  updateItem(input: { id: 1, name: "New Name", listToken: "ABC12"}) {
    id
    name
		status
		description
  }
}
```

Variables:
Id: ID!
Name: String
Description: String
Status: [StatusType](#statustype)

Return: [ItemType](#itemtype)
```json
{
  "data": {
    "updateItem": {
      "id": "1",
      "name": "New Name",
      "status": "completed",
      "description": "description"
    }
  }
}
```

### Delete Item
```graphql
mutation {
  deleteItem(input: { id: 3, listToken: "ABC12"}) {
    id
    name
		status
		description
  }
}
```

Variables:
Id: ID!

Return: [ItemType](#itemtype)
```json
{
  "data": {
    "deleteItem": {
      "id": "3",
      "name": "test",
      "status": "completed",
      "description": "description"
    }
  }
}
```

### Get Item
```graphql
query {
  getItem(id: 1, listToken: "ABC12") {
    id
    name
    status
    description
  }
}
```

Variables:
Id: ID!

Return: [ItemType](#itemtype)
```json
{
  "data": {
    "getItem": {
      "id": "1",
      "name": "test",
      "status": "completed",
      "description": "description"
    }
  }
}
```

### Get Items
```graphql
query {
  getItems (listToken: "ABC12") {
    id
    name
    status
    description
  }
}
```

Return: [ItemType[]](#itemtype)
```json
{
  "data": {
    "getItems": [
      {
        "id": "1",
        "name": "test",
        "status": "completed",
        "description": "description"
      },
      {
        "id": "2",
        "name": "test",
        "status": "completed",
        "description": "description"
      }
    ]
  }
}
```

### Get Items By Status
```graphql
query {
  getItemsByStatus(status: completed, listToken: "ABC12") {
    id
    name
    status
    description
  }
}
```

Variables:
Status: [StatusType](#statustype) | null

Return: [ItemType[]](#itemtype)
```json
{
  "data": {
    "getItemsByStatus": [
      {
        "id": "1",
        "name": "test",
        "status": "completed",
        "description": "description"
      },
      {
        "id": "2",
        "name": "test",
        "status": "completed",
        "description": "description"
      }
    ]
  }
}
```


## Types
### Item
```graphql
Id: ID
Name: String
Description: String
Status: [StatusType](#statustype)
```

### StatusType
```graphql
Enum: completed, pending
```

### ListType
```graphql
Id: ID
```