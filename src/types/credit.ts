export interface Credit {
  uuid: string; 
  type_name: string; 
  no_hp: string; 
  address: string; 
  province: string; 
  city: string; 
  category: 'matic' | 'sport' | 'cub' | 'ev' | 'bigbike'; 
  unit_id: string; 
  year: string; 
  down_payment: 'Rp 1 juta - Rp 2,5 juta' | 'Rp 2,6 juta - Rp 3,5 juta' | 'Rp 3,6 juta - Rp 5 juta' | 'di atas Rp 5 juta'; 
  tenor_amount: '12 bulan' | '24 bulan' | '36 bulan' | '48 bulan' | '60 bulan';
  message?: string; 
  name?:string;
  createdAt?:string
}