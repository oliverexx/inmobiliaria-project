import { db } from "./index";
import {
    properties,
    tags,
    propertyTags,
    users,
    type NewProperty,
    type NewTag,
} from "./schema";

// ─── Mock Data (migrated from legacy/frontend/src/data/properties.js) ─
const SEED_TAGS: NewTag[] = [
    { name: "Piscina", slug: "piscina" },
    { name: "Jardín", slug: "jardin" },
    { name: "Reciclada", slug: "reciclada" },
    { name: "Centro", slug: "centro" },
    { name: "Vista al Mar", slug: "vista-al-mar" },
    { name: "Luminoso", slug: "luminoso" },
    { name: "A Estrenar", slug: "a-estrenar" },
    { name: "Cochera", slug: "cochera" },
    { name: "Seguridad", slug: "seguridad" },
    { name: "Barrio Cerrado", slug: "barrio-cerrado" },
    { name: "Céntrica", slug: "centrica" },
    { name: "Amoblada", slug: "amoblada" },
    { name: "Costanera", slug: "costanera" },
    { name: "Esquina", slug: "esquina" },
    { name: "Alto Tránsito", slug: "alto-transito" },
    { name: "Loft", slug: "loft" },
    { name: "Doble Altura", slug: "doble-altura" },
    { name: "Terreno", slug: "terreno" },
    { name: "Todos los Servicios", slug: "todos-los-servicios" },
    { name: "Expensas Bajas", slug: "expensas-bajas" },
    { name: "Pet Friendly", slug: "pet-friendly" },
    { name: "Ideal Estudiantes", slug: "ideal-estudiantes" },
    { name: "Internet", slug: "internet" },
    { name: "Profesionales", slug: "profesionales" },
    { name: "PH", slug: "ph" },
    { name: "Terraza", slug: "terraza" },
    { name: "Gastronomía", slug: "gastronomia" },
    { name: "Temporario", slug: "temporario" },
    { name: "Galpón", slug: "galpon" },
    { name: "Industrial", slug: "industrial" },
    { name: "Balcón", slug: "balcon" },
    { name: "Playa", slug: "playa" },
    { name: "1 Cuadra del Mar", slug: "1-cuadra-del-mar" },
    { name: "Turístico", slug: "turístico" },
    { name: "Temporada", slug: "temporada" },
    { name: "Garage", slug: "garage" },
    { name: "Zona Naval", slug: "zona-naval" },
    { name: "Tranquilo", slug: "tranquilo" },
    { name: "Patio", slug: "patio" },
    { name: "Vidriera", slug: "vidriera" },
    { name: "Económico", slug: "economico" },
];

interface SeedProperty {
    title: string;
    slug: string;
    price: number;
    operation: string;
    propertyType: string;
    address: string;
    city: string;
    area: number;
    rooms: number;
    bathrooms: number;
    featuredImage: string;
    gallery: string[];
    tagNames: string[];
    isFeatured: boolean;
    description: string;
}

