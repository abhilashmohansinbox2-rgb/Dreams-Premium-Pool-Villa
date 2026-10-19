# Dreams Premium Pool Villa — Luxury Estate & Direct Booking Engine

An exclusive private 4-bedroom villa sanctuary in Malaparamba, Kozhikode, Kerala, featuring:
- **Multi-Platform Synced Direct Reservation Engine** with real-time iCal channel management across Airbnb, MakeMyTrip, Booking.com, Agoda, and Vrbo.
- **Firebase Authentication & Cloud Firestore** with strict user data isolation rules (`/users/{userId}/bookings`).
- **Property Admin CMS** with live pricing simulator, occupancy limits, kitchen usage rules, feature toggles, and photo gallery management.
- **Calicut Local Field Guide** featuring legendary dining spots, heritage monuments, and beachside itineraries.

---

## Netlify & GitHub Deployment Instructions

To host this application on **Netlify** via **GitHub**:

1. **Create a GitHub Repository**:
   - Push this workspace project code to your GitHub repository (e.g., `dreams-villa-kozikhode`).

2. **Connect to Netlify**:
   - Log in to [Netlify](https://app.netlify.com).
   - Click **Add new site** -> **Import an existing project** -> Choose **GitHub**.
   - Select your repository.

3. **Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
   - Netlify will automatically detect the included `netlify.toml` configuration file.

4. **Environment & Firebase Config**:
   - The app reads your live Firebase project configuration from `firebase-applet-config.json`.
   - Ensure your Firebase Console (Authentication & Firestore) has Google Sign-In enabled and your Netlify custom domain/app URL added to Authorized Domains in Firebase Auth.

---

## Local Development & Testing

- **Run Dev Server**: `npm run dev` (Runs on port 3000)
- **Production Build**: `npm run build`
- **Run Unit Tests**: `node --test src/utils/pricing.test.ts`
- **Type Check**: `npm run lint`
