import { ProductItem, OrderItem, TerminalLog, CalendarDispatch, AuditLogItem } from '../types';

export const IMAGES = {
  bannerHarvest: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi9WnckzmjT9XN88Rag3fJTcjHhSwFD7cGdXUNEZASIb14sZlIXpESIVD0mhETG4pDuejzmj19uGiVys9Q1LC7A6Xegy2kbigUN8hbTsjZs-d7vjD-5OpQrkeuvx_HLNv2sYQlAm7yE0I94APiwBA3QAnc2dDeNmgp3YwbnEW76NV-ycBPA-OpZ32C4BbB_zcWjoube3E6mWFTWMdQcghRZmfsHotgSiNtItXIIWP9CE86YhR8wEyd',
  donCarlosRuiz: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDs5UVWGh09nwY972ktVoUle4CUMdQ0hKgXS3AJbGl_PdYhg5O3ycjd028nhMAtvXFtchAhrTGB9Tu0211CAEsOzUidZxQURyaFHwHsYnbZNH4vL9WmMjTVd98zUCzyalG1ptNelokJwyh0qP2AjC_Ta-TXFdDHnWighFPprdc6oUt4zXihBgRfOK9UrFIIR55UXMB6EF6rV9ui6LmNoVberHKjvOa0bz4q-RCgG_mNCxcBY1ynaTm',
  lonjaBijao: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_zXLAWcM-44Kljwqvgd0AR36gHz_b-gV6upDQlPK4Yn43xyvrFz8pTuEtj0BLy0u4Bh0DGCbbsJF_8xK-71vlgyAZQ3yKkJOAavlypm1gAM__7F172vMo3JMPGkWSBT79LNLe5vOMoiBqtaCD8Zn2uuisWVaGjEYlvTRvuQKPX1HnGIHZA7OteADuOROs0re91lcIaVJHCFIx-dmPhHpqxf62Xoz-mWNOBALgV_egO_Z6zjedg3oX',
  combinadoArequipe: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa66dCKlVneo827yc2R79n1rPG9P3E-G6_qwBOTlVl0HiicIOi_W6FhsAwCpfGzcVLRB5jkfIr0hqGbm2TUU5w3-K4wSuVjh8bA2YlnwTCmvwJdbVFTI9KSq_k_FaAG-MJ2X-vIlEy2baBiLX3KiiuUK-AQbqdlFlaSIUfvqPS7MsPOyDJ8rvmuu9hSG0Yc0HARM4HkiOhHAY61CAUYXsQjFsB94CDNo8V_ODWPhu6lDN08OOjXWZ2',
  conservaGuayaba: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsZ8JpO9MeCPS_sWukPy8rjtzAi8VlQi0xW001OXrmv2XsiSgRRjbkUEiLAEA2YjZEliV_XOGtwQdbv4nEuLEpdcZkV05Ed2JTi_38k6HXfdTOHN8YceGRnrNFeZIZCJpz3fKa5qFmRyhKkoU9ssjtg7-QljoCxSk527VlKqZkfmYIZqJaTKjoWQ_0xUDurMgZ4g_DLlUhs_5T9dsDQs7WrGuBRSbhoqbfrX2H992_KKZ1LY82p-xK',
  tumacoRojo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhDJQyiTV6CNF41n1wA8sFlt1dQnCs6bAZSZtAmyhZrT7NU9ETuzo9Lj2MfYtZJW95xOEbYhfzm1FOK3Jter6ZFS1RRI8YaMdFB2x-EviQDmIxCG7Hw9OGct8QsgmHyNz0uSXcq41Mk3VQvQfmGTswCLsBjWmvdfd5WJ1q395wFahAIxj3gmFPctzcX-cE-eM8tLV2e0W75TCFnQ5nbjIw32MS8Kg_QfQkfTTlWtk_Ar_9rZbVEZIi',
  herposVelenos: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaO2rxnS_G1RsYpALtuBcrSModVS1W3Flq8ccNQKxUXkkhv3KREBuYCdndAX8vANRT0uXuZ_rEaW0yvSDFAKh166dZAfQH46DtdNCNQjnPYkMW6CkOw-KhoLk8Xcmt_EHtKsgyfZwF3hIGItrIpN0RR6yuKiGD5v_fT9l3Uxg61JVY8Xruxlp-AQ_CC_A4ajRcPKS2IdAl9P2h3iI0GibL3qvBNA4EKxweusRL_Ots4TYnN2AES6kj',
  cajaSurtida: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ffkZiwzlh7R28rXbFWdRqkI-7Jd3aE6RPCldYi8AEjFhIL7bIZXbyTSLlJa348roUOHOGb-EDb-duJFbyNM9MpmzOrnj_bh2oAa907z1e0ddQuICvddRyjKi1Xc3VzRDTAVSqZzkEf8JmeCEemXVr-7fHucy2F_NJUcNGoEtoTngY5QiQ-BjANOVbTwrWkVDKmfp133__NySLv8byr6C_Z2yQKUyjP77XVUJTeGkh5lSPAZU6KrP',
  botanicalEngraving: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_bn19GNUMZMy6aeNoIwkgWZUvqusgJcjPZ_uTpKTPSZQoO3cI7oX570rRGaXby-vtA-aNCKzXUfoEiLI_LO4OXrFG9nNrgIk5zEeZUdPA04DZYO6z7h5y6UjokqN0pELdL5FwUBgNXqnzSxb1i94fDeCgwu-Da3X99Lzn1Lr3Fz7_qrowAQNA0JQxadZYv268PXJo5Z6u8s_JyK_1sjAhGFzf6C6cqS0GNa-tyGpgDjxUmer7HJAM'
};

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'prod-1',
    sku: 'BOC-101',
    name: 'Bocadillo Veleño Lonja Tradicional',
    presentation: 'Hoja de Bijao x 500g',
    category: 'Tradicionales',
    priceCOP: 18000,
    stockBoxes: 450,
    stockPercentage: 90,
    status: 'Disponible',
    lotCode: '#TAN-883',
    pailaLocation: 'Paila Guavatá #2',
    image: IMAGES.lonjaBijao
  },
  {
    id: 'prod-2',
    sku: 'BOC-102',
    name: 'Combinado Guayaba y Leche (Arequipe)',
    presentation: 'Caja x 24 Unidades',
    category: 'Especiales',
    priceCOP: 24000,
    stockBoxes: 12,
    stockPercentage: 15,
    status: 'Agotándose',
    lotCode: '#TAN-879',
    pailaLocation: 'Paila Barbosa #1',
    image: IMAGES.combinadoArequipe
  },
  {
    id: 'prod-3',
    sku: 'BOC-103',
    name: 'Conserva de Guayaba Fina Especial 500g',
    presentation: 'Frasco de vidrio hermético',
    category: 'Gourmet',
    priceCOP: 12500,
    stockBoxes: 180,
    stockPercentage: 65,
    status: 'Disponible',
    lotCode: '#TAN-881',
    pailaLocation: 'Paila Central Vélez',
    image: IMAGES.conservaGuayaba
  },
  {
    id: 'prod-4',
    sku: 'BOC-104',
    name: 'Bocadillo Tumaco Extra Rojo',
    presentation: 'Bloque 1kg para repostería',
    category: 'Industrial',
    priceCOP: 28000,
    stockBoxes: 95,
    stockPercentage: 48,
    status: 'Disponible',
    lotCode: '#TAN-875',
    pailaLocation: 'Paila Chipatá #3',
    image: IMAGES.tumacoRojo
  },
  {
    id: 'prod-5',
    sku: 'BOC-105',
    name: 'Herpos Tradicionales Veleños x 12',
    presentation: 'Paquete artesanal hoja',
    category: 'Confitería',
    priceCOP: 16000,
    stockBoxes: 8,
    stockPercentage: 8,
    status: 'Crítico',
    lotCode: '#TAN-872',
    pailaLocation: 'Paila Puente Nacional',
    image: IMAGES.herposVelenos
  },
  {
    id: 'prod-6',
    sku: 'BOC-106',
    name: 'Caja Regalo Bocadillo Surtido Premium',
    presentation: 'Caja de Madera Litografiada x 36',
    category: 'Gourmet',
    priceCOP: 35000,
    stockBoxes: 64,
    stockPercentage: 42,
    status: 'Disponible',
    lotCode: '#TAN-891',
    pailaLocation: 'Paila Central Vélez',
    image: IMAGES.cajaSurtida
  }
];

