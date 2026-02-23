import React, { createContext, useContext, useState, ReactNode } from 'react';

// --- Types ---
export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number; // in hours
  imageUrl?: string;
}

export type BookingStatus = 'PENDING' | 'ACCEPTED' | 'COMPLETED' | 'CANCELLED';

export interface Booking {
  id: string;
  serviceId: string;
  clientId: string;
  professionalId: string | null;
  status: BookingStatus;
  date: string;
  time: string;
  address: string;
  totalAmount: number;
  paymentStatus: 'PAID' | 'PENDING';
  createdAt: string;
}

interface DataContextType {
  services: Service[];
  bookings: Booking[];
  isLoading: boolean;
  addBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'professionalId' | 'paymentStatus'>) => Promise<void>;
  updateBookingStatus: (bookingId: string, status: BookingStatus, professionalId?: string) => Promise<void>;
  getClientBookings: (clientId: string) => Booking[];
  getAvailableJobs: () => Booking[];
  getProBookings: (proId: string) => Booking[];
}

// --- Mock Data ---
const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Faxina Padrão',
    description: 'Limpeza geral para manutenção do dia a dia. Inclui varrer, aspirar, tirar pó e limpar banheiros/cozinha.',
    price: 120.00,
    duration: 4,
  },
  {
    id: '2',
    title: 'Faxina Pesada',
    description: 'Limpeza profunda incluindo armários (interno), janelas, rodapés e eletrodomésticos.',
    price: 250.00,
    duration: 8,
  },
  {
    id: '3',
    title: 'Limpeza Pós-Obra',
    description: 'Remoção de resíduos de construção, tinta e poeira fina. Ideal para mudanças.',
    price: 400.00,
    duration: 10,
  },
  {
    id: '4',
    title: 'Passadoria',
    description: 'Serviço exclusivo de passar roupas. Cobrado por hora.',
    price: 80.00,
    duration: 3,
  },
];

// --- Context ---
const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [services] = useState<Service[]>(MOCK_SERVICES);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'professionalId' | 'paymentStatus'>) => {
    setIsLoading(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'PENDING',
      professionalId: null,
      paymentStatus: 'PAID', // In this MVP, we assume payment success immediately
    };

    setBookings(prev => [newBooking, ...prev]);
    setIsLoading(false);
  };

  const updateBookingStatus = async (bookingId: string, status: BookingStatus, professionalId?: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setBookings(prev => prev.map(booking => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          status,
          professionalId: professionalId || booking.professionalId,
        };
      }
      return booking;
    }));
    setIsLoading(false);
  };

  const getClientBookings = (clientId: string) => {
    return bookings.filter(b => b.clientId === clientId);
  };

  const getAvailableJobs = () => {
    return bookings.filter(b => b.status === 'PENDING');
  };

  const getProBookings = (proId: string) => {
    return bookings.filter(b => b.professionalId === proId || (b.status === 'ACCEPTED' && !b.professionalId));
    // For MVP, if pro accepts, it assigns ID. If we want to just see accepted jobs generally, we can filter by status.
    // But better to filter by proId if assigned.
  };

  return (
    <DataContext.Provider value={{
      services,
      bookings,
      isLoading,
      addBooking,
      updateBookingStatus,
      getClientBookings,
      getAvailableJobs,
      getProBookings
    }}>
      {children}
    </DataContext.Provider>
  );
};