const SEED_PROPERTIES: SeedProperty[] = [
    // ── VENTA (10) ──
    {
        title: "Chalet con Piscina en Palihue",
        slug: "chalet-con-piscina-palihue",
        price: 285000,
        operation: "sale",
        propertyType: "house",
        address: "Terrada 1250, Barrio Palihue",
        city: "Bahía Blanca",
        area: 320,
        rooms: 4,
        bathrooms: 3,
        featuredImage:
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
        ],
        tagNames: ["Piscina", "Jardín"],
        isFeatured: true,
        description:
            "Imponente chalet sobre lote de 600m² en la mejor zona de Palihue, con pileta climatizada y quincho.",
    },
    {
        title: "Casa Reciclada en el Centro",
        slug: "casa-reciclada-centro",
        price: 145000,
        operation: "sale",
        propertyType: "house",
        address: "Chiclana 320, Centro",
        city: "Bahía Blanca",
        area: 180,
        rooms: 3,
        bathrooms: 2,
        featuredImage:
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Reciclada", "Centro"],
        isFeatured: true,
        description:
            "Casa íntegramente reciclada a metros de la peatonal Drago, con patio y terraza.",
    },
    {
        title: "Departamento 3 Amb. con Vista al Mar",
        slug: "departamento-3amb-vista-mar",
        price: 165000,
        operation: "sale",
        propertyType: "apartment",
        address: "Av. Colón 80, Piso 12",
        city: "Bahía Blanca",
        area: 95,
        rooms: 2,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Vista al Mar", "Luminoso"],
        isFeatured: true,
        description:
            "Departamento en torre con vista al puerto y a la ría, cocina integrada y balcón terraza.",
    },
    {
        title: "Depto 2 Amb. a Estrenar en Napostá",
        slug: "depto-2amb-estrenar-naposta",
        price: 82000,
        operation: "sale",
        propertyType: "apartment",
        address: "Sarmiento 1540, Barrio Napostá",
        city: "Bahía Blanca",
        area: 52,
        rooms: 1,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["A Estrenar", "Cochera"],
        isFeatured: false,
        description:
            "Departamento a estrenar con cochera cubierta y balcón al frente. Edificio con ascensor.",
    },
    {
        title: "Casa en Barrio Patagonia",
        slug: "casa-barrio-patagonia",
        price: 195000,
        operation: "sale",
        propertyType: "house",
        address: "Los Ñires 450, Barrio Patagonia",
        city: "Bahía Blanca",
        area: 200,
        rooms: 4,
        bathrooms: 2,
        featuredImage:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Seguridad", "Barrio Cerrado"],
        isFeatured: false,
        description:
            "Casa moderna en barrio cerrado con vigilancia 24h, parrilla y jardín parquizado.",
    },
    {
        title: "Oficina en Torre Fundaleu",
        slug: "oficina-torre-fundaleu",
        price: 120000,
        operation: "sale",
        propertyType: "office",
        address: "San Martín 250, Piso 8, Centro",
        city: "Bahía Blanca",
        area: 75,
        rooms: 0,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Céntrica", "Amoblada"],
        isFeatured: false,
        description:
            "Oficina profesional completamente amoblada con sala de reuniones y estacionamiento.",
    },
    {
        title: "Chalet Frente a la Costanera",
        slug: "chalet-frente-costanera",
        price: 320000,
        operation: "sale",
        propertyType: "house",
        address: "Av. Ing. Sivori 400, Costanera",
        city: "Bahía Blanca",
        area: 280,
        rooms: 5,
        bathrooms: 3,
        featuredImage:
            "https://images.unsplash.com/photo-1499793983394-12dec4a33a4f?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Costanera", "Jardín"],
        isFeatured: true,
        description:
            "Chalet en ubicación privilegiada frente a la costanera, con vistas a la bahía.",
    },
    {
        title: "Local Comercial en Alsina",
        slug: "local-comercial-alsina",
        price: 95000,
        operation: "sale",
        propertyType: "commercial",
        address: "Alsina 180, Centro",
        city: "Bahía Blanca",
        area: 65,
        rooms: 0,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Esquina", "Alto Tránsito"],
        isFeatured: false,
        description:
            "Local comercial de esquina sobre calle Alsina, zona de alto tránsito peatonal.",
    },
    {
        title: "Loft en Microcentro",
        slug: "loft-microcentro",
        price: 105000,
        operation: "sale",
        propertyType: "apartment",
        address: "O'Higgins 52, Microcentro",
        city: "Bahía Blanca",
        area: 70,
        rooms: 1,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Loft", "Doble Altura"],
        isFeatured: false,
        description:
            "Loft estilo industrial con techos de doble altura y ladrillo a la vista en pleno microcentro.",
    },
    {
        title: "Terreno en Villa Bordeu",
        slug: "terreno-villa-bordeu",
        price: 45000,
        operation: "sale",
        propertyType: "house",
        address: "Calle 2 y Ruta 33, Villa Bordeu",
        city: "Bahía Blanca",
        area: 800,
        rooms: 0,
        bathrooms: 0,
        featuredImage:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Terreno", "Todos los Servicios"],
        isFeatured: false,
        description:
            "Lote de 800m² con todos los servicios en Villa Bordeu, ideal para construir.",
    },
    // ── ALQUILER (10) ──
    {
        title: "Depto Amueblado en el Centro",
        slug: "depto-amueblado-centro",
        price: 450000,
        operation: "rent",
        propertyType: "apartment",
        address: "Estomba 78, Centro",
        city: "Bahía Blanca",
        area: 58,
        rooms: 2,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Amoblada", "Expensas Bajas"],
        isFeatured: true,
        description:
            "Departamento amoblado y equipado, listo para mudarse. A 2 cuadras de la peatonal.",
    },
    {
        title: "Casa con Jardín en Villa Mitre",
        slug: "casa-jardin-villa-mitre",
        price: 380000,
        operation: "rent",
        propertyType: "house",
        address: "Castelli 1890, Villa Mitre",
        city: "Bahía Blanca",
        area: 140,
        rooms: 3,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Jardín", "Pet Friendly"],
        isFeatured: false,
        description:
            "Cómoda casa en Villa Mitre con jardín delantero y patio trasero, acepta mascotas.",
    },
    {
        title: "Monoambiente Zona Universitaria",
        slug: "monoambiente-zona-universitaria",
        price: 220000,
        operation: "rent",
        propertyType: "apartment",
        address: "Av. Alem 1200, Barrio Universitario",
        city: "Bahía Blanca",
        area: 30,
        rooms: 1,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Ideal Estudiantes", "Internet"],
        isFeatured: false,
        description:
            "Monoambiente moderno a metros de la UNS y el campus universitario. Internet incluido.",
    },
    {
        title: "Oficina en Edificio Céntrico",
        slug: "oficina-edificio-centrico",
        price: 280000,
        operation: "rent",
        propertyType: "office",
        address: "Drago 60, Piso 3, Centro",
        city: "Bahía Blanca",
        area: 45,
        rooms: 0,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Profesionales", "Amoblada"],
        isFeatured: false,
        description:
            "Oficina ideal para profesionales sobre calle Drago, con sala de espera compartida.",
    },
    {
        title: "PH Reciclado con Terraza",
        slug: "ph-reciclado-terraza",
        price: 500000,
        operation: "rent",
        propertyType: "apartment",
        address: "Brown 456, Centro",
        city: "Bahía Blanca",
        area: 110,
        rooms: 3,
        bathrooms: 2,
        featuredImage:
            "https://images.unsplash.com/photo-1600607687644-c7f34c5e4523?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["PH", "Terraza"],
        isFeatured: true,
        description:
            "Hermoso PH reciclado con terraza propia, parrilla y mucha luz natural.",
    },
    {
        title: "Casa en Aldea Romana",
        slug: "casa-aldea-romana",
        price: 550000,
        operation: "rent",
        propertyType: "house",
        address: "Los Olivos 130, Aldea Romana",
        city: "Bahía Blanca",
        area: 170,
        rooms: 3,
        bathrooms: 2,
        featuredImage:
            "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Piscina", "Seguridad"],
        isFeatured: false,
        description:
            "Casa en barrio cerrado Aldea Romana con pileta compartida y seguridad 24hs.",
    },
    {
        title: "Local sobre Av. Colón",
        slug: "local-avenida-colon",
        price: 600000,
        operation: "rent",
        propertyType: "commercial",
        address: "Av. Colón 350, Centro",
        city: "Bahía Blanca",
        area: 120,
        rooms: 0,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Gastronomía", "Alto Tránsito"],
        isFeatured: false,
        description:
            "Amplio local sobre avenida principal, habilitado para gastronomía con extractor.",
    },
    {
        title: "Depto Temporario en Pedro Pico",
        slug: "depto-temporario-pedro-pico",
        price: 300000,
        operation: "rent",
        propertyType: "apartment",
        address: "Pedro Pico 220, Centro",
        city: "Bahía Blanca",
        area: 42,
        rooms: 1,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Amoblada", "Temporario"],
        isFeatured: false,
        description:
            "Departamento temporario totalmente equipado, ideal para profesionales de paso.",
    },
    {
        title: "Galpón en Zona Industrial",
        slug: "galpon-zona-industrial",
        price: 800000,
        operation: "rent",
        propertyType: "commercial",
        address: "Ruta 3 Sur Km 5, Zona Industrial",
        city: "Bahía Blanca",
        area: 400,
        rooms: 0,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Galpón", "Industrial"],
        isFeatured: false,
        description:
            "Galpón industrial con playa de maniobras, oficina y baño. Acceso directo a Ruta 3.",
    },
    {
        title: "Depto 2 Amb. con Balcón en Sarmiento",
        slug: "depto-2amb-balcon-sarmiento",
        price: 340000,
        operation: "rent",
        propertyType: "apartment",
        address: "Sarmiento 350, Centro",
        city: "Bahía Blanca",
        area: 55,
        rooms: 1,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Balcón", "Luminoso"],
        isFeatured: false,
        description:
            "Departamento luminoso con balcón al frente, excelente ubicación a cuadras de la plaza.",
    },
    // ── MONTE HERMOSO (6) ──
    {
        title: "Casa de Playa a 1 Cuadra del Mar",
        slug: "casa-playa-1-cuadra-mar",
        price: 180000,
        operation: "sale",
        propertyType: "house",
        address: "Av. Costanera 320",
        city: "Monte Hermoso",
        area: 150,
        rooms: 3,
        bathrooms: 2,
        featuredImage:
            "https://images.unsplash.com/photo-1499793983394-12dec4a33a4f?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Playa", "1 Cuadra del Mar"],
        isFeatured: true,
        description:
            "Casa a pasos de la playa con parrilla techada, ideal para familia o inversión turística.",
    },
    {
        title: "Departamento Frente al Mar",
        slug: "depto-frente-mar-mh",
        price: 145000,
        operation: "sale",
        propertyType: "apartment",
        address: "Av. Costanera y Faro Recalada",
        city: "Monte Hermoso",
        area: 65,
        rooms: 2,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Vista al Mar", "Balcón"],
        isFeatured: true,
        description:
            "Departamento con vista directa al mar y balcón, en la zona del faro.",
    },
    {
        title: "Chalet con Pileta cerca de la Playa",
        slug: "chalet-pileta-playa-mh",
        price: 220000,
        operation: "sale",
        propertyType: "house",
        address: "Calle 46 y Av. Argentina",
        city: "Monte Hermoso",
        area: 200,
        rooms: 4,
        bathrooms: 2,
        featuredImage:
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Piscina", "Jardín"],
        isFeatured: false,
        description:
            "Hermoso chalet con pileta y gran jardín, a 3 cuadras de la playa céntrica.",
    },
    {
        title: "Depto Temporario Centro Monte Hermoso",
        slug: "depto-temporario-centro-mh",
        price: 350000,
        operation: "rent",
        propertyType: "apartment",
        address: "Av. Argentina 150",
        city: "Monte Hermoso",
        area: 45,
        rooms: 1,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Temporario", "Amoblada"],
        isFeatured: false,
        description:
            "Departamento temporario totalmente equipado en pleno centro, a 2 cuadras del mar.",
    },
    {
        title: "Casa para Alquiler Temporada",
        slug: "casa-alquiler-temporada-mh",
        price: 600000,
        operation: "rent",
        propertyType: "house",
        address: "Calle 100 entre 2 y 4",
        city: "Monte Hermoso",
        area: 120,
        rooms: 3,
        bathrooms: 2,
        featuredImage:
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Temporada", "Cochera"],
        isFeatured: false,
        description:
            "Casa ideal para temporada de verano, con cochera y patio con parrilla.",
    },
    {
        title: "Local Comercial Zona Céntrica",
        slug: "local-comercial-centro-mh",
        price: 95000,
        operation: "sale",
        propertyType: "commercial",
        address: "Av. Argentina y Costanera",
        city: "Monte Hermoso",
        area: 50,
        rooms: 0,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Alto Tránsito", "Turístico"],
        isFeatured: false,
        description:
            "Local en esquina estratégica, alto tránsito turístico durante todo el verano.",
    },
    // ── PUNTA ALTA (6) ──
    {
        title: "Casa Amplia en Barrio Luján",
        slug: "casa-amplia-barrio-lujan",
        price: 85000,
        operation: "sale",
        propertyType: "house",
        address: "Colón 880, Barrio Luján",
        city: "Punta Alta",
        area: 160,
        rooms: 3,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Jardín", "Garage"],
        isFeatured: false,
        description:
            "Casa familiar con amplio jardín y garage, en barrio tranquilo de Punta Alta.",
    },
    {
        title: "Depto 2 Amb. Centro Punta Alta",
        slug: "depto-2amb-centro-pa",
        price: 55000,
        operation: "sale",
        propertyType: "apartment",
        address: "Mitre 450, Centro",
        city: "Punta Alta",
        area: 50,
        rooms: 1,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Centro", "Luminoso"],
        isFeatured: false,
        description:
            "Departamento céntrico luminoso, ideal para primera vivienda o inversión.",
    },
    {
        title: "Casa Cerca de la Base Naval",
        slug: "casa-cerca-base-naval",
        price: 72000,
        operation: "sale",
        propertyType: "house",
        address: "Rosales 320, Barrio Naval",
        city: "Punta Alta",
        area: 130,
        rooms: 3,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Zona Naval", "Tranquilo"],
        isFeatured: false,
        description:
            "Casa sólida en barrio tranquilo, a pocas cuadras de la Base Naval Puerto Belgrano.",
    },
    {
        title: "Casa en Alquiler con Patio",
        slug: "casa-alquiler-patio-pa",
        price: 250000,
        operation: "rent",
        propertyType: "house",
        address: "Irigoyen 1200, Centro",
        city: "Punta Alta",
        area: 100,
        rooms: 2,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Pet Friendly", "Patio"],
        isFeatured: false,
        description:
            "Casa céntrica con patio amplio, acepta mascotas. Excelente estado.",
    },
    {
        title: "Local en Avenida Principal",
        slug: "local-avenida-principal-pa",
        price: 180000,
        operation: "rent",
        propertyType: "commercial",
        address: "Av. Colón 500, Centro",
        city: "Punta Alta",
        area: 80,
        rooms: 0,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Alto Tránsito", "Vidriera"],
        isFeatured: false,
        description:
            "Local comercial con gran vidriera sobre avenida principal de Punta Alta.",
    },
    {
        title: "Monoambiente Zona Centro",
        slug: "monoambiente-centro-pa",
        price: 150000,
        operation: "rent",
        propertyType: "apartment",
        address: "Belgrano 250, Centro",
        city: "Punta Alta",
        area: 28,
        rooms: 1,
        bathrooms: 1,
        featuredImage:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
        gallery: [],
        tagNames: ["Ideal Estudiantes", "Económico"],
        isFeatured: false,
        description:
            "Monoambiente económico en el centro, ideal para persona sola o estudiante.",
    },
];

