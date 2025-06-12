# Task Management Application

A modern, full-stack task management application built with Next.js, TypeScript, Prisma, and NextAuth.js. This application provides comprehensive project and task management capabilities with user authentication and real-time notifications.

## Features

### 🔐 Authentication & User Management

- Secure user authentication with NextAuth.js
- User profiles with customizable information
- Session management
- Account linking support

### 📋 Task Management

- Create, update, and delete tasks
- Task assignment to multiple users
- Task status tracking
- Due date management
- Task categorization with tags
- Project-based task organization

### 🏗️ Project Management

- Create and manage projects
- Associate tasks with projects
- Project ownership and permissions

### 🏷️ Tagging System

- Create custom tags for task categorization
- Many-to-many relationship between tasks and tags
- Unique tag names with validation

### 🔔 Toast Notifications

- Real-time user feedback with toast notifications
- Customizable toast messages with titles and descriptions
- Auto-dismiss functionality
- Action buttons support

## Tech Stack

### Frontend

- **Next.js** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **React Hooks** - Modern React state management
- **Custom UI Components** - Reusable toast notification system

### Backend

- **Prisma** - Next-generation ORM for database management
- **PostgreSQL** - Robust relational database (inferred from migration structure)
- **NextAuth.js** - Complete authentication solution

### Database Schema

- **Users** - User accounts and authentication
- **Profiles** - Extended user information
- **Tasks** - Core task entities with assignments
- **Projects** - Project organization
- **Tags** - Task categorization system
- **Sessions** - User session management
- **Accounts** - OAuth account linking

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/moniratna/task-management-assignment.git
cd task-management-assignment
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Configure the following variables in `.env.local`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/taskmanagement"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

### Core Entities

#### User

- Authentication and basic user information
- One-to-one relationship with Profile
- One-to-many with created Tasks and Projects
- Many-to-many with assigned Tasks

#### Task

- Core task entity with title, description, status
- Belongs to a Project (optional)
- Created by a User
- Can be assigned to multiple Users
- Can have multiple Tags

#### Project

- Project organization entity
- Created by a User
- Contains multiple Tasks

#### Tag

- Task categorization system
- Unique names
- Many-to-many relationship with Tasks

## API Usage

### Toast Notifications

The application includes a robust toast notification system:

```typescript
import { useToast } from '@/hooks/use-toast';

function MyComponent() {
  const { toast } = useToast();

  const showSuccess = () => {
    toast({
      title: "Success!",
      description: "Task created successfully.",
      variant: "default"
    });
  };

  const showError = () => {
    toast({
      title: "Error",
      description: "Failed to create task.",
      variant: "destructive"
    });
  };

  return (
    // Your component JSX
  );
}
```

### Toast Features

- **Limit Control**: Maximum 1 toast shown at a time
- **Auto-dismiss**: Configurable delay (currently set to 1,000,000ms for persistent display)
- **Manual Dismiss**: Users can manually close toasts
- **Update Support**: Toasts can be updated after creation
- **Action Support**: Custom action buttons can be added

## Project Structure

```
src/
├── hooks/
│   └── use-toast.ts          # Toast notification hook
├── components/
│   └── ui/
│       └── toast.tsx         # Toast UI components
└── ...

prisma/
├── schema.prisma             # Database schema
└── migrations/
    └── 20250607062855_task_management/
        └── migration.sql     # Initial database migration
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Database Relationships

- **User** ↔ **Profile** (One-to-One)
- **User** → **Task** (One-to-Many, as creator)
- **User** ↔ **Task** (Many-to-Many, as assignees)
- **User** → **Project** (One-to-Many, as creator)
- **Project** → **Task** (One-to-Many)
- **Tag** ↔ **Task** (Many-to-Many)
- **User** ↔ **Session** (One-to-Many)
- **User** ↔ **Account** (One-to-Many)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.