export const ORDERS_DATA: OrderItem[] = [
  {
    id: 'ord-1',
    code: '#VE-2026-089',
    customerName: 'Distribuidora Boyacá S.A.',
    customerLocation: 'Tunja, Boyacá',
    productName: 'Lonja en Bijao x 500g',
    quantity: 120,
    totalCOP: 2160000,
    status: 'Completado',
    date: '14 Oct, 2026'
  },
  {
    id: 'ord-2',
    code: '#VE-2026-090',
    customerName: 'Distribuidora Dulces del Fonce S.A.S.',
    customerLocation: 'San Gil, Santander',
    productName: 'Bocadillo Veleño Lonja & Combinado',
    quantity: 100,
    totalCOP: 1850000,
    status: 'Completado',
    date: '14 Oct, 2026'
  },
  {
    id: 'ord-3',
    code: '#VE-2026-091',
    customerName: 'Almacenes El Cóndor Tunja',
    customerLocation: 'Tunja, Boyacá',
    productName: 'Caja Surtida x 24',
    quantity: 250,
    totalCOP: 6000000,
    status: 'En Proceso',
    date: '13 Oct, 2026'
  },
  {
    id: 'ord-4',
    code: '#VE-2026-092',
    customerName: 'Supermercados del Chicamocha',
    customerLocation: 'Bucaramanga, Santander',
    productName: 'Combinado Guayaba-Arequipe',
    quantity: 80,
    totalCOP: 1920000,
    status: 'Pendiente Stock',
    date: '12 Oct, 2026'
  },
  {
    id: 'ord-5',
    code: '#VE-2026-093',
    customerName: 'Dulcería Tradición Bogotana',
    customerLocation: 'Bogotá D.C.',
    productName: 'Tumaco Extra Rojo',
    quantity: 60,
    totalCOP: 1680000,
    status: 'Completado',
    date: '11 Oct, 2026'
  }
];

