# API Documentation

## User Preferences Endpoints

### 1. Create User Preference
- **Endpoint**: `POST /api/preferences`
- **Description**: Creates a new user preference.
- **Request Body**:
  ```json
  {
    "userId": "user123",
    "email": "user@example.com",
    "preferences": {
      "marketing": true,
      "newsletter": false,
      "updates": true,
      "frequency": "weekly",
      "channels": {
        "email": true,
        "sms": false,
        "push": true
      }
    },
    "timezone": "America/New_York"
  }

-**Response**
- **Description**: 2001 created.
    ```json
    {
  "message": "User preference created successfully",
  "data": {
    "userId": "user123",
    "email": "user@example.com",
    "preferences": { ... },
    "timezone": "America/New_York",
    "createdAt": "2024-11-18T00:00:00Z"
     }
    }

### 2. Get User Preference
- **Endpoint**: `GET /api/preferences/{userId}`
- **Description**: Retrieves a user preference by user ID.

- **Response**
- **Description**: 200 OK.
    ```json
    {
    "userId": "user123",
    "email": "user@example.com",
    "preferences": { ... },
    "timezone": "America/New_York",
    "createdAt": "2024-11-18T00:00:00Z"
    }

- **404 Not Found**: If the user does not exist.

### 3. Update User Preference
- **Endpoint**: `PATCH /api/preferences/{userId}`
- **Description**: Updates a user preference by user ID.
- **Request Body**: 
    ```json
    {
    "preferences": {
      "marketing": false,
      "frequency": "daily"
     }
    }

- **Response**
- **Description**: 200 OK.
    ```json
    {
    "message": "User preference updated successfully",
    "data": {
      "userId": "user123",
      "preferences": {
        "marketing": false,
        "frequency": "daily"
        }
      }
    }

### 4. Delete User Preference
- **Endpoint**: `DELETE /api/preferences/{userId}`
- **Description**: Deletes a user preference by user ID.
- **Response**
    ```json
    {
    "message": "User preference deleted successfully"
    }

- **404 Not Found**: If the user does not exist.

## Notification Management Endpoints

### 1. Send Notification

- **Endpoint**: `POST /api/notifications`
- **Description**: Sends a notification to a user.
- **Request Body**:
    ```json
    {
    "userId": "user123",
    "type": "marketing",
    "channel": "email",
    "content": {
      "subject": "Special Offer",
       "body": "Check out our latest deals!"
      }
    }

- **Response**: 200 OK.
    ```json
    {
    "message": "Notification sent successfully",
    "data": {
      "userId": "user123",
      "type": "marketing",
      "channel": "email",
      "status": "sent",
      "sentAt": "2024-11-18T08:30:00Z"
      }
    }
    
### 2. Get Notification Logs

- **Endpoint**: `GET /api/notifications/logs`
- **Description**: Retrieves a list of notification logs.

- **Response**:
    ```json
    [
        {
            "userId": "user123",
            "type": "marketing",
            "channel": "email",
            "status": "sent",
            "sentAt": "2024-11-18T08:30:00Z",
            "metadata": {
            "subject": "Special Offer",
            "body": "Check out our latest deals!"
            }
        },
        {
            "userId": "user123",
            "type": "newsletter",
            "channel": "push",
            "status": "failed",
            "failureReason": "User unsubscribed",
            "metadata": {
            "subject": "Weekly Update",
            "body": "Here’s what’s new this week!"
            }
        }
    ]

- **404 Not Found**: If no logs exist for the user.

### 3. Get Notification Stats

- **Endpoint**: `GET /api/notifications/stats`
- **Description**: Retrieves overall notification statistics (e.g., total sent, failed).

- **Response**: 
    ```json
    {
    "totalSent": 120,
    "totalFailed": 15,
    "totalPending": 5,
    "byType": {
        "marketing": {
        "sent": 80,
        "failed": 10,
        "pending": 3
    },
    "newsletter": {
      "sent": 40,
      "failed": 5,
      "pending": 2
        }
    }
    }
```