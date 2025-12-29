# 🍔 Mealio

> A modern food ordering app built with React Native and Expo, featuring real-time order tracking, push notifications, and Users authentication and authorization.

[![React Native](https://img.shields.io/badge/React%20Native-0.76-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-52-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Appwrite](https://img.shields.io/badge/Appwrite-Latest-f02e65.svg)](https://appwrite.io/)

## ✨ Features

### 🍽️ Core Features
- **Browse Restaurants** - Discover local restaurants and explore their menus
- **Food Ordering** - Simple and intuitive food ordering experience
- **Real-time Order Tracking** - Live updates on order status (Pending → Shipped → Delivered)
- **Multiple Payment Methods** - Support for various payment options
- **Order History** - View all your past orders with detailed information

### 🔔 Notifications
- **Real-time Push Notifications** - Instant updates on order status changes
- **In-app Notifications** - Notification center with unread badge indicators
- **Toast Messages** - Non-intrusive status updates within the app
- **Notification History** - Complete history of all notifications

### 👤 User Management
- **User Authentication** - Secure login and registration
- **Guest Mode** - Order without creating an account
- **Profile Management** - Update personal information and preferences
- **Multiple Addresses** - Save and manage delivery addresses

### 📦 Order Management
- **Smart Cart System** - Add, remove, and modify cart items
- **Order Scheduling** - Automatic status updates based on time
- **Order Tracking** - Visual progress indicator for order status
- **Time Estimates** - Real-time countdown to delivery

### 🎨 UI/UX
- **Modern Design** - Clean and intuitive interface
- **Dark Mode Support** - (Optional) Toggle between light and dark themes
- **Smooth Animations** - Polished user experience with animations
- **Responsive Layout** - Works seamlessly on different screen sizes

## 🚀 Tech Stack

### Frontend
- **React Native** - Cross-platform mobile framework
- **Expo** - Development and build toolchain
- **TypeScript** - Type-safe code
- **NativeWind (Tailwind CSS)** - Styling
- **React Navigation** - Navigation library
- **Expo Router** - File-based routing

### Backend & Services
- **Appwrite** - Backend as a Service (BaaS)
  - Database
  - Authentication
  - Storage
  - Real-time subscriptions
  - Cloud Functions

### State Management
- **React Query (TanStack Query)** - Server state management
- **Zustand** - Client state management

### Notifications
- **Expo Notifications** - Local and push notifications
- **Appwrite Real-time** - Live updates via WebSocket

### Additional Libraries
- **React Native Toast Message** - Toast notifications
- **Zod** - Form vaildation
- **OTP Email Provider & Backend for OTP Config** - Plunk & Next Js
- **AsyncStorage** - Local data persistence

## 📱 Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/69dd30e0-a393-47a3-96f0-c1698cc0c3d4" width="250" alt="Home Screen">
  <img src="https://github.com/user-attachments/assets/eeba0a6b-75c6-4b57-846a-0a7db1634465" width="250" alt="Restaurants">
  <img src="https://github.com/user-attachments/assets/3c9de253-ee98-4402-bf15-f44023a535ef" width="250" alt="Food Detail">
</div>


## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)
- Expo Go app (for testing on physical devices)



### Real-time Order Status Updates

Orders automatically transition through statuses:
1. **Pending** → Order placed
2. **Shipped** → Rider assigned (after 30 minutes)
3. **Delivered** → Order delivered (after 2 hours)

The app uses:
- Client-side interval checks (every 12 seconds when app is active)
- Appwrite real-time subscriptions for instant UI updates
- Optional: Appwrite Cloud Functions for 24/7 updates

### Notification System

Three-layer notification system:
1. **Database notifications** - Persistent notification records
2. **Toast notifications** - In-app visual feedback
3. **Push notifications** - Native OS notifications

Notifications include:
- Unread badge on notification bell
- Real-time count updates
- Mark as read functionality
- Notification history

### Order Tracking

Visual progress tracker showing:
- Order placed
- Order confirmed
- Order processed
- Out for delivery
- Order delivered

With live time estimates and status-based styling.



## 👨‍💻 Author

**Your Name**
- GitHub: [@Happiesamuel](https://github.com/Happiesamuel)
- Email: odionsamuel2005@gmail.com
- Twitter: [@Hs_the_dev](https://x.com/Hs_the_dev)

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) - Backend infrastructure
- [Expo](https://expo.dev/) - Development framework
- [React Native](https://reactnative.dev/) - Mobile framework
- [NativeWind](https://www.nativewind.dev/) - Styling solution

## 📞 Support

For support, email odionsamuel2005@gmail.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Add restaurant reviews and ratings
- [ ] Implement favorites system
- [ ] Add promo codes and discounts
- [ ] Support for multiple languages
- [ ] Restaurant dashboard for order management
- [ ] Delivery driver app
- [ ] Table reservations
- [ ] Loyalty rewards program

## 📥 Download

### Android
[![Download APK](https://img.shields.io/badge/Download-APK-brightgreen?style=for-the-badge&logo=android)](https://github.com/Happiesamuel/mealio-fullstack/releases/download/v2.0.0/Mealio.v-2.0.0)

**Latest Version:** v1.0.0  
**File Size:** ~141MB  
**Minimum Android:** 6.0+

[View All Releases](https://github.com/Happiesamuel/mealio/releases)

### Installation Instructions
1. Download the APK from the link above
2. Go to **Settings** → **Security** → Enable **Install from unknown sources**
3. Open the downloaded APK file
4. Tap **Install**
5. Open Mealio and start ordering! 🍕
```




Made with ❤️ and ☕ by Hs_the_dev
