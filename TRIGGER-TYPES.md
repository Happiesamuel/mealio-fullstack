# Notification Trigger Types Explained

## The Fix

Change from:
```typescript
trigger: reminderTime  // ❌ Wrong - Date object
```

To:
```typescript
trigger: { date: reminderTime }  // ✅ Correct - Object with date property
```

---

## All Trigger Types

### 1. Immediate Notification (null)
```typescript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Order Placed!",
    body: "Your order is confirmed"
  },
  trigger: null  // Sends immediately
});
```

### 2. Delay in Seconds
```typescript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Reminder",
    body: "Your order will arrive soon"
  },
  trigger: { seconds: 30 }  // Send after 30 seconds
});
```

### 3. Specific Date/Time
```typescript
const specificDate = new Date('2025-12-25T10:00:00');

await Notifications.scheduleNotificationAsync({
  content: {
    title: "Scheduled Order",
    body: "Your order time is approaching"
  },
  trigger: { date: specificDate }  // Send at specific date/time
});
```

### 4. Repeating - Daily
```typescript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Daily Reminder",
    body: "Check today's specials!"
  },
  trigger: {
    hour: 9,        // 9 AM
    minute: 0,      // :00
    repeats: true   // Repeat daily
  }
});
```

### 5. Repeating - Weekly
```typescript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Weekly Deal",
    body: "Your favorite restaurant has deals!"
  },
  trigger: {
    weekday: 6,     // Saturday (1=Sunday, 7=Saturday)
    hour: 10,
    minute: 0,
    repeats: true   // Repeat weekly
  }
});
```

### 6. Repeating - Custom Interval
```typescript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Check for updates",
    body: "See what's new"
  },
  trigger: {
    seconds: 3600,  // Every hour
    repeats: true
  }
});
```

---

## Common Use Cases in Food App

### 1. Order Placed (Immediate)
```typescript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Order Placed! 🎉",
    body: "We're preparing your order"
  },
  trigger: null
});
```

### 2. Order Ready Soon (Delay)
```typescript
// Notify 5 minutes before estimated time
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Order Almost Ready! 👨‍🍳",
    body: "Your order will be ready in 5 minutes"
  },
  trigger: { seconds: (estimatedTime - 5) * 60 }
});
```

### 3. Scheduled Order Reminder (Specific Date)
```typescript
const orderTime = new Date(scheduledOrderDateTime);
const reminderTime = new Date(orderTime);
reminderTime.setMinutes(reminderTime.getMinutes() - 10);

await Notifications.scheduleNotificationAsync({
  content: {
    title: "Order Coming Soon! ⏰",
    body: "Your scheduled order will arrive in 10 minutes"
  },
  trigger: { date: reminderTime }
});
```

### 4. Daily Lunch Reminder (Repeating)
```typescript
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Lunch Time! 🍔",
    body: "Check out today's lunch specials"
  },
  trigger: {
    hour: 12,
    minute: 0,
    repeats: true
  }
});
```

---

## Complete Example: Schedule Future Order

```typescript
export async function scheduleOrderNotifications(
  orderNumber: string,
  scheduledTime: Date
) {
  // 1. Immediate confirmation
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order Scheduled! 📅",
      body: `Order #${orderNumber} scheduled for ${scheduledTime.toLocaleTimeString()}`
    },
    trigger: null
  });

  // 2. Reminder 1 hour before
  const oneHourBefore = new Date(scheduledTime);
  oneHourBefore.setHours(oneHourBefore.getHours() - 1);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order Coming Up! ⏰",
      body: `Your order will be ready in 1 hour`
    },
    trigger: { date: oneHourBefore }
  });

  // 3. Reminder 10 minutes before
  const tenMinsBefore = new Date(scheduledTime);
  tenMinsBefore.setMinutes(tenMinsBefore.getMinutes() - 10);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order Almost Ready! 👨‍🍳",
      body: `Your order will be ready in 10 minutes`
    },
    trigger: { date: tenMinsBefore }
  });
}
```

---

## Important Notes

### Date Must Be in Future
```typescript
const pastDate = new Date('2020-01-01');
trigger: { date: pastDate }  // ❌ Won't work - date is in the past
```

### Timezone Awareness
```typescript
// Dates use device's local timezone
const scheduleTime = new Date('2025-12-25T15:00:00');
trigger: { date: scheduleTime }  // Uses device timezone
```

### Cancel Scheduled Notifications
```typescript
// Get all scheduled notifications
const scheduled = await Notifications.getAllScheduledNotificationsAsync();

// Cancel specific notification
await Notifications.cancelScheduledNotificationAsync(notificationId);

// Cancel all scheduled notifications
await Notifications.cancelAllScheduledNotificationsAsync();
```

---

## Summary

| Trigger Type | Usage | Example |
|-------------|-------|---------|
| `null` | Immediate | `trigger: null` |
| `{ seconds: N }` | Delay | `trigger: { seconds: 30 }` |
| `{ date: Date }` | Specific time | `trigger: { date: new Date() }` |
| `{ hour, minute, repeats }` | Daily repeat | `trigger: { hour: 9, minute: 0, repeats: true }` |
| `{ weekday, hour, minute, repeats }` | Weekly repeat | `trigger: { weekday: 6, hour: 10, minute: 0, repeats: true }` |

The key fix: Always use `{ date: yourDate }` not just `yourDate`! ✅
