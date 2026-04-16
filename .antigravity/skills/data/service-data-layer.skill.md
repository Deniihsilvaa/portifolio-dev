All database communication must be handled in the service layer.

Services are the only place allowed to interact with Supabase.

React components and hooks must not directly call the database.

Each service should provide clear and focused functions for data operations.
