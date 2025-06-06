// User Types
export interface User {
  id: string; // UUID from Supabase auth
  phone: string;
  created_at: Date;
}

export interface UserAuthPayload {
  phone: string;
  otp?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Driver Types
export type DriverStatus = 'AVAILABLE' | 'BUSY' | 'OFFLINE';

export interface Driver extends User {
  license_number: string;
  is_verified: boolean;
  status: DriverStatus;
  current_location?: GeoPoint;
}

// Location Types
export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface Hospital {
  id: string;
  name: string;
  location: GeoPoint;
}

// Ambulance Types
export interface Ambulance {
  id: string;
  driver_id: string;
  vehicle_number: string;
  location: GeoPoint;
  last_updated: Date;
}

// Booking Types
export type BookingStatus = 'PENDING' | 'ASSIGNED' | 'EN_ROUTE' | 'COMPLETED' | 'CANCELLED';

export interface Booking {
  id: string;
  user_id: string;
  ambulance_id: string;
  pickup_location: GeoPoint;
  hospital_location?: GeoPoint;
  status: BookingStatus;
  assigned_at?: Date;
  started_at?: Date;
  completed_at?: Date;
  payment_status: boolean;
  estimated_eta?: number; // in seconds
}

// API Request/Response Types
export interface CreateBookingRequest {
  user_id: string;
  pickup_location: GeoPoint;
  hospital?: HospitalSelection;
}

export interface HospitalSelection {
  id?: string;
  location?: GeoPoint;
}

export interface UpdateDriverLocationRequest {
  driver_id: string;
  location: GeoPoint;
}

export interface AcceptBookingRequest {
  driver_id: string;
  booking_id: string;
}

export interface PaymentRequest {
  booking_id: string;
  amount: number; // in paise (Razorpay format)
  currency?: string; // default 'INR'
}

// Google Maps Types
export interface ETA {
  seconds: number;
  meters: number;
}

export interface Route {
  polyline: string; // Encoded polyline string
  duration: ETA;
}

// Realtime/Socket Types
export interface LocationUpdatePayload {
  driver_id: string;
  booking_id?: string;
  location: GeoPoint;
}

export interface BookingAssignmentPayload {
  booking_id: string;
  ambulance_id: string;
  driver_id: string;
  estimated_eta: number;
}

// Razorpay Types
export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: 'created' | 'paid' | 'failed';
}