export const TERMINAL_LOGS: TerminalLog[] = [
  {
    id: 'log-1',
    timestamp: '12:42:10',
    type: 'SYS_OK',
    message: 'Sincronización de stock completada en MySQL (Latencia: 14ms). Pool Payara 7 activo.'
  },
  {
    id: 'log-2',
    timestamp: '12:44:05',
    type: 'VENTA_NEW',
    message: 'Venta #FACT-8942 registrada por $1.850.000 COP para Distribuidora Dulces del Fonce.'
  },
  {
    id: 'log-3',
    timestamp: '12:45:18',
    type: 'KARDEX',
    message: 'Reserva de 100 cajas Lote #TAN-883 para Dulces del Fonce confirmada en estiba 03.'
  },
  {
    id: 'log-4',
    timestamp: '12:48:30',
    type: 'LOGISTICA',
    message: 'Camión TermoKing placa TR-7729 asignado a Ruta San Gil - Barbosa.'
  },
  {
    id: 'log-5',
    timestamp: '12:50:02',
    type: 'BATCH_CRON',
    message: 'Molienda de guayaba regional a 75° Brix verificada en Paila Central Guavatá.'
  },
  {
    id: 'log-6',
    timestamp: '12:53:14',
    type: 'SYS_OK',
    message: 'Certificado de Denominación de Origen verificado en cadena agroindustrial.'
  }
];

