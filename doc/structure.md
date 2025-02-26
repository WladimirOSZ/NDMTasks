# Folder Strucutre

## Backend
```bash
lib
├── controllers
│   ├── graphql_controller.rb
│   └── ...
├── graphql
│   ├── mutations
│   │   ├── base_mutation.rb
│   │   ├── create_list.rb
│   │   ├── create_item.rb
│   │   ├── complete_item.rb
│   │   ├── delete_item.rb
│   │   └── update_item.rb
│   └── types
│       ├── item_type.rb
│       ├── status_type.rb
│       ├── list_type.rb
│       └── ...
├── models
│   ├── item.rb
│   └── list.rb
├── services
│   └── record_finder.rb


test
├── factories
│   ├── items.rb
│   └── lists.rb
├── graphql
│   ├── mutations
│   │   ├── complete_item_spec.rb
│   │   ├── create_item_spec.rb
│   │   ├── create_list_spec.rb
│   │   ├── delete_item_spec.rb
│   │   └── update_item_spec.rb
│   └── queries
│       ├── get_item_by_status_spec.rb
│       ├── get_item_spec.rb
│       ├── get_items_spec.rb
│       └── get_list_spec.rb
├── models
│   ├── item_spec.rb
│   └── list_spec.rb
├── rails_helper.rb
└── spec_helper.rb
```

## Frontend

```bash
front/src/

├── components
│   ├── ItemCard
│   │   ├── ItemCardDropdown.tsx
│   │   ├── ItemCardSkeleton.tsx
│   │   └── ItemCard.tsx
│   ├── ItemDetailsModal.tsx
│   ├── ItemFormModal.tsx
│   ├── Layout.tsx
│   └── NoItems.tsx
├── graphql
│   ├── mutations
│   │   ├── complete_item.ts
│   │   ├── create_item.ts
│   │   ├── delete_item.ts
│   │   └── update_item.ts
│   └── queries
│       ├── get_items_by_status.ts
│       ├── get_items.ts
│       └── get_item.ts
├── helpers
│   └── functions.ts
├── main.tsx
├── pages
│   └── HomePage.tsx
├── router.tsx
├── spec
│   ├── components
│   │   ├── ItemCardDropdown.spec.tsx
│   │   ├── ItemCard.spec.tsx
│   │   ├── ItemDetailsModal.spec.tsx
│   │   ├── ItemFormModal.spec.tsx
│   │   └── NoTask.spec.tsx
│   ├── mocks
│   │   ├── graphqlMocks.ts
│   │   └── itemMocks.ts
│   └── pages
│       └── HomePage.spec.tsx
├── styles.css
├── types
│   └── ItemsTypes.ts
```