// ─── Seed Function ──────────────────────────────────────────────
async function seed() {
    console.log("🌱 Seeding database...\n");

    // 1. Create admin user
    console.log("  → Creating admin user...");
    const [admin] = await db
        .insert(users)
        .values({
            email: "admin@calzadainmobiliaria.com",
            name: "Admin",
            passwordHash: "$2b$10$placeholder-hash-change-me",
            role: "admin",
            phone: "(0291) 400-0000",
            company: "Calzada Inmobiliaria",
        })
        .returning();

    // 2. Create agent user
    console.log("  → Creating agent user...");
    const [agent] = await db
        .insert(users)
        .values({
            email: "agente@calzadainmobiliaria.com",
            name: "Agente Calzada",
            passwordHash: "$2b$10$placeholder-hash-change-me",
            role: "agent",
            phone: "(0291) 400-0001",
            company: "Calzada Inmobiliaria",
        })
        .returning();

    // 3. Seed tags
    console.log("  → Seeding tags...");
    const insertedTags = await db.insert(tags).values(SEED_TAGS).returning();
    const tagMap = new Map(insertedTags.map((t) => [t.name, t.id]));

    // 4. Seed properties
    console.log("  → Seeding properties...");
    for (const sp of SEED_PROPERTIES) {
        const [prop] = await db
            .insert(properties)
            .values({
                title: sp.title,
                slug: sp.slug,
                description: sp.description,
                price: sp.price.toString(),
                operation: sp.operation,
                propertyType: sp.propertyType,
                address: sp.address,
                city: sp.city,
                state: "Buenos Aires",
                country: "Argentina",
                area: sp.area,
                rooms: sp.rooms,
                bathrooms: sp.bathrooms,
                featuredImage: sp.featuredImage,
                gallery: sp.gallery,
                agentId: agent!.id,
                status: "published",
                isFeatured: sp.isFeatured,
                isAvailable: true,
                publishedAt: new Date(),
            })
            .returning();

        // Link tags
        const tagLinks = sp.tagNames
            .map((name) => {
                const tagId = tagMap.get(name);
                return tagId ? { propertyId: prop!.id, tagId } : null;
            })
            .filter(Boolean) as { propertyId: number; tagId: number }[];

        if (tagLinks.length > 0) {
            await db.insert(propertyTags).values(tagLinks);
        }
    }

    console.log(
        `\n✅ Seed complete! ${SEED_PROPERTIES.length} properties, ${SEED_TAGS.length} tags, 2 users.`
    );
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});