export const CALENDAR_EVENTS: CalendarDispatch[] = [
  {
    day: 4,
    dateStr: 'Viernes 04 de Septiembre, 2026',
    title: 'Despacho Supermercados Chicamocha',
    details: '320 Cajas de Bocadillo Lonja y Combinado a Bucaramanga',
    type: 'despacho',
    status: 'Completado',
    truckPlate: 'XLA-920',
    driver: 'Alfonso Gómez',
    boxes: 320
  },
  {
    day: 14,
    dateStr: 'Lunes 14 de Septiembre, 2026 [HOY]',
    title: 'Despacho Mayorista Dulces del Fonce S.A.S.',
    details: '100 Cajas en Hoja de Bijao Lote #TAN-883 • Guía #TR-7729',
    type: 'despacho',
    status: 'En Ruta',
    truckPlate: 'TR-7729',
    driver: 'Héctor Fabio Celis',
    boxes: 100
  },
  {
    day: 18,
    dateStr: 'Viernes 18 de Septiembre, 2026',
    title: 'Acopio de Guayaba Finca El Paraíso (Chipatá)',
    details: '5 Toneladas de Guayaba Regional Seleccionada para Paila #2',
    type: 'acopio',
    status: 'Programado',
    driver: 'Don Ramiro Vargas',
    boxes: 250
  },
  {
    day: 22,
    dateStr: 'Martes 22 de Septiembre, 2026',
    title: 'Cierre Mensual de Hojas de Bijao & Kárdex DIAN',
    details: 'Auditoría de inventario físico y balance de mermas en bodega',
    type: 'hito',
    status: 'Programado'
  },
  {
    day: 28,
    dateStr: 'Lunes 28 de Septiembre, 2026',
    title: 'Gran Despacho Almacenes El Cóndor',
    details: '1.200 Cajas de Bocadillo Surtido Premium a Tunja y Sogamoso',
    type: 'despacho',
    status: 'Programado',
    truckPlate: 'WTL-492',
    driver: 'Jairo Mendoza',
    boxes: 1200
  }
];

export const AUDIT_LOGS_DATA: AuditLogItem[] = [
  {
    id: 'aud-1',
    timestamp: '14 Oct, 09:42:10',
    code: '#TRZ-9941',
    level: 'ÉXITO',
    station: 'Despacho Camiones',
    description: 'Guía #TR-7729 emitida para Camión TermoKing hacia San Gil con 100 cajas Lote #TAN-883.',
    operator: 'Héctor Fabio Celis',
    hash: '0x8f4a...29b1'
  },
  {
    id: 'aud-2',
    timestamp: '14 Oct, 09:00:15',
    code: '#TRZ-9940',
    level: 'INFO',
    station: 'Empaque Bijao',
    description: 'Control de esterilización y curado de hojas de bijao superado (Humedad: 14.2%, Grado A+).',
    operator: 'Marta Solano (Mesa 4)',
    hash: '0x2836...77c4'
  },
  {
    id: 'aud-3',
    timestamp: '14 Oct, 08:30:22',
    code: '#TRZ-9939',
    level: 'ÉXITO',
    station: 'Transacción DIAN',
    description: 'Factura Electrónica FACT-2026-8942 autorizada por DIAN con CUFE 894a-39b2-c01e.',
    operator: 'Don Carlos Ruiz',
    hash: '0xbc6c...99a0'
  },
  {
    id: 'aud-4',
    timestamp: '14 Oct, 07:15:08',
    code: '#TRZ-9938',
    level: 'INFO',
    station: 'Calderas & Pailas',
    description: 'Cocción Paila #2 completada a 75.0° Brix en caldera de cobre. Masa en enfriamiento.',
    operator: 'Jorge Gómez',
    hash: '0xd7e9...44a1'
  },
  {
    id: 'aud-5',
    timestamp: '13 Oct, 18:20:45',
    code: '#TRZ-9937',
    level: 'INFO',
    station: 'Molienda & Acopio',
    description: 'Recepción de 1.200 kg de guayaba regional de Guavatá. Acidez y maduración óptima.',
    operator: 'Don Ramiro Vargas',
    hash: '0xdda1...55e2'
  },
  {
    id: 'aud-6',
    timestamp: '13 Oct, 14:10:00',
    code: '#TRZ-9936',
    level: 'ALERTA',
    station: 'Calderas & Pailas',
    description: 'Fluctuación térmica menor en Caldera #1 (104.2°C). Válvula de alivio ajustada por operador.',
    operator: 'Don Carlos Ruiz',
    hash: '0x9a03...11f8'
  }
